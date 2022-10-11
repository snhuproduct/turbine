/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-http-header-strategy';
import { catchError, lastValueFrom } from 'rxjs';
import { JWTToken } from 'libs/jwttoken/jwttoken';
import { environment } from '../../../environments/environment';

@Injectable()
export class HTTPHeaderStrategy extends PassportStrategy(
  Strategy,
  'httpheader'
) {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    super({
      header: 'Authorization',
      param: 'app_token',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, token: string): Promise<any> {
    if (!token) {
      throw new UnauthorizedException();
    }

    // decode token supplied by user
    const jwtToken = new JWTToken(token);
    jwtToken.decodeToken();

    // use cache if enabled
    if (environment.enableCache) {
      // return token from cache if email key exists in cache
      console.log(
        'cache enabled, checking token for user: ',
        jwtToken.getEmailId()
      );
      const cachedToken: string = await this.cacheManager.get(
        jwtToken.getEmailId()
      );
      if (cachedToken) {
        console.log('found token for user: ', jwtToken.getEmailId());
        return cachedToken;
      }
    } else {
      console.log('cache disabled');
    }

    // continue to acquire token if no token found in cache associated with user email
    console.log('acquiring fresh token ...');
    const data = {
      postBody: `id_token=${token}&providerId=${environment.identitytoolkit.providerID}`,
      requestUri: `http://${request.headers['host']}`,
      returnSecureToken: true,
    };

    const config = {
      params: { key: environment.provider.apiKey },
    };

    const newToken = await lastValueFrom(
      this.httpService.post(environment.identitytoolkit.url, data, config).pipe(
        catchError((err) => {
          console.log(err.response.data.error);
          throw new HttpException(
            err.response.data.error.message,
            err.response.data.error.code
          );
        })
      )
    );

    if (environment.enableCache) {
      // cache token acquire for this user
      await this.cacheManager.set(jwtToken.getEmailId(), newToken, {
        ttl: 600,
      });
    }

    return newToken;
  }
}

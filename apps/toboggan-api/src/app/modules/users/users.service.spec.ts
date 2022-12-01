/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsersService } from './users.service';

describe('GroupsService', () => {
  let module: TestingModule;
  let service: UsersService;
  let http: HttpService;
  const data = {
    data: {},
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: environment.GPCoreBaseUrl + '/authentication/api/v1',
          timeout: 8000,
          maxRedirects: 3,
        }),
      ],
      providers: [UsersService],
    }).compile();
  });

  beforeEach(async () => {
    service = module.get<UsersService>(UsersService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkPagination', () => {
    it('should work with given pagination', (done) => {
      // @ts-ignore
      jest.spyOn(http, 'get').mockImplementation(() => of(data));
      expect(
        service.getUsers(1, 10).subscribe((response) => {
          expect(http.get).toBeCalledWith('/users', {
            params: { limit: 10, skip: 1, userType: null },
          });
          expect(response).toEqual(data);
          done();
        })
      );
    });

    it('should work with default pagination', (done) => {
      // @ts-ignore
      jest.spyOn(http, 'get').mockImplementation(() => of(data));
      expect(
        service.getUsers(undefined, undefined).subscribe((response) => {
          expect(http.get).toBeCalledWith('/users', {
            params: { limit: 1000, skip: 0, userType: null },
          });
          expect(response).toEqual(data);
          done();
        })
      );
    });
  });
});

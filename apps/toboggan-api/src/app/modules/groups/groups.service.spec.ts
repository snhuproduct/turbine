/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let module: TestingModule;
  let service: GroupsService;
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
      providers: [GroupsService],
    }).compile();
  });

  beforeEach(async () => {
    service = module.get<GroupsService>(GroupsService);
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
        service.getGroups(1, 10).subscribe((response) => {
          expect(http.get).toBeCalledWith('/groups', {
            params: { limit: 10, skip: 1 },
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
        service.getGroups(undefined, undefined).subscribe((response) => {
          expect(http.get).toBeCalledWith('/groups', {
            params: { limit: 1000, skip: 0 },
          });
          expect(response).toEqual(data);
          done();
        })
      );
    });
  });
});

import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';

describe('CurriculumPathwayService', () => {
  let module: TestingModule;
  const data = {
    data: {
      error: { message: '', code: '' },
    },
  };
  const mockService = {
    post: () => from([data]),
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
      providers: [AuthenticationService],
    })
      .overrideProvider(HttpService)
      .useValue(mockService)
      .compile();
  });
  it('should be defined', () => {
    const service = module.get<AuthenticationService>(AuthenticationService);
    expect(service).toBeDefined();
  });

  describe('getLearnerProfile', () => {
    it('should return value', (done) => {
      const service = module.get<AuthenticationService>(AuthenticationService);

      expect(
        service.sendPasswordResetEmail("someemail").subscribe((response) => {
          expect(response).toEqual(data);
          done();
        })
      );
    });
  });

});

import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { LearnersController } from './learners.controller';
import { learnersMock } from './learners.mock';
import { LearnersService } from './learners.service';

const mockResponse: AxiosResponse = {
  data: null,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('GroupsController', () => {
  let controller: LearnersController;
  let service: LearnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL:
            environment.GPCoreBaseUrl + '/learner-profile-service/api/v1',
          timeout: 8000,
          maxRedirects: 3,
        }),
      ],
      controllers: [LearnersController],
      providers: [LearnersService],
    }).compile();
    service = module.get<LearnersService>(LearnersService);
    controller = module.get<LearnersController>(LearnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getlearners', () => {
    it('should return an array of paginated learners', async () => {
      mockResponse.data = learnersMock;
      jest
        .spyOn(service, 'getLearners')
        .mockImplementation(() => of(mockResponse));

      controller
        .getLearners({
          currentPage: 1,
          resultsPerPage: 10,
        })
        .subscribe((response) => {
          expect(service.getLearners).toHaveBeenCalledWith({
            limit: 10,
            skip: 1,
          });
          expect(response).toBe(mockResponse);
        });
    });
  });

  describe('getLearner', () => {
    it('should return a learner when learner id is passed', async () => {
      mockResponse.data = learnersMock[0];
      const mockUserId = learnersMock[0].uuid;
      jest
        .spyOn(service, 'getLearner')
        .mockImplementation(() => of(mockResponse));

      controller.getLearner(mockUserId).subscribe((response) => {
        expect(service.getLearner).toHaveBeenCalledWith(mockUserId);
        expect(response).toBe(mockResponse);
      });
    });
  });

  describe('createLearner', () => {
    it('should create a learner when learner data is passed', async () => {
      const newLearner = learnersMock[0];
      mockResponse.data = newLearner;
      mockResponse.data['uuid'] = uuidv4();
      jest
        .spyOn(service, 'createLearner')
        .mockImplementation(() => of(mockResponse));

      controller.createLearner(newLearner).subscribe((response) => {
        expect(service.createLearner).toHaveBeenCalledWith(newLearner);
        expect(response).toBe(mockResponse);
      });
    });
  });

  describe('updateLearner', () => {
    it('should update learner profile when learner data is passed', async () => {
      const existingLearner = learnersMock[0];
      mockResponse.data = existingLearner;
      mockResponse.data['first_name'] = 'Snow';
      const mockUserId = learnersMock[0].uuid;
      jest
        .spyOn(service, 'updateLearner')
        .mockImplementation(() => of(mockResponse));

      controller
        .updateLearner(mockUserId, existingLearner)
        .subscribe((response) => {
          expect(service.updateLearner).toHaveBeenCalledWith(
            mockUserId,
            existingLearner
          );
          expect(response).toBe(mockResponse);
        });
    });
  });

  describe('deleteLearner', () => {
    it('should delete learner profile when learner data is passed', async () => {
      mockResponse.data = {
        success: true,
        message: 'Successfully deleted the learner',
      };
      const mockUserId = learnersMock[0].uuid;
      jest
        .spyOn(service, 'deleteLearner')
        .mockImplementation(() => of(mockResponse));

      controller.deleteLearner(mockUserId).subscribe((response) => {
        expect(service.deleteLearner).toHaveBeenCalledWith(mockUserId);
        expect(response).toBe(mockResponse);
      });
    });
  });
});

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ILearner, ILearnerInput } from '@toboggan-ws/toboggan-common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class LearnersService {
  constructor(private readonly httpService: HttpService) {}

  getLearners(params?: {
    skip?: number;
    limit?: number;
  }): Observable<AxiosResponse<ILearner[]>> {
    return this.httpService.get('/learners', { params });
  }

  getLearner(uuid: string): Observable<AxiosResponse<ILearner>> {
    return this.httpService.get(`/learner/${uuid}`);
  }

  createLearner(
    newLearner: ILearnerInput
  ): Observable<AxiosResponse<ILearner>> {
    return this.httpService.post('/learner', newLearner);
  }

  updateLearner(
    uuid: string,
    updatedLearner: ILearnerInput
  ): Observable<AxiosResponse<ILearner>> {
    return this.httpService.put(`/learner/${uuid}`, updatedLearner);
  }

  deleteLearner(uuid: string) {
    return this.httpService.delete(`/learner/${uuid}`);
  }
}

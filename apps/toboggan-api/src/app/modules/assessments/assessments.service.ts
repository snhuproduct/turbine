import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IAssessment } from './assessments.types';

@Injectable()
export class AssessmentsService {
  constructor(private readonly httpService: HttpService) {}

  updateAssessment(
    uuid: string,
    body: Partial<IAssessment>
  ): Observable<AxiosResponse<IAssessment>> {
    return this.httpService.put(`/assessment-item?uuid=${uuid}`, body);
  }

  returnUnevaluated(
    uuid: string,
    body: Partial<IAssessment>
  ): Observable<AxiosResponse<IAssessment>> {
    return this.httpService.put(
      `/assessment-item/unevaluate?uuid=${uuid}`,
      body
    );
  }
}

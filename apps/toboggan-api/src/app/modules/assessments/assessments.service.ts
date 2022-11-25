import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IAssessment, IAssessmentFlag } from './assessments.types';

@Injectable()
export class AssessmentsService {

  constructor(private readonly httpService: HttpService) { }

  updateFlagStatus(uuid: string, body: IAssessmentFlag): Observable<AxiosResponse<IAssessment>> {
    return this.httpService.put(`/assessment-item?uuid=${uuid}`, body)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private assessmentInEvaluation: IAssessment = {} as IAssessment;
  constructor(private http: HttpClient) {}

  fetchAssessments() {
    return this.http.get<IAssessment[]>('/api/assessments');
  }

  fetchEvaluatedAssessments() {
    return this.http.get<IAssessment[]>('/api/assessments/evaluated');
  }

  //flagAssessment
  async updateFlagAssessment(
    id: string,
    body: { is_flagged: boolean; comments?: string }
  ) {
    await firstValueFrom(this.http.put('/api/assessments/:' + id, body));
  }

  async updateAssessment(id: string, body: Partial<IAssessment>) {
    await firstValueFrom(this.http.put('/api/assessments/' + id, body));
  }

  getAssessmentInEvaluation() {
    return JSON.parse(sessionStorage.getItem('assessment') as string);
  }

  setAssessmentInEvaluation(assessment: IAssessment) {
    sessionStorage.setItem('assessment', JSON.stringify(assessment));
  }

  clearAssessmentInEvaluation() {
    sessionStorage.removeItem('assessment');
  }
}

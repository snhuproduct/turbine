import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private http: HttpClient) { }

  fetchAssessments() {
    return this.http.get<IAssessment[]>('/api/assessments');
  }

  fetchEvaluatedAssessments() {
    return this.http.get<IAssessment[]>('/api/assessments/evaluated');
  }

  //flagAssessment
  async updateFlagAssessment(id: string, body: { is_flagged: boolean, comments?: string }) {
    await firstValueFrom(this.http.put('/api/assessments/:' + id, body))
  }
}

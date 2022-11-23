import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { IAssessmentItem } from '../interface/assessments.type';

const mockData: any[] = [
  {
    id: '1',
    time_left: { value: '-10hr 30m', cellClass: 'gp-red-20' },
    learner: 'Jessica',
    competency: 'Analyze Written Works',
    type: 'Final',
    attempt: [1, 3],
    instructor: 'Christopher Edwards',
    similarity: [0.27, 'https://google.com', 'gp-yellow-80'],
  },
  {
    id: '2',
    time_left: { value: '4hr 18m', cellClass: 'gp-orange-20' },
    learner: 'James',
    competency: "Explain Writer's Choices",
    type: 'Practice 1',
    attempt: [3, 3],
    instructor: 'Julia De La Cruz',
    similarity: [0.89, 'https://google.com', 'gp-red-80'],
  },
  {
    id: '3',
    time_left: { value: '14hr 30m', cellClass: 'gp-orange-20' },
    learner: 'Karl',
    competency: 'Adapt the Writing Process',
    type: 'Practice 2',
    attempt: {
      0: 4,
      1: 3,
      cellClass: 'gp-table-x-cell-warning-border',
    },
    instructor: 'Dawn Hall',
    similarity: [0.1, 'https://google.com', 'gp-green-80'],
  },
  {
    id: '4',
    time_left: '10hr 30m',
    learner: 'Jessica',
    competency: 'Analyze Written Works',
    type: 'Final',
    attempt: [1, 3],
    instructor: 'Christopher Edwards',
    similarity: [0.27, 'https://google.com', 'gp-yellow-80'],
  },
  {
    id: '5',
    time_left: '14hr 18m',
    learner: 'James',
    competency: "Explain Writer's Choices",
    type: 'Practice 1',
    attempt: [3, 3],
    instructor: 'Julia De La Cruz',
    similarity: [0.89, 'https://google.com', 'gp-red-80'],
  },
  {
    id: '6',
    time_left: '14hr 30m',
    learner: 'Karl',
    competency: 'Adapt the Writing Process',
    type: 'Practice 2',
    attempt: {
      0: 4,
      1: 3,
      cellClass: 'gp-table-x-cell-warning-border',
    },
    instructor: 'Dawn Hall',
    similarity: [0.1, 'https://google.com', 'gp-green-80'],
  },
];

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private http: HttpClient) {}

  fetchAssessments() {
    return of(mockData);
  }

  //flagAssessment
  async updateAssessment(id: string, body: Partial<IAssessmentItem>) {
    await firstValueFrom(this.http.put('/api/assessments/:' + id, body));
  }

  async returnUnevaluated(id: string, body: Partial<IAssessmentItem>) {
    await firstValueFrom(
      this.http.put('/api/assessments/unevaluate/:' + id, body)
    );
    // mockData = mockData.filter((item) => item.id !== id);
  }
}

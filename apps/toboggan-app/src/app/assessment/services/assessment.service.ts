import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';

const mockData: any[] = [
  {
    "id": "1",
    "time_left": { 1: '-10hr 30m', cellClass: 'gp-red-20' },
    "learner": "Jessica",
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": [1, 3],
    "instructor": "Christopher Edwards",
    "similarity": [.27, 'https://google.com', 'gp-yellow-80'],
    "is_flagged": true,
  },
  {
    "id": "2",
    "time_left": { 1: '10hr 30m', cellClass: 'gp-red-20' },
    "learner": "James",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": [3, 3],
    "instructor": "Julia De La Cruz",
    "similarity": [.89, 'https://google.com', 'gp-red-80'],
    "is_flagged": false,
  },
  {
    "id": "3",
    "time_left": { 1: '5hr 15m' },
    "learner": "Karl",
    "competency": "Adapt the Writing Process",
    "type": "Practice 2",
    "attempt": {
      0: 4,
      1: 3,
      cellClass: 'gp-table-x-cell-warning-border',
    },
    "instructor": "Dawn Hall",
    "similarity": [.1, 'https://google.com', 'gp-green-80'],
    "is_flagged": true,
  },
  {
    "id": "4",
    "time_left": { 1: '4hr 23m', cellClass: 'gp-red-20' },
    "learner": "Jessica",
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": [1, 3],
    "instructor": "Christopher Edwards",
    "similarity": [.27, 'https://google.com', 'gp-yellow-80'],
    "is_flagged": true,
  },
  {
    "id": "5",
    "time_left": { 1: '10hr 10m' },
    "learner": "James",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": [3, 3],
    "instructor": "Julia De La Cruz",
    "similarity": [.89, 'https://google.com', 'gp-red-80'],
    "is_flagged": false,
  },
  {
    "id": "6",
    "time_left": { 1: '2hr 20m', cellClass: 'gp-red-20' },
    "learner": "Karl",
    "competency": "Adapt the Writing Process",
    "type": "Practice 2",
    "attempt": {
      0: 4,
      1: 3,
      cellClass: 'gp-table-x-cell-warning-border',
    },
    "instructor": "Dawn Hall",
    "similarity": [.1, 'https://google.com', 'gp-green-80'],
    "is_flagged": false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {

  constructor(private http: HttpClient) { }

  fetchAssessments() {
    return of(mockData);
  }

  //flagAssessment
  async updateFlagAssessment(id: string, body: { is_flagged: boolean, comments?: string }) {
    await firstValueFrom(this.http.put('/api/assessments/:' + id, body))
  }
}

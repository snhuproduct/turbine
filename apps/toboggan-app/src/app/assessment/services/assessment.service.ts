import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';

const mockData: any[] = [
  {
    "id": "1",
    "time_left": { value: "-10hr 30m", cellClass: 'gp-red-20' },
    "learner": "Jessica",
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": [1,3],
    "instructor": "Christopher Edwards",
    "similarity": [.27, 'https://google.com', 'gp-yellow-80'],
  },
  {
    "id": "2",
    "time_left": { value: "4hr 18m", cellClass: 'gp-orange-20' },
    "learner": "James",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": [3,3],
    "instructor": "Julia De La Cruz",
    "similarity": [.89, 'https://google.com', 'gp-red-80'],
  },
  {
    "id": "3",
    "time_left": { value: "14hr 30m", cellClass: 'gp-orange-20' },
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
  },
  {
    "id": "4",
    "time_left": "10hr 30m",
    "learner": "Jessica",
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": [1,3],
    "instructor": "Christopher Edwards",
    "similarity": [.27, 'https://google.com', 'gp-yellow-80'],
  },
  {
    "id": "5",
    "time_left": "14hr 18m",
    "learner": "James",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": [3,3],
    "instructor": "Julia De La Cruz",
    "similarity": [.89, 'https://google.com', 'gp-red-80'],
  },
  {
    "id": "6",
    "time_left": "14hr 30m",
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
  },
];

const mockDataForEvaluated: any[] = [
  {
    "id": "1",
    "learner": "Jessica",
    "result": {
      cellType: 'tooltip',
      cellTypeOptions: {
        heading: 'Comments',
        text: 'Bear claw tootsie roll pudding pudding sesame snaps brownie powder cupcake. Pie candy macaroon shortbread sweet sugar plum. Bear claw marzipan sweet cheesecake gummies chupa chups.'
      },
      value: 'Non-Eval',
    },
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": [1,3],
    "instructor": "Christopher Edwards",
    "similarity": [.27, 'https://google.com', 'gp-yellow-80'],
  },
  {
    "id": "2",
    "learner": "James",
    "result": "Not Evident",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": [3,3],
    "instructor": "Julia De La Cruz",
    "similarity": [.89, 'https://google.com', 'gp-red-80'],
  },
  {
    "id": "3",
    "learner": "Karl",
    "result": "Proficient",
    "competency": "Adapt the Writing Process",
    "type": "Practice 2",
    "attempt": {
      0: 4,
      1: 3,
      cellClass: 'gp-table-x-cell-warning-border',
    },
    "instructor": "Dawn Hall",
    "similarity": [.1, 'https://google.com', 'gp-green-80'],
  },
  {
    "id": "4",
    "learner": "Jessica",
    "result": "Exemplary",
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": [1,3],
    "instructor": "Christopher Edwards",
    "similarity": [.27, 'https://google.com', 'gp-yellow-80'],
  },
  {
    "id": "5",
    "learner": "James",
    "result": "Exemplary",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": [3,3],
    "instructor": "Julia De La Cruz",
    "similarity": [.89, 'https://google.com', 'gp-red-80'],
  },
  {
    "id": "6",
    "learner": "Karl",
    "result": "Proficient",
    "competency": "Adapt the Writing Process",
    "type": "Practice 2",
    "attempt": {
      0: 4,
      1: 3,
      cellClass: 'gp-table-x-cell-warning-border',
    },
    "instructor": "Dawn Hall",
    "similarity": [.1, 'https://google.com', 'gp-green-80'],
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

  fetchEvaluatedAssessments() {
    return of(mockDataForEvaluated);
  }

  //flagAssessment
  async updateFlagAssessment(id: string, body:{ is_flagged:boolean, comments:string }){
    await firstValueFrom(this.http.put('/api/assessments/:'+id, body))
  }
}

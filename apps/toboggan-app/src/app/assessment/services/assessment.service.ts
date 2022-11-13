import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {

  constructor(private http: HttpClient) { }

  fetchAssessments() {
    return of(mockData);
  }

  //flagAssessment
   updateFlagAssessment(id: string, body:{ is_flagged:boolean, comments:string }){
    return this.http.put('/api/assessments/:'+id, body)
  }
}

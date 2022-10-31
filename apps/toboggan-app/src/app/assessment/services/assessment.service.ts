import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const mockData: any[] = [
  {
    "id": "1",
    "time_left": "-10hr 30m",
    "learner": "Jessica",
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": "1 of 3",
    "instructor": "Christopher Edwards",
    "similarity": "27%",
  },
  {
    "id": "2",
    "time_left": "4hr 18m",
    "learner": "James",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": "3 of 3",
    "instructor": "Julia De La Cruz",
    "similarity": "89%",
  },
  {
    "id": "3",
    "time_left": "14hr 30m",
    "learner": "Karl",
    "competency": "Adapt the Writing Process",
    "type": "Practice 2",
    "attempt": "4 of 3",
    "instructor": "Dawn Hall",
    "similarity": "10%",
  },
  {
    "id": "4",
    "time_left": "-10hr 30m",
    "learner": "Jessica",
    "competency": "Analyze Written Works",
    "type": "Final",
    "attempt": "1 of 3",
    "instructor": "Christopher Edwards",
    "similarity": "27%",
  },
  {
    "id": "5",
    "time_left": "4hr 18m",
    "learner": "James",
    "competency": "Explain Writer's Choices",
    "type": "Practice 1",
    "attempt": "3 of 3",
    "instructor": "Julia De La Cruz",
    "similarity": "89%",
  },
  {
    "id": "6",
    "time_left": "14hr 30m",
    "learner": "Karl",
    "competency": "Adapt the Writing Process",
    "type": "Practice 2",
    "attempt": "4 of 3",
    "instructor": "Dawn Hall",
    "similarity": "10%",
  },
];

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  fetchAssessments() {
    return of(mockData);
  }
}

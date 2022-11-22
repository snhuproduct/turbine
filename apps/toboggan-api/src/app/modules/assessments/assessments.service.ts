import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IAssessmentFlag } from './assessments.types';

function addHoursAndMinutes(numOfHours, numOfMinutes = 0, date = new Date()) {
  date.setHours(date.getHours() + numOfHours);
  date.setMinutes(date.getMinutes() + numOfMinutes);

  return date.toISOString();
}

@Injectable()
export class AssessmentsService {
  assessments: IAssessment[] = [];

  constructor(private readonly httpService: HttpService) {
    for (let i = 0; i < 20; i++) {
      this.assessments = [
        {
          "id": "1",
          "timeLeft": addHoursAndMinutes(10, 30),
          "learner": "Jessica",
          "result": null,
          "resultComment": null,
          "competency": "Analyze Written Works",
          "type": "Final",
          "currentAttempt": 1,
          "attempts": 3,
          "instructor": "Christopher Edwards",
          "similarity": .27,
          "similarityUrl": 'https://google.com',
          "evaluated": false,
          "flagged": true,
        },
        {
          "id": "2",
          "timeLeft": addHoursAndMinutes(-4, -18),
          "learner": "James",
          "result": null,
          "resultComment": null,
          "competency": "Explain Writer's Choices",
          "type": "Practice 1",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Julia De La Cruz",
          "similarity": .89,
          "similarityUrl": 'https://google.com',
          "evaluated": false,
          "flagged": false,
        },
        {
          "id": "3",
          "timeLeft": addHoursAndMinutes(-5, -45),
          "learner": "Karl",
          "result": null,
          "resultComment": null,
          "competency": "Adapt the Writing Process",
          "type": "Practice 2",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Dawn Hall",
          "similarity": .1,
          "similarityUrl": 'https://google.com',
          "evaluated": false,
          "flagged": false,
        },
        {
          "id": "4",
          "timeLeft": addHoursAndMinutes(-10, -30),
          "learner": "Sebastian",
          "result": null,
          "resultComment": null,
          "competency": "Analyze Written Works",
          "type": "Final",
          "currentAttempt": 4,
          "attempts": 3,
          "instructor": "Christopher Edwards",
          "similarity": .27,
          "similarityUrl": 'https://google.com',
          "evaluated": false,
          "flagged": false,
        },
        {
          "id": "5",
          "timeLeft": addHoursAndMinutes(-14, -30),
          "learner": "Bruno",
          "result": null,
          "resultComment": null,
          "competency": "Explain Writer's Choices",
          "type": "Practice 1",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Julia De La Cruz",
          "similarity": .89,
          "similarityUrl": 'https://google.com',
          "evaluated": false,
          "flagged": false,
        },
        {
          "id": "6",
          "timeLeft": addHoursAndMinutes(-14, -30),
          "learner": "Ronald",
          "result": null,
          "resultComment": null,
          "competency": "Adapt the Writing Process",
          "type": "Practice 2",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Dawn Hall",
          "similarity": .1,
          "similarityUrl": 'https://google.com',
          "evaluated": false,
          "flagged": false,
        },
        {
          "id": "7",
          "timeLeft": addHoursAndMinutes(-28, -30),
          "learner": "Lori",
          "result": "Non-Eval",
          "resultComment": "Bear claw tootsie roll pudding pudding sesame snaps brownie powder cupcake. Pie candy macaroon shortbread sweet sugar plum. Bear claw marzipan sweet cheesecake gummies chupa chups.",
          "competency": "Analyze Written Works",
          "type": "Final",
          "currentAttempt": 3,
          "attempts": 3,
          "instructor": "Christopher Edwards",
          "similarity": .27,
          "similarityUrl": 'https://google.com',
          "evaluated": true,
          "flagged": false,
        },
        {
          "id": "8",
          "timeLeft": addHoursAndMinutes(-28, -30),
          "learner": "Emily",
          "result": "Not Evident",
          "resultComment": null,
          "competency": "Explain Writer's Choices",
          "type": "Practice 1",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Julia De La Cruz",
          "similarity": .89,
          "similarityUrl": 'https://google.com',
          "evaluated": true,
          "flagged": false,
        },
        {
          "id": "9",
          "timeLeft": addHoursAndMinutes(-28, -30),
          "learner": "Katleen",
          "result": "Proficient",
          "resultComment": null,
          "competency": "Adapt the Writing Process",
          "type": "Practice 2",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Dawn Hall",
          "similarity": .1,
          "similarityUrl": 'https://google.com',
          "evaluated": true,
          "flagged": false,
        },
        {
          "id": "10",
          "timeLeft": addHoursAndMinutes(-28, -30),
          "learner": "Andrew",
          "result": "Exemplary",
          "resultComment": null,
          "competency": "Analyze Written Works",
          "type": "Final",
          "currentAttempt": 1,
          "attempts": 3,
          "instructor": "Christopher Edwards",
          "similarity": .27,
          "similarityUrl": 'https://google.com',
          "evaluated": true,
          "flagged": false,
        },
        {
          "id": "11",
          "timeLeft": addHoursAndMinutes(-28, -30),
          "learner": "James",
          "result": "Exemplary",
          "resultComment": null,
          "competency": "Explain Writer's Choices",
          "type": "Practice 1",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Julia De La Cruz",
          "similarity": .89,
          "similarityUrl": 'https://google.com',
          "evaluated": true,
          "flagged": false,
        },
        {
          "id": "12",
          "timeLeft": addHoursAndMinutes(-28, -30),
          "learner": "Karl",
          "result": "Proficient",
          "resultComment": null,
          "competency": "Adapt the Writing Process",
          "type": "Practice 2",
          "currentAttempt": 1,
          "attempts": 1,
          "instructor": "Dawn Hall",
          "similarity": .1,
          "similarityUrl": 'https://google.com',
          "evaluated": true,
          "flagged": false,
        },
      ];
    }
  }

  getAssessments() {
    return {
      data: {
        data: this.assessments.filter(assessment => !assessment.evaluated),
        success: true,
      }
    };
  }

  getEvaluatedAssessments() {
    return {
      data: {
        data: this.assessments.filter(assessment => assessment.evaluated),
        success: true,
      }
    };
  }

  updateFlagStatus(uuid: string, body: IAssessmentFlag): Observable<AxiosResponse<IAssessment>> {
    return this.httpService.put(`/assessment-item?uuid=${uuid}`,body)
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from "./assessments.service";
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { IAssessmentFlag } from './assessments.types';
import { HttpModule } from '@nestjs/axios';
import { environment } from '../../../environments/environment';
import { AxiosResponse } from 'axios';


const mockData =[
  {
    "uuid": "KPkio0XF5tsKKsKMnsRo",
    "name": "Short name or label for the assessment item.",
    "question": "Assessment item question",
    "answer": "Answer for the question",
    "context": "Context from which the question was created",
    "options": [ ],
    "question_type": "Type of question",
    "activity_type": "Type of activity",
    "use_type": "Field to distinguish the type of assessment profile (Formative/Summative)",
    "metadata": { },
    "author": "A person or organization chiefly responsible for the intellectual or artistic content of this assessment item",
    "difficulty": 1,
    "alignments": { },
    "parent_nodes": {
    "learning_experiences": [ ],
    "learning_objects": [ ]
    },
    "references": {
    "competencies": [ ],
    "skills": [ ]
    },
    "child_nodes": { },
    "assessment_reference": {
    "activity_id": "",
    "activity_template_id": "",
    "source": "learnosity"
    },
    "achievements": [ ],
    "pass_threshold": 1,
    "is_flagged": false,
    "comments": "",
    "created_time": "2022-03-03 09:22:49.843674+00:00",
    "last_modified_time": "2022-03-03 09:22:49.843674+00:00"
    }
]

const mockResponse: AxiosResponse = {
  data: null,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('AssessmentsController', () => {
  let controller: AssessmentsController;
  let service: AssessmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL:
            environment.GPCoreBaseUrl + '/assessment-service/api/v1',
          timeout: 8000,
          maxRedirects: 3,
        }),
      ],
      controllers: [AssessmentsController],
      providers: [AssessmentsService]
    }).compile();

    service = module.get<AssessmentsService>(AssessmentsService);
    controller = module.get<AssessmentsController>(AssessmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateFlagStatus', () => {
    it('should update flag status', async () => {
      
      const existingAssessment = mockData[0];
      mockResponse.data = existingAssessment;
      mockResponse.data['is_flagged'] = true;
      mockResponse.data['comments'] = 'mock update';
      const mockAssessmentId = mockData[0].uuid;

      jest.spyOn(service, 'updateFlagStatus').mockImplementation(() => of(mockResponse));

      controller
        .updateFlagStatus(mockAssessmentId, existingAssessment)
        .subscribe((response) => {
          expect(service.updateFlagStatus).toHaveBeenCalledWith(
            mockAssessmentId,
            existingAssessment
        );
        expect(response).toBe(mockResponse);
      });
    });
  });

});

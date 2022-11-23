import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AssessmentService } from './assessment.service';

describe('AssessmentService', () => {
  let service: AssessmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssessmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should have called api for updateAssessment', () => {
    service.updateAssessment('1', {} as any);
    const req = httpMock.expectOne(`/api/assessments/:1`);
    expect(req.request.method).toBe('PUT');
    req.flush([]);
  });

  it('should have called api for returnUnevaluated', () => {
    service.returnUnevaluated('1', {} as any);
    const req = httpMock.expectOne(`/api/assessments/unevaluate/:1`);
    expect(req.request.method).toBe('PUT');
    req.flush([]);
  });
});

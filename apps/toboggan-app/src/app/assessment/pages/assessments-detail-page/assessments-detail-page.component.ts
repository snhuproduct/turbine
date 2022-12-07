import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'toboggan-ws-assessments-detail-page',
  templateUrl: './assessments-detail-page.component.html',
  styleUrls: ['./assessments-detail-page.component.scss'],
})
export class AssessmentsDetailPageComponent implements OnInit {
  isExpanded = false;
  actions: string[] = [
    'Open rubric',
    'Flag for academic integrity',
    'Return unevaluated',
  ];
  learnerName = '';
  constructor(private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.learnerName =
      this.assessmentService.getAssessmentInEvaluation()?.learner;
  }

  toggleMoreActions() {
    this.isExpanded = !this.isExpanded;
  }
}

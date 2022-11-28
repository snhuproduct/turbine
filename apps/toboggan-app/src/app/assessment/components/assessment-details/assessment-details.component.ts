/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';

@Component({
  selector: 'toboggan-ws-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.scss'],
})
export class AssessmentDetailsComponent {
  isShown=false;
  actions: string[] = ['Open rubric', 'Flag for academic integrity', 'Return unevaluated']
  isExpanded = false;
  constructor() {}


  toggleShowEvaluation() {
    this.isShown = !this.isShown;
  }

  toggleMoreActions() {
    this.isExpanded = !this.isExpanded;
  }
}

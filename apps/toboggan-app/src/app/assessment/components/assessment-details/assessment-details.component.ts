/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Component, OnInit } from '@angular/core';
import { TableDataGenerator } from '@snhuproduct/toboggan-ui-components-library';

@Component({
  selector: 'toboggan-ws-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.scss'],
})
export class AssessmentDetailsComponent implements OnInit {
  isShown=false;
  dataGenerator: TableDataGenerator = {} as TableDataGenerator;
  actions: string[] = ['Open rubric', 'Flag for academic integrity', 'Return unevaluated']
  isExpanded = false;
  constructor() {}

 
  ngOnInit(): void {}

  toggleShowEvaluation() {
    this.isShown = !this.isShown;
  }

  toggleMoreActions() {
    this.isExpanded = !this.isExpanded;
  }
}

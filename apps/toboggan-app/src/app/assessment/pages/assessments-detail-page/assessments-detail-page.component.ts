import { Component } from '@angular/core';

@Component({
  selector: 'toboggan-ws-assessments-detail-page',
  templateUrl: './assessments-detail-page.component.html',
  styleUrls: ['./assessments-detail-page.component.scss'],
})
export class AssessmentsDetailPageComponent {
  isExpanded = false;
  actions: string[] = [
    'Open rubric',
    'Flag for academic integrity',
    'Return unevaluated',
  ];
  toggleMoreActions() {
    this.isExpanded = !this.isExpanded;
  }
}

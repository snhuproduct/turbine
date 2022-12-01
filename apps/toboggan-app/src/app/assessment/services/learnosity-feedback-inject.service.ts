/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LearnosityItemsInjectService } from './learnosity-items-inject.service';

declare let LearnosityReports: any;
declare let jQuery: any;

@Injectable({
  providedIn: 'root',
})
export class LearnosityFeedbackInjectService {
  private reportsApp: any;
  public renderReportCompleted = false;

  constructor(
    private learnosityItemsInjectService: LearnosityItemsInjectService,
    private http: HttpClient
  ) {}

  generateReportForAssessments(
    assessmentId: string,
    sessionId: string,
    userId: string
  ) {
    console.log('sessionId in report service=>', sessionId);
    this.http
      .get(
        `api/learnosity/player/init/feedback/${userId}/${assessmentId}/${sessionId}`
      )
      .pipe(
        map((feedbackRequest) => {
          this.reportsApp = LearnosityReports.init(feedbackRequest, {
            readyListener: () => {
              console.log('Learnosity Reports API - initialization ready');
              this.renderReportCompleted = true;
              // this.handleAssessorFeedback(userId, assessmentId, sessionId);
            },
            errorListener(err: any) {
              console.log('error', err);
            },
          });
        })
      )
      .subscribe();
  }

  handleAssessorFeedback(
    userId: string,
    assessmentId: string,
    sessionId: string
  ) {
    const getQuestionsComplete$ = new BehaviorSubject<boolean>(false);
    const itemReferences: any[] = [];
    const report1 = this.reportsApp.getReport('report-1');
    report1.on('ready:itemsApi', (itemsApp: any) => {
      const rubricContainer = document.getElementById('rubric-container');
      if (rubricContainer) rubricContainer.innerHTML = '';
      itemsApp.getQuestions(function (questions: any[]) {
        for (const item in questions) {
          const element = questions[item];

          if (element.metadata.rubric_reference !== undefined) {
            const itemId =
              element.response_id + '_' + element.metadata.rubric_reference;
            const containerElement = document.createElement('span');
            containerElement.classList.add('learnosity-item');
            containerElement.dataset['reference'] = itemId;

            if (rubricContainer) {
              rubricContainer?.appendChild(containerElement);
            }

            itemReferences.push({
              id: itemId,
              reference: element.metadata.rubric_reference,
            });
          }
        }
        getQuestionsComplete$.next(true);
      });

      getQuestionsComplete$.subscribe((value) => {
        if (value) {
          this.learnosityItemsInjectService.generateLearnosityItemsByReference(
            userId,
            assessmentId,
            sessionId,
            itemReferences
          );
        }
      });
    });
  }

  generateFeedbackReport(
    assessmentId: string,
    sessionId: string,
    userId: string,
    feedbackSessionId: string
  ) {
    this.http
      .get(
        `learnosity/player/init/feedback/${userId}/${assessmentId}/${sessionId}`
      )
      .pipe(
        map((feedbackRequest) => {
          this.reportsApp = LearnosityReports.init(feedbackRequest, {
            readyListener: () => {
              console.log('Learnosity Reports API - initialization ready');
              this.handleAssessorFeedbackReport(
                userId,
                assessmentId,
                sessionId,
                feedbackSessionId
              );
            },
            errorListener(err: any) {
              console.log('error', err);
            },
          });
        })
      )
      .subscribe();
  }

  handleAssessorFeedbackReport(
    userId: string,
    assessmentId: string,
    sessionId: string,
    feedbackSessionId: string
  ) {
    const getQuestionsComplete$ = new BehaviorSubject<boolean>(false);
    const itemReferences: any[] = [];
    const report1 = this.reportsApp.getReport('report-1');

    report1.on('ready:itemsApi', (itemsApp: any) => {
      jQuery('.lrn_widget')
        .wrap('<div class="row"></div>')
        .wrap('<div class="col-md-6"></div>');
      itemsApp.getQuestions(function (questions: any[]) {
        for (const item in questions) {
          const element = questions[item];
          if (element.metadata.rubric_reference !== undefined) {
            const itemId =
              element.response_id + '_' + element.metadata.rubric_reference;

            jQuery(
              '<span class="learnosity-item" data-reference="' + itemId + '">'
            )
              .appendTo(jQuery('#' + element.response_id).closest('.row'))
              .wrap('<div class="col-md-6"></div>');

            itemReferences.push({
              id: itemId,
              reference: element.metadata.rubric_reference,
            });
          }
        }
        getQuestionsComplete$.next(true);
      });

      getQuestionsComplete$.subscribe((value) => {
        if (value) {
          this.learnosityItemsInjectService.generateItemsByReference(
            userId,
            feedbackSessionId,
            itemReferences
          );
        }
      });
    });
  }
}

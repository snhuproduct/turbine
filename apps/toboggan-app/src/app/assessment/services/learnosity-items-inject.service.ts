/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { uuidv4 } from '@firebase/util';
import {
  IAssessmentID,
  ILearnosityItemReference,
  ILearnosityResponse,
} from '@toboggan-ws/toboggan-common';

import { BehaviorSubject, map, mergeMap, Observable } from 'rxjs';

declare let LearnosityItems: any;

@Injectable({
  providedIn: 'root',
})
export class LearnosityItemsInjectService {
  public renderItemsComplete$ = new BehaviorSubject<any>({});
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateLearnosityItems(
    assessmentId: string,
    element: Element,
    user_id: string
  ) {
    const userId = user_id ? user_id : uuidv4();
    const sessionId = uuidv4();
    // save the event of assessment initiation to LRS

    this.http
      .get<IAssessmentID[]>(`api/learnosity/player/temp/assessments-list`)
      // get assessment session object
      .pipe(
        mergeMap((assessmentsObs) => {
          const assessmentTemplateID = assessmentsObs.filter(
            (assessmentObj) => assessmentObj.assessmentId === assessmentId
          )[0].assessmentTemplateId;
          return this.http.post<ILearnosityResponse>(
            `api/learnosity/player/init/assessment`,
            {
              user_id: userId,
              access_api: 'items',
              activity_template_id: assessmentTemplateID,
              // session ID needs to be a valid UUID to work properly with Learnosity
              // this bit may need to change depending on a sync with gp-core
              session_id: sessionId,
              activity_id: assessmentId,
              rendering_type: 'assess',
              type: 'submit_practice',
              name: 'Items API Quickstart',
              state: 'initial',
              config: {
                regions: 'main',
                questions_api_init_options: {
                  beta_flags: {
                    reactive_views: true,
                  },
                },
                labelBundle: {
                  item: 'Question',
                },
                configuration: {
                  onsubmit_redirect_url: `learnosity-assessment/feedback/${assessmentId}/${userId}/${sessionId}`,
                },
              },
            }
          );
        })
      )
      // finally, render the session object
      .subscribe((assessmentSessionInitObj) => {
        LearnosityItems.init(assessmentSessionInitObj, {
          readyListener() {
            console.log(
              `Learnosity Initialization of assessment "${assessmentId}" is ready!`
            );
          },
          errorListener(err: unknown) {
            console.log('error', err);
          },
        });
        return new Observable();
      });
  }

  generateLearnosityItemsByReference(
    userId: string,
    assessmentId: string,
    sessionId: string,
    references: ILearnosityItemReference[]
  ) {
    // this request needs new session ID, which is also serves as sessionId for feedback report page
    const newSessionId = uuidv4();
    const request: any = {
      user_id: userId,
      rendering_type: 'inline',
      name: 'Items API demo - feedback activity.',
      state: 'initial',
      activity_id: 'feedback_test_1',
      session_id: newSessionId,
      items: references,
      type: 'feedback',
      // config: {
      //   renderSaveButton: true,
      // },
    };

    this.http
      .post<ILearnosityResponse>(
        `api/learnosity/player/init/feedback/assessor`,
        request
      )
      .pipe(
        map((assessmentSessionInitObj) => {
          if (assessmentSessionInitObj && assessmentSessionInitObj?.request) {
            const itemsApp = LearnosityItems.init(assessmentSessionInitObj, {
              readyListener: () => {
                console.log(
                  'Learnosity items for report -  Initialization is ready!'
                );
                console.log(itemsApp);
                console.log('sessionId in inject service=>', sessionId);
                this.renderItemsComplete$.next({ newSessionId, itemsApp });
              },
              errorListener(err: unknown) {
                console.log('error', err);
              },
            });
          } else {
            console.warn('Item references are not available');
            console.warn(assessmentSessionInitObj);
          }
        })
      )
      .subscribe();
  }

  generateItemsByReference(
    userId: string,
    sessionId: string,
    references: ILearnosityItemReference[]
  ) {
    const request: any = {
      user_id: userId,
      rendering_type: 'inline',
      name: 'Items API demo - feedback activity.',
      state: 'review',
      activity_id: 'feedback_test_1',
      session_id: sessionId,
      items: references,
      type: 'feedback',
    };

    this.http
      .post<ILearnosityResponse>(
        `learnosity/player/init/feedback/assessor`,
        request
      )
      .pipe(
        map((assessmentSessionInitObj) => {
          if (assessmentSessionInitObj && assessmentSessionInitObj?.request) {
            LearnosityItems.init(assessmentSessionInitObj, {
              readyListener: () => {
                console.log(
                  'Learnosity items for report -  Initialization is ready!'
                );
              },
              errorListener(err: unknown) {
                console.log('error', err);
              },
            });
          } else {
            console.warn('Item references are not available');
            console.warn(assessmentSessionInitObj);
          }
        })
      )
      .subscribe();
  }
}

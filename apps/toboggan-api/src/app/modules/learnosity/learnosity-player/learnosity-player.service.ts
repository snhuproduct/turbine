import { Injectable } from '@nestjs/common';
import {
  ILearnosityActivityRequestPayload,
  ILearnosityFeedbackRequestPayload,
  ILearnosityResponse,
  LearnosityAvailableAPIs,
  LearnosityReportTypes,
} from '@toboggan-ws/toboggan-common';
import { environment } from '../../../../environments/environment';
import { AssessmentsService } from '../../assessments/assessments.service';
import {
  itemBankTempMap,
  LearnosityDefaultSecurityCredentials,
} from '../learnosity.config';

// import { LearnosityDefaultSecurityCredentials } from '../learnosity.config';
import Learnosity = require('learnosity-sdk-nodejs');

@Injectable()
export class LearnosityPlayerService {
  private learnositySdk: Learnosity = new Learnosity();
  private userSessions = [];
  constructor(private assessmentsService: AssessmentsService) {}

  public init(
    requestPayload: ILearnosityActivityRequestPayload
  ): ILearnosityResponse {
    const { user_id, activity_id, access_api } = requestPayload;
    const securityCredentials = this.getSecurityCredentials(
      user_id,
      itemBankTempMap[activity_id].consumerKey
    );
    return this.learnositySdk.init(
      access_api,
      securityCredentials,
      itemBankTempMap[activity_id].consumerSecret,
      requestPayload,
      requestPayload.data_action
    );
  }

  public getAssessmentItemBankDetails() {
    return Object.keys(itemBankTempMap).map((assessmentId) => {
      return {
        assessmentId,
        assessmentTemplateId: itemBankTempMap[assessmentId].templateId,
      };
    });
  }

  public initAssesseeFeedback(
    userId: string,
    activityId: string,
    sessionId: string
  ): ILearnosityResponse {
    this.userSessions.push({
      activityId,
      userId,
      sessionId,
    });
    console.log(this.userSessions);
    const security = this.getSecurityCredentials(
      userId,
      itemBankTempMap[activityId].consumerKey
    );
    const request = {
      reports: [
        {
          id: `report-1`,
          //needs to be an enum in the future
          // all the types can be found here: https://reference.learnosity.com/reports-api/reporttypes
          // the type below can be found here: https://reference.learnosity.com/reports-api/reporttypes#sessionDetailByItem
          type: LearnosityReportTypes.SessionDetailByItem,
          user_id: userId,
          session_id: sessionId,
        },
      ],
    };
    return this.learnositySdk.init(
      LearnosityAvailableAPIs.Reports,
      security,
      itemBankTempMap[activityId].consumerSecret,
      request
    );
  }

  public initAssessorFeedback(
    feedbackReqPayload: ILearnosityFeedbackRequestPayload
  ): ILearnosityResponse | { status; message } {
    if (!feedbackReqPayload.items.length) {
      const msg = 'Item references are not available!';
      console.error(msg);
      return { status: 'success', message: msg };
    }
    const security = this.getSecurityCredentials(
      feedbackReqPayload.user_id,
      environment.learnosity.qsItemBankConsumerKey
    );
    return this.learnositySdk.init(
      LearnosityAvailableAPIs.Items,
      security,
      //TODO: experiment and fix fetching the correct key here
      environment.learnosity.qsItemBankConsumerSecret,
      feedbackReqPayload
    );
  }

  private getSecurityCredentials(userId: string, consumerKey: string) {
    return {
      // it's a nice idea, but we're unfortunately still using learnosity demo assessments,
      // so will need two different sets of credentials for the time being
      // hence commenting the line below out for now, will use it later
      /////...LearnosityDefaultSecurityCredentials,
      user_id: userId,
      domain: LearnosityDefaultSecurityCredentials.domain,
      consumer_key: consumerKey,
    };
  }
}

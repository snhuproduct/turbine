import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { LearnositySecurityCredentials } from './learnosity.config';
import {
  ILearnosityActivityRequestPayload,
  ILearnosityFeedbackRequestPayload,
  ILearnosityResponse,
  LearnosityAvailableAPIs,
  LearnosityReportTypes,
} from './learnosity.types';

import Learnosity = require('learnosity-sdk-nodejs');

@Injectable()
export class LearnosityService {
  private learnositySdk: Learnosity = new Learnosity();
  private consumerSecret;
  constructor(private httpService: HttpService) {
    this.consumerSecret = environment.learnosity.consumerSecret;
  }

  //this service method can be used for all available API
  // Items API, Reports API and Data API
  // this method will prepare request that can fed to LearnosityItems , LearnosityReports or Data API
  public init(
    requestPayload:
      | ILearnosityActivityRequestPayload
      | ILearnosityFeedbackRequestPayload
  ): ILearnosityResponse {
    const { access_api } = requestPayload;

    return this.learnositySdk.init(
      access_api,
      LearnositySecurityCredentials,
      this.consumerSecret,
      requestPayload,
      requestPayload.data_action
    );
  }

  public initAssesseeFeedback(
    userId: string,
    sessionId: string
  ): ILearnosityResponse {
    const request = {
      reports: [
        {
          id: `report-1`, // this is id that is present in UI side  - its a container into which submission details will be loaded
          type: LearnosityReportTypes.SessionDetailByItem,
          user_id: userId,
          session_id: sessionId,
        },
      ],
    };
    return this.learnositySdk.init(
      LearnosityAvailableAPIs.Reports,
      LearnositySecurityCredentials,
      this.consumerSecret,
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

    return this.learnositySdk.init(
      LearnosityAvailableAPIs.Items,
      LearnositySecurityCredentials,
      this.consumerSecret,
      feedbackReqPayload
    );
  }
}

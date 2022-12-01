import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ILearnosityResponse } from '@toboggan-ws/toboggan-common';
import { v4 as uuidv4 } from 'uuid';
import { AssessmentsService } from '../../assessments/assessments.service';
import { HTTPHeaderAuthGuard } from '../../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../../auth/token.interceptor';

import { LearnosityDataInitDTO } from './dto/learnosity.data-init.dto';
import { LearnosityAssessorFeedbacInitDTO } from './dto/learnosity.feedback-assessor.dto';
import { LearnosityQuestionsInitDTO } from './dto/learnosity.questions-init.dto';
import { LearnosityPlayerService } from './learnosity-player.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor)
@Controller('learnosity/player')
export class LearnosityPlayerController {
  constructor(
    private learnosityPlayerService: LearnosityPlayerService,
    private assessmentsService: AssessmentsService
  ) {}

  private initialize(request, response, payload): ILearnosityResponse {
    const userId = request.user.data.localId;

    const result = this.learnosityPlayerService.init({
      user_id: userId,
      session_id: uuidv4(), //! Hardcoded, until Glidepath session management implementation
      ...payload,
    });
    return response.status(200).send(result);
  }

  @Get('/temp/assessments-list')
  getAssessments() {
    console.log('test');
    return this.learnosityPlayerService.getAssessmentItemBankDetails();
  }

  @Post('/init/assessment') //! Temporary endpoint
  async initAssessment(
    @Req() req,
    @Res() response,
    @Body() body
  ): Promise<ILearnosityResponse> {
    return this.initialize(req, response, body);
  }

  // @Post('/init/assessment/gcp') //! This will be used soon
  // async initAssessmentGCP(
  //   @Req() req,
  //   @Res() response,
  //   @Body() assessmentDTO: LearnosityAssessmentInitDTO
  // ): Promise<ILearnosityResponse> {
  //   const { assessment_id } = assessmentDTO;

  //   const assessmentReferenceData =
  //     await this.assessmentsService.getAssessmentReferenceInfo(assessment_id);

  //   return this.initialize(req, response, {
  //     ...assessmentReferenceData,
  //     ...assessmentDTO,
  //   });
  // }

  @Post('/init/questions')
  initQuestions(
    @Req() req,
    @Res() response,
    @Body() questionsDTO: LearnosityQuestionsInitDTO
  ): ILearnosityResponse {
    return this.initialize(req, response, questionsDTO);
  }

  @Post('/init/data')
  initData(
    @Req() req,
    @Res() response,
    @Body() dataDTO: LearnosityDataInitDTO
  ): ILearnosityResponse {
    return this.initialize(req, response, dataDTO);
  }

  @Get('/init/feedback/:userId/:activityId/:sessionId')
  initFeedback(
    @Param('userId') userId: string,
    @Param('activityId') activityId: string,
    @Param('sessionId') sessionId: string
  ) {
    return this.learnosityPlayerService.initAssesseeFeedback(
      userId,
      activityId,
      sessionId
    );
  }

  @Post('/init/feedback/assessor')
  initAssessorFeedback(
    @Body() assessorFeedbackDTO: LearnosityAssessorFeedbacInitDTO
  ): ILearnosityResponse | { status; message } {
    return this.learnosityPlayerService.initAssessorFeedback(
      assessorFeedbackDTO
    );
  }
}

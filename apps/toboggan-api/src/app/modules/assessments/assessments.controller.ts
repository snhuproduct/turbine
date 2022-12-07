import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { AssessmentsService } from './assessments.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor, RequestInterceptor)
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get('/')
  getAssessments() {
    return this.assessmentsService.getAssessments();
  }

  @Get('/evaluated')
  getEvaluatedAssessments() {
    return this.assessmentsService.getEvaluatedAssessments();
  }

  //Update Flag assessment
  // @Put('/:uuid')
  // updateFlagStatus(@Param('uuid') uuid, @Body() body: IAssessmentFlag) {
  //   return this.assessmentsService.updateFlagStatus(uuid, body);
  // }

  @Put('/:uuid')
  updateAssessment(@Param('uuid') uuid, @Body() body: Partial<IAssessment>) {
    console.log(body);
    return true;
    // return this.assessmentsService.updateAssessment(uuid, body);
  }
}

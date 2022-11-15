import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { AssessmentsService } from './assessments.service';
import { IAssessmentFlag } from './assessments.types';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor, RequestInterceptor)
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) { }

//Update Flag assessment
  @Put('/:uuid')
  updateFlagStatus(@Param('uuid') uuid, @Body() body: IAssessmentFlag) {
    return this.assessmentsService.updateFlagStatus(uuid, body);
  }
}

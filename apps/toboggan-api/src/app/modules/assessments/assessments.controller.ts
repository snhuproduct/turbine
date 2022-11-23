import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { AssessmentsService } from './assessments.service';
import { IAssessment } from './assessments.types';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor, RequestInterceptor)
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  //Update Flag assessment
  @Put('/:uuid')
  updateAssessment(@Param('uuid') uuid, @Body() body: Partial<IAssessment>) {
    return this.assessmentsService.updateAssessment(uuid, body);
  }

  @Put('/unevaluate/:uuid')
  returnUnevaluated(@Param('uuid') uuid, @Body() body: Partial<IAssessment>) {
    return this.assessmentsService.returnUnevaluated(uuid, body);
  }
}

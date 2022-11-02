/* eslint-disable no-return-await */
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { AssessmentsService } from './assessments.service';
import { IAssessmentFlag } from './assessments.types';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor,ResponseInterceptor, RequestInterceptor)
@Controller('assessments')
export class AssessmentsController {
  constructor(private assessmentsService: AssessmentsService) {}

  // get all assessments
  @Get('/')
  private async getAllAssessments(
    @Res() res,
    @Query('search') search?: string,
    @Query('skip') skip = 0,
    @Query('limit') limit = 10
  ) {
    if (search) {
      const response = await this.assessmentsService.searchAssessments(search);

      return res.send(response);
    }

    const response = await this.assessmentsService.getAllAssessments(
      skip,
      limit
    );

    return res.send(response);
  }

  @Get('/:uuid')
  private async findOneAssessment(@Res() res, @Param('uuid') uuid: string) {
    const response = await this.assessmentsService.findOneAssessment(uuid);

    return res.send(response);
  }

  //Update Flag assessment
  @Put('/:uuid')
  async updateFlagAssessment(@Param('uuid') uuid :string, @Body() body :IAssessmentFlag ){
    return this.assessmentsService.updateFlagAssessment(uuid,body)
  }

}

/* eslint-disable no-return-await */
import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { AssessmentsService } from './assessments.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor)
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
}

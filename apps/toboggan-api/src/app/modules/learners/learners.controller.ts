import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ILearnerInput } from '@toboggan-ws/toboggan-common';

import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { LearnersService } from './learners.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor)
@Controller('learners')
export class LearnersController {
  constructor(private learnersService: LearnersService) {}

  @Get('/')
  getLearners(@Query() query) {
    const { currentPage: skip, resultsPerPage: limit } = query;

    return this.learnersService.getLearners({ skip, limit });
  }

  @Get('/:uuid')
  getLearner(@Param('uuid') uuid) {
    return this.learnersService.getLearner(uuid);
  }

  @Post('/')
  createLearner(@Body() learner: ILearnerInput) {
    return this.learnersService.createLearner(learner);
  }

  @Put('/:uuid')
  updateLearner(@Param('uuid') uuid, @Body() updatedLearner) {
    return this.learnersService.updateLearner(uuid, updatedLearner);
  }

  @Delete('/:uuid')
  deleteLearner(@Param('uuid') uuid) {
    return this.learnersService.deleteLearner(uuid);
  }
}

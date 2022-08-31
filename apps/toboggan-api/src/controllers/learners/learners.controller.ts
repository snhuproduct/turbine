import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ILearner } from '@toboggan-ws/toboggan-common';
import { LearnersService } from '../../providers/learners/learners.service';

@Controller('learners')
export class LearnersController {
  constructor(private learnersService: LearnersService) {}

  @Get('/')
  getLearners(@Query() query) {
    const { currentPage, resultsPerPage } = query;

    if (currentPage && resultsPerPage) {
      return this.learnersService.getPaginatedLearners(currentPage, resultsPerPage);
    }

    return this.learnersService.getLearners();
  }

  @Get('/:id')
  getLearner(@Param('id') id, @Body() updatedLearner: ILearner) {
    return this.learnersService.getLearner();
  }

  @Post('/')
  createLearner(@Body() learner: ILearner) {
    return this.learnersService.createLearner(learner);
  }

  @Put('/:id')
  updateLearner(@Param('id') id, @Body() updatedLearner: ILearner) {
    return this.learnersService.updateLearner(id, updatedLearner);
  }

  @Patch('/:id')
  patchLearner(@Param('id') id, @Body() updatedLearner: ILearner) {
    return this.learnersService.patchLearner(id, updatedLearner);
  }

  @Delete('/:id')
  deleteLearner(@Param('id') id) {
    return this.learnersService.deleteLearner(id);
  }
}

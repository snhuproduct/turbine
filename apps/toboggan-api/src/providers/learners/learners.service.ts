import { Injectable } from '@nestjs/common';
import { ILearner } from '@toboggan-ws/toboggan-common';
import * as arrayPaginate from 'array-paginate';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LearnersService {
  learners: ILearner[] = [];
  learner: ILearner;

  constructor() {
    for (let i = 0; i < 20; i++) {
      this.learners.push({
        id: uuidv4(),
        firstName: `name${i}`,
        lastName: `last${i}`,
        email: `user-${i}@sada.com`,
      });
    }
    this.learner = this.learners[0];
  }

  getLearners(): ILearner[] {
    return this.learners;
  }

  getLearner(): ILearner {
    return this.learner;
  }

  getPaginatedLearners(currentPage: number, resultsPerPage = 10): ILearner[] {
    const paginatedLearners = arrayPaginate(
      this.learners,
      currentPage,
      resultsPerPage
    );

    return paginatedLearners;
  }

  createLearner(newLearner: ILearner) {
    const newId = this.learners.length + 1;
    newLearner.id = newId as unknown as string;
    this.learners.push(newLearner);
    return newLearner;
  }

  updateLearner(id: string, updatedLearner: ILearner) {
    this.learners = this.learners.map((group) => {
      if (group.id === id) {
        return {
          id: group.id,
          ...updatedLearner,
        };
      }
      return group;
    });
  }

  patchLearner(id: string, updatedLearner: ILearner) {
    this.learners = this.learners.map((group) => {
      if (group.id === id) {
        return {
          ...group,
          ...updatedLearner,
        };
      }
      return group;
    });
  }

  deleteLearner(id: string) {
    this.learners = this.learners.filter((group) => group.id !== id);
  }
}

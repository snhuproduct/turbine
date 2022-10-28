/* eslint-disable no-await-in-loop */
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  AssessmentStatus,
  IAssessment,
  IAssessmentReference,
} from './assessments.types';

import random from 'lodash/random';

@Injectable()
export class AssessmentsService {
  constructor(private httpService: HttpService) {}

  public async getAllAssessments(
    skip: number,
    limit: number
  ): Promise<IAssessment[]> {
    return this.executeAssessmentCall<IAssessment[]>(
      `/assessment-items?skip=${skip}&limit=${limit}`
    );
  }

  public async findOneAssessment(
    uuid: string,
    fetchTree = false
  ): Promise<IAssessment> {
    return this.executeAssessmentCall<IAssessment>(
      `/assessment-item/${uuid}?fetchTree=${fetchTree}`
    );
  }

  public async searchAssessments(name: string): Promise<IAssessment[]> {
    return this.executeAssessmentCall<IAssessment[]>(
      `/assessment-item/search?name=${name}`
    );
  }

  public async getAssessmentReferenceInfo(
    assessmentId: string
  ): Promise<IAssessmentReference> {
    const assessment = await this.findOneAssessment(assessmentId);

    if (!assessment) {
      throw new BadRequestException('Assessment information not found!');
    }

    const assessmentReference = assessment.assessment_reference;

    if (!assessmentReference) {
      throw new BadRequestException(
        'Assessment reference information not found!'
      );
    }

    const { activity_id, activity_template_id, source } = assessmentReference;

    return {
      activity_id,
      activity_template_id,
      source,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getAssessmentStatus(uuid: string): Promise<AssessmentStatus> {
    //TODO: Implement real fetching from learnosity API later
    return new Promise((resolve) => {
      setTimeout(() => {
        const n = random(0, 1);
        resolve(
          n === 0
            ? AssessmentStatus.ReadyToBeScored
            : AssessmentStatus.NotReadyToBeScored
        );
      }, 1);
    });
  }

  // The goal of having this request method is to have a single place to handle intermediary calls, like the assessment status below
  private async executeAssessmentCall<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(this.httpService.get(url));

      const data = response.data.data || response.data;

      // if data is array, loop through elements and fix status
      if (Array.isArray(data)) {
        for (const element of data) {
          element.status = await this.getAssessmentStatus(element.uuid);
        }
      } else {
        data.status = await this.getAssessmentStatus(data.uuid);
      }

      return data;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to execute assessment call');
    }
  }
}

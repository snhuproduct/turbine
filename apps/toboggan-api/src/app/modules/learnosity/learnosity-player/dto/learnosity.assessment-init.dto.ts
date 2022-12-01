import {
  ILearnosityInitConfig,
  LearnosityInitStates,
  LearnosityRenderingType,
  LearnosityStudentResponseStorageType,
} from '@toboggan-ws/toboggan-common';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { enumValidationOptions } from '../../../common/enumHelpers';

export class LearnosityAssessmentInitDTO {
  @IsString()
  @IsNotEmpty()
  assessment_id: string;

  @IsNotEmpty()
  @IsEnum(
    LearnosityRenderingType,
    enumValidationOptions('rendering_type', LearnosityRenderingType)
  )
  rendering_type: LearnosityRenderingType;

  @IsNotEmpty()
  @IsEnum(
    LearnosityStudentResponseStorageType,
    enumValidationOptions('type', LearnosityStudentResponseStorageType)
  )
  type: LearnosityStudentResponseStorageType;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(
    LearnosityInitStates,
    enumValidationOptions('state', LearnosityInitStates)
  )
  state: LearnosityInitStates;

  @IsObject()
  config: ILearnosityInitConfig;
}

import {
  ILearnosityQuestion,
  LearnosityAvailableAPIs,
  LearnosityInitStates,
  LearnosityStudentResponseStorageType,
} from '@toboggan-ws/toboggan-common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { enumValidationOptions } from '../../../common/enumHelpers';

export class LearnosityQuestionsInitDTO {
  @IsNotEmpty()
  @IsEnum(
    LearnosityAvailableAPIs,
    enumValidationOptions('access_api', LearnosityAvailableAPIs)
  )
  access_api: LearnosityAvailableAPIs;

  @IsNotEmpty()
  @IsEnum(
    LearnosityStudentResponseStorageType,
    enumValidationOptions('type', LearnosityStudentResponseStorageType)
  )
  type: LearnosityStudentResponseStorageType;

  @IsEnum(
    LearnosityInitStates,
    enumValidationOptions('state', LearnosityInitStates)
  )
  state: LearnosityInitStates;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearnosityQuestionDTO)
  questions: ILearnosityQuestion[];
}

class LearnosityQuestionDTO {
  @IsNotEmpty()
  @IsString()
  response_id: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  stimulus: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  stimulus_list: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  possible_responses: string[];

  @IsNotEmpty()
  @IsObject()
  validation: {
    score: number;
    value: string[];
  };
}

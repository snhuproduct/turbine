import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { enumValidationOptions } from '../../../modules/common/enumHelpers';
import {
  ILearnosityFeedbackRequestPayload,
  ILearnosityInitConfig,
  ILearnosityItemReference,
  LearnosityAvailableAPIs,
  LearnosityDataActions,
  LearnosityInitStates,
  LearnosityRenderingType,
  LearnosityStudentResponseStorageType,
  LearnositySubmissionTypes,
} from '../learnosity.types';

export class LearnosityAssessorFeedbacInitDTO
  implements ILearnosityFeedbackRequestPayload
{
  @IsNotEmpty()
  @IsString()
  access_api: LearnosityAvailableAPIs;

  @IsOptional()
  @IsString()
  data_action?: LearnosityDataActions;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  session_id: string;

  @IsNotEmpty()
  @IsString()
  activity_id: string;

  @IsNotEmpty()
  @IsEnum(
    LearnosityRenderingType,
    enumValidationOptions('rendering_type', LearnosityRenderingType)
  )
  rendering_type: LearnosityRenderingType;

  @IsNotEmpty()
  @IsEnum(
    LearnosityStudentResponseStorageType,
    enumValidationOptions('type', LearnositySubmissionTypes)
  )
  type: LearnositySubmissionTypes;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  items: ILearnosityItemReference[];

  @IsEnum(
    LearnosityInitStates,
    enumValidationOptions('state', LearnosityInitStates)
  )
  state: LearnosityInitStates;

  @IsObject()
  @IsOptional()
  config: ILearnosityInitConfig;
}

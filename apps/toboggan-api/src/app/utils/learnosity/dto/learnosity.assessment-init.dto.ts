import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { enumValidationOptions } from '../../../modules/common/enumHelpers';
import {
  ILearnosityActivityRequestPayload,
  ILearnosityInitConfig,
  LearnosityAvailableAPIs,
  LearnosityInitStates,
  LearnosityRenderingType,
  LearnosityStudentResponseStorageType,
} from '../learnosity.types';

export class LearnosityAssessmentInitDTO
  implements ILearnosityActivityRequestPayload
{
  // Uniq user id  -> usually a uuid . We will be using uuid that we get as part of token
  @IsNotEmpty()
  @IsString()
  user_id: string;

  // it can be items, reports etc
  @IsNotEmpty()
  @IsString()
  access_api: LearnosityAvailableAPIs;

  // uniq id uses to initialize assessment . It is needed for pulling reports as well
  @IsNotEmpty()
  @IsString()
  session_id: string;

  // uniq ID - needed for initialization - should be present in SNHU item bank
  @IsString()
  @IsNotEmpty()
  activity_id: string;

  @IsString()
  @IsNotEmpty()
  activity_template_id: string;

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

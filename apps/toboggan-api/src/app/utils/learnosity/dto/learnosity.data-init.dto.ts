import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { enumValidationOptions } from '../../../modules/common/enumHelpers';
import {
  LearnosityAvailableAPIs,
  LearnosityDataActions,
} from '../learnosity.types';

export class LearnosityDataInitDTO {
  @IsNotEmpty()
  @IsEnum(
    LearnosityAvailableAPIs,
    enumValidationOptions('access_api', LearnosityAvailableAPIs)
  )
  access_api: LearnosityAvailableAPIs;

  @IsNotEmpty()
  @IsEnum(
    LearnosityDataActions,
    enumValidationOptions('data_action', LearnosityDataActions)
  )
  data_action: LearnosityDataActions;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  references: string[];
}

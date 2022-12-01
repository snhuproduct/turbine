import {
  LearnosityAvailableAPIs,
  LearnosityDataActions,
} from '@toboggan-ws/toboggan-common';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { enumValidationOptions } from '../../../common/enumHelpers';

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
  references: string;
}

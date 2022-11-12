import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { enumValidationOptions } from '../common/enumHelpers';
import { ICreateUser, UserStatus, UserType } from './users.types';

export class CreateUserDTO implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserType, enumValidationOptions('user_type', UserType))
  user_type: UserType;

  @IsString()
  @IsOptional()
  user_type_ref?: string;

  @IsString({ each: true })
  @IsOptional()
  user_groups?: string[];

  @IsString()
  @IsOptional()
  @IsEnum(UserStatus, enumValidationOptions('status', UserStatus))
  status?: UserStatus;

  @IsBoolean()
  @IsOptional()
  is_registered?: boolean;

  @IsNumber()
  @IsOptional()
  failed_login_attempts_count?: number;

  @IsBoolean()
  @IsOptional()
  access_api_docs?: boolean;
}

export type UpdateUserDTO = Partial<CreateUserDTO>;

export class UpdateStatusDTO {
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserStatus, enumValidationOptions('status', UserStatus))
  status: UserStatus;
}

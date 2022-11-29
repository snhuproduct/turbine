import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  type?: number;

  @IsString()
  description: string | null;

  @IsOptional()
  members: string[];

  @IsOptional()
  permissions: string[];
}

export class PatchGroupDto extends PartialType(CreateGroupDto) {}

export class IAddUserToGroupDto {
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

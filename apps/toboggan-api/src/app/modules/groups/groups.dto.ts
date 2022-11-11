import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  type?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string | null;
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

import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string | null;

  @IsOptional()
  members: string[];

  @IsOptional()
  permissions: string[];
}

export class PatchGroupDto extends PartialType(CreateGroupDto) {}


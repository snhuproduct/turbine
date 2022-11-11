import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";
import { IGroup } from "@toboggan-ws/toboggan-common";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string | null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string | null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email: string | null;

  @IsArray()
  @IsOptional()
  groups?: IGroup[];

  @IsBoolean()
  enabled: boolean;
}

export class PatchUserDto extends PartialType(CreateUserDto) {}

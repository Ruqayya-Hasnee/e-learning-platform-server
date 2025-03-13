import {
  IsEmail,
  IsEnum,
  IsString,
  IsArray,
  IsOptional,
  MinLength,
} from 'class-validator';
import { RoleTypeEnum } from 'src/types/common';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];

  @IsOptional()
  @IsEnum(RoleTypeEnum)
  role?: RoleTypeEnum;
}

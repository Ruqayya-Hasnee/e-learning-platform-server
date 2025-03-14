import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { RoleTypeEnum } from 'src/types/common';

export class SignupDto {
  @IsOptional()
  @IsEnum(RoleTypeEnum)
  role: RoleTypeEnum;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  introduction: string;

  @IsOptional()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  achievements: string[];
}

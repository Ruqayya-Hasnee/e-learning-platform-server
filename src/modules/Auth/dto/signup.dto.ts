import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  IsEnum,
} from 'class-validator';
import { RoleTypeEnum } from 'src/types/common';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
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

  @IsNotEmpty()
  @IsString()
  introduction: string;

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  achievements: string[];
}

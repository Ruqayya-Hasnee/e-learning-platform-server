import { IsEmail, IsEnum, IsString, IsArray, MinLength } from 'class-validator';
import { RoleTypeEnum } from 'src/types/common';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  introduction: string;

  @IsString()
  education: string;

  @IsArray()
  @IsString({ each: true })
  achievements: string[];

  @IsEnum(RoleTypeEnum)
  role: RoleTypeEnum;
}

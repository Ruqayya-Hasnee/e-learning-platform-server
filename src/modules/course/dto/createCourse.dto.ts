import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";


export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

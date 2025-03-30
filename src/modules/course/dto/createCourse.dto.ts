import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";


export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string; 
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value)) 
  @IsNumber()
  price: number;
}

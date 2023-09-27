import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  numberDoctors: number;

  @IsString()
  description: string;

  @IsString()
  image: string;
}

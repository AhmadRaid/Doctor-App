import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsArray,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsMongoId()
  categoryId: string;

  @IsString()
  medicalSpecialty: string;

  @IsArray()
  certificateImages: Express.Multer.File[];

  @IsNumber()
  @Type(() => Number)
  rating: number;

  @IsString()
  bookingPrice: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discount?: number;
}

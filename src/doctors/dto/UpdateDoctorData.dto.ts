import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

// class CertificateImage {
//   @IsString()
//   filename: string;
// }

export class UpdateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsString()
  medicalSpecialty: string;

  @IsString()
  certificateImages: Express.Multer.File[];

  @IsNumber()
  rating: number;

  @IsString()
  bookingPrice: string;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

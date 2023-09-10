import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateDoctorDto {
    @IsString()
    name: string;

    @IsString()
    categoryId: string;

    @IsString()
    medicalSpecialty: string;

    @IsString()
    certificates: string;

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

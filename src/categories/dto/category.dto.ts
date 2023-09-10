import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsNumber()
    numberDoctors: string;

    @IsString()
    description: string;

    @IsString()
    image: string;
}
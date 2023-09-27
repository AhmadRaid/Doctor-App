import {
  IsString,
  IsEnum,
  IsNumber,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';
// import { IsOptional } from 'class-validator'
enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
}

export class CreatePatientDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsEnum(MaritalStatus)
  readonly maritalStatus: MaritalStatus;

  @IsNumber()
  readonly numberOfFamilyMembers: number;

  @IsString()
  readonly chronicDiseases: string;
}

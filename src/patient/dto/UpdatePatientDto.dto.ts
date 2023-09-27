import { IsString, IsEnum, IsNumber } from 'class-validator';
// import { IsOptional } from 'class-validator'
enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
}

export class UpdatePatientDto {
  @IsString()
  readonly name: string;

  @IsEnum(MaritalStatus)
  readonly maritalStatus: MaritalStatus;

  @IsNumber()
  readonly numberOfFamilyMembers: number;

  @IsString()
  readonly chronicDiseases: string;
}

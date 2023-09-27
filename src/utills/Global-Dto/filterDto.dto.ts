import { IsInt, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsInt()
  limit: number;
}

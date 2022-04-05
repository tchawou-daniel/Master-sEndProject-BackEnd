import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  readonly search?: string;
}

import { IsString, IsOptional } from 'class-validator';

export class CreateInstrumentDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;
}

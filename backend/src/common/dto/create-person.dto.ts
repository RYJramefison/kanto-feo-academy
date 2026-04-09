import { IsEmail, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreatePersonDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsDateString()
  registration_date?: string;
}

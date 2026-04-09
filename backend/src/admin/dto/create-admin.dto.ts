import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

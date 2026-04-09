import {
  IsEmail,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  MinLength,
} from 'class-validator';
import { CourseLevel } from '../../common/enums/course-level.enum';

export class CreateStudentDto {
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
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(CourseLevel)
  current_level?: CourseLevel;

  @IsNumber()
  instrument_id!: number;

  @IsNumber()
  admin_id!: number;
}

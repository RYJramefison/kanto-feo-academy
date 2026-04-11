import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { CourseLevel } from '../../common/enums/course-level.enum';

export class RegisterDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  role!: 'admin' | 'student';

  // Student specific fields
  @IsOptional()
  @IsEnum(CourseLevel)
  current_level?: CourseLevel;

  @IsOptional()
  instrument_id?: number;

  @IsOptional()
  admin_id?: number;
}

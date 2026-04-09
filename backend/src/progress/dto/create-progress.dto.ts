import {
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { CourseLevel } from '../../common/enums/course-level.enum';

export class CreateProgressDto {
  @IsOptional()
  @IsBoolean()
  lesson_completed?: boolean;

  @IsOptional()
  @IsDateString()
  validation_date?: string;

  @IsOptional()
  @IsEnum(CourseLevel)
  achieved_level?: CourseLevel;

  @IsNumber()
  student_id!: number;

  @IsNumber()
  course_id!: number;
}

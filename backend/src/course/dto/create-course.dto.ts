import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { CourseLevel } from '../../common/enums/course-level.enum';

export class CreateCourseDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @IsString()
  @IsOptional()
  video_url?: string;

  @IsNumber()
  instrument_id!: number;

  @IsNumber()
  admin_id!: number;
}

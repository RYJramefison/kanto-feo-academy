import { IsEnum, IsNumber, MinLength, IsOptional } from 'class-validator';
import { CourseLevel } from '../../common/enums/course-level.enum';
import { CreatePersonDto } from '../../common/dto/create-person.dto';

export class CreateStudentDto extends CreatePersonDto {
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

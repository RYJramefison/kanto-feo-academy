import { IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { DayOfWeek } from '../../common/enums/day-of-week.enum';

export class CreateScheduleDto {
  @IsOptional()
  @IsEnum(DayOfWeek)
  day?: DayOfWeek;

  @IsOptional()
  @IsDateString()
  start_time?: string;

  @IsOptional()
  @IsDateString()
  end_time?: string;

  @IsNumber()
  student_id!: number;
}

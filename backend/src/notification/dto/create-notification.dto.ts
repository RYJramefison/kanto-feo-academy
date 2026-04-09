import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { NotificationType } from '../../common/enums/notification-type.enum';

export class CreateNotificationDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @IsNumber()
  student_id!: number;
}

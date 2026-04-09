import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationType } from '../common/enums/notification-type.enum';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto,
      include: {
        student: true,
      },
    });
  }

  findAll() {
    return this.prisma.notification.findMany({
      include: {
        student: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: { notification_id: id },
      include: {
        student: true,
      },
    });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { notification_id: id },
      data: updateNotificationDto,
      include: {
        student: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.notification.delete({
      where: { notification_id: id },
    });
  }

  async findByStudent(studentId: number) {
    return this.prisma.notification.findMany({
      where: { student_id: studentId },
      include: {
        student: true,
      },
    });
  }

  async findByType(type: NotificationType) {
    return this.prisma.notification.findMany({
      where: { type },
      include: {
        student: true,
      },
    });
  }
}

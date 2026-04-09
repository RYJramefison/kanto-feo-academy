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
    return this.prisma.$queryRaw`
      SELECT 
        n.notification_id,
        n.message,
        n.sent_date,
        n.type,
        n.student_id,
        json_build_object(
          'student_id', s.student_id,
          'first_name', p.first_name,
          'last_name', p.last_name,
          'email', p.email,
          'phone', p.phone,
          'registration_date', p.registration_date,
          'current_level', s.current_level,
          'instrument', json_build_object(
            'instrument_id', i.instrument_id,
            'name', i.name,
            'description', i.description
          ),
          'admin', json_build_object(
            'admin_id', a.admin_id,
            'first_name', ap.first_name,
            'last_name', ap.last_name,
            'email', ap.email,
            'phone', ap.phone,
            'registration_date', ap.registration_date
          )
        ) as student
      FROM "Notification" n
      LEFT JOIN "Student" s ON n.student_id = s.student_id
      LEFT JOIN "Person" p ON s.person_id = p.person_id
      LEFT JOIN "Instrument" i ON s.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
      LEFT JOIN "Person" ap ON a.person_id = ap.person_id
    `;
  }

  findOne(id: number) {
    return this.prisma.$queryRaw`
      SELECT 
        n.notification_id,
        n.message,
        n.sent_date,
        n.type,
        n.student_id,
        json_build_object(
          'student_id', s.student_id,
          'first_name', p.first_name,
          'last_name', p.last_name,
          'email', p.email,
          'phone', p.phone,
          'registration_date', p.registration_date,
          'current_level', s.current_level,
          'instrument', json_build_object(
            'instrument_id', i.instrument_id,
            'name', i.name,
            'description', i.description
          ),
          'admin', json_build_object(
            'admin_id', a.admin_id,
            'first_name', ap.first_name,
            'last_name', ap.last_name,
            'email', ap.email,
            'phone', ap.phone,
            'registration_date', ap.registration_date
          )
        ) as student
      FROM "Notification" n
      LEFT JOIN "Student" s ON n.student_id = s.student_id
      LEFT JOIN "Person" p ON s.person_id = p.person_id
      LEFT JOIN "Instrument" i ON s.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
      LEFT JOIN "Person" ap ON a.person_id = ap.person_id
      WHERE n.notification_id = ${id}
    `;
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

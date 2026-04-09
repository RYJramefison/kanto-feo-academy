import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { DayOfWeek } from '../common/enums/day-of-week.enum';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: createScheduleDto,
      include: {
        student: true,
      },
    });
  }

  findAll() {
    return this.prisma.schedule.findMany({
      include: {
        student: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.schedule.findUnique({
      where: { schedule_id: id },
      include: {
        student: true,
      },
    });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: { schedule_id: id },
      data: updateScheduleDto,
      include: {
        student: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.schedule.delete({
      where: { schedule_id: id },
    });
  }

  async findByStudent(studentId: number) {
    return this.prisma.schedule.findMany({
      where: { student_id: studentId },
      include: {
        student: true,
      },
    });
  }

  async findByDay(day: DayOfWeek) {
    return this.prisma.schedule.findMany({
      where: { day },
      include: {
        student: true,
      },
    });
  }
}

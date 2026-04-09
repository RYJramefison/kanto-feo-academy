import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);
    return this.prisma.student.create({
      data: {
        ...createStudentDto,
        password: hashedPassword,
      },
      include: {
        instrument: true,
        admin: true,
        enrollments: true,
        payments: true,
        schedules: true,
        progresses: true,
        notifications: true,
      },
    });
  }

  findAll() {
    return this.prisma.student.findMany({
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            course: true,
          },
        },
        payments: true,
        schedules: true,
        progresses: {
          include: {
            course: true,
          },
        },
        notifications: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { student_id: id },
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            course: true,
          },
        },
        payments: true,
        schedules: true,
        progresses: {
          include: {
            course: true,
          },
        },
        notifications: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.student.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (updateStudentDto.password) {
      updateStudentDto.password = await bcrypt.hash(
        updateStudentDto.password,
        10,
      );
    }
    return this.prisma.student.update({
      where: { student_id: id },
      data: updateStudentDto,
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            course: true,
          },
        },
        payments: true,
        schedules: true,
        progresses: {
          include: {
            course: true,
          },
        },
        notifications: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.student.delete({
      where: { student_id: id },
    });
  }
}

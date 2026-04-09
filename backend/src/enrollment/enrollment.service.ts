import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({
      data: createEnrollmentDto,
      include: {
        student: true,
        course: true,
      },
    });
  }

  findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        student: true,
        course: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.enrollment.findUnique({
      where: { enrollment_id: id },
      include: {
        student: true,
        course: true,
      },
    });
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.prisma.enrollment.update({
      where: { enrollment_id: id },
      data: updateEnrollmentDto,
      include: {
        student: true,
        course: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.enrollment.delete({
      where: { enrollment_id: id },
    });
  }

  async findByStudent(studentId: number) {
    return this.prisma.enrollment.findMany({
      where: { student_id: studentId },
      include: {
        student: true,
        course: true,
      },
    });
  }

  async findByCourse(courseId: number) {
    return this.prisma.enrollment.findMany({
      where: { course_id: courseId },
      include: {
        student: true,
        course: true,
      },
    });
  }

  async findEnrollment(studentId: number, courseId: number) {
    return this.prisma.enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id: studentId,
          course_id: courseId,
        },
      },
      include: {
        student: true,
        course: true,
      },
    });
  }
}

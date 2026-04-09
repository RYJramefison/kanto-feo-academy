import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(createProgressDto: CreateProgressDto) {
    return this.prisma.progress.create({
      data: createProgressDto,
      include: {
        student: true,
        course: true,
      },
    });
  }

  findAll() {
    return this.prisma.progress.findMany({
      include: {
        student: true,
        course: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.progress.findUnique({
      where: { progress_id: id },
      include: {
        student: true,
        course: true,
      },
    });
  }

  async update(id: number, updateProgressDto: UpdateProgressDto) {
    return this.prisma.progress.update({
      where: { progress_id: id },
      data: updateProgressDto,
      include: {
        student: true,
        course: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.progress.delete({
      where: { progress_id: id },
    });
  }

  async findByStudent(studentId: number) {
    return this.prisma.progress.findMany({
      where: { student_id: studentId },
      include: {
        student: true,
        course: true,
      },
    });
  }

  async findByCourse(courseId: number) {
    return this.prisma.progress.findMany({
      where: { course_id: courseId },
      include: {
        student: true,
        course: true,
      },
    });
  }

  async findByStudentAndCourse(studentId: number, courseId: number) {
    return this.prisma.progress.findMany({
      where: {
        student_id: studentId,
        course_id: courseId,
      },
      include: {
        student: true,
        course: true,
      },
    });
  }
}

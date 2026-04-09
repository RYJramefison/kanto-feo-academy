import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseLevel } from '../common/enums/course-level.enum';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: createCourseDto,
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            student: true,
          },
        },
        progresses: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.course.findMany({
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            student: true,
          },
        },
        progresses: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { course_id: id },
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            student: true,
          },
        },
        progresses: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { course_id: id },
      data: updateCourseDto,
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            student: true,
          },
        },
        progresses: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: { course_id: id },
    });
  }

  async findByLevel(level: CourseLevel) {
    return this.prisma.course.findMany({
      where: { level },
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            student: true,
          },
        },
        progresses: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  async findByInstrument(instrumentId: number) {
    return this.prisma.course.findMany({
      where: { instrument_id: instrumentId },
      include: {
        instrument: true,
        admin: true,
        enrollments: {
          include: {
            student: true,
          },
        },
        progresses: {
          include: {
            student: true,
          },
        },
      },
    });
  }
}

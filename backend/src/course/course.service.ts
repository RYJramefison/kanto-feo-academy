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
    return this.prisma.$queryRaw`
      SELECT 
        c.course_id,
        c.title,
        c.description,
        c.level,
        c.video_url,
        c.publication_date,
        c.instrument_id,
        c.admin_id,
        json_build_object(
          'instrument_id', i.instrument_id,
          'name', i.name,
          'description', i.description
        ) as instrument,
        json_build_object(
          'admin_id', a.admin_id,
          'first_name', ap.first_name,
          'last_name', ap.last_name,
          'email', ap.email,
          'phone', ap.phone,
          'registration_date', ap.registration_date
        ) as admin,
        json_agg(
          json_build_object(
            'enrollment_id', e.enrollment_id,
            'enrollment_date', e.enrollment_date,
            'student_id', e.student_id,
            'course_id', e.course_id,
            'student', json_build_object(
              'student_id', s.student_id,
              'first_name', sp.first_name,
              'last_name', sp.last_name,
              'email', sp.email,
              'phone', sp.phone,
              'registration_date', sp.registration_date,
              'current_level', s.current_level,
              'admin', json_build_object(
                'admin_id', sa.admin_id,
                'first_name', sap.first_name,
                'last_name', sap.last_name,
                'email', sap.email,
                'phone', sap.phone,
                'registration_date', sap.registration_date
              )
            )
          )
        ) FILTER (WHERE e.enrollment_id IS NOT NULL) as enrollments,
        json_agg(
          json_build_object(
            'progress_id', pr.progress_id,
            'lesson_completed', pr.lesson_completed,
            'validation_date', pr.validation_date,
            'achieved_level', pr.achieved_level,
            'student_id', pr.student_id,
            'course_id', pr.course_id,
            'student', json_build_object(
              'student_id', s2.student_id,
              'first_name', sp2.first_name,
              'last_name', sp2.last_name,
              'email', sp2.email,
              'phone', sp2.phone,
              'registration_date', sp2.registration_date,
              'current_level', s2.current_level,
              'admin', json_build_object(
                'admin_id', sa2.admin_id,
                'first_name', sap2.first_name,
                'last_name', sap2.last_name,
                'email', sap2.email,
                'phone', sap2.phone,
                'registration_date', sap2.registration_date
              )
            )
          )
        ) FILTER (WHERE pr.progress_id IS NOT NULL) as progresses
      FROM "Course" c
      LEFT JOIN "Instrument" i ON c.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON c.admin_id = a.admin_id
      LEFT JOIN "Person" ap ON a.person_id = ap.person_id
      LEFT JOIN "Enrollment" e ON c.course_id = e.course_id
      LEFT JOIN "Student" s ON e.student_id = s.student_id
      LEFT JOIN "Person" sp ON s.person_id = sp.person_id
      LEFT JOIN "Admin" sa ON s.admin_id = sa.admin_id
      LEFT JOIN "Person" sap ON sa.person_id = sap.person_id
      LEFT JOIN "Progress" pr ON c.course_id = pr.course_id
      LEFT JOIN "Student" s2 ON pr.student_id = s2.student_id
      LEFT JOIN "Person" sp2 ON s2.person_id = sp2.person_id
      LEFT JOIN "Admin" sa2 ON s2.admin_id = sa2.admin_id
      LEFT JOIN "Person" sap2 ON sa2.person_id = sap2.person_id
      GROUP BY c.course_id, c.title, c.description, c.level, c.video_url, c.publication_date, c.instrument_id, c.admin_id,
               i.instrument_id, i.name, i.description,
               a.admin_id, ap.first_name, ap.last_name, ap.email, ap.phone, ap.registration_date
    `;
  }

  findOne(id: number) {
    return this.prisma.$queryRaw`
      SELECT 
        c.course_id,
        c.title,
        c.description,
        c.level,
        c.video_url,
        c.publication_date,
        c.instrument_id,
        c.admin_id,
        json_build_object(
          'instrument_id', i.instrument_id,
          'name', i.name,
          'description', i.description
        ) as instrument,
        json_build_object(
          'admin_id', a.admin_id,
          'first_name', ap.first_name,
          'last_name', ap.last_name,
          'email', ap.email,
          'phone', ap.phone,
          'registration_date', ap.registration_date
        ) as admin,
        json_agg(
          json_build_object(
            'enrollment_id', e.enrollment_id,
            'enrollment_date', e.enrollment_date,
            'student_id', e.student_id,
            'course_id', e.course_id,
            'student', json_build_object(
              'student_id', s.student_id,
              'first_name', sp.first_name,
              'last_name', sp.last_name,
              'email', sp.email,
              'phone', sp.phone,
              'registration_date', sp.registration_date,
              'current_level', s.current_level,
              'admin', json_build_object(
                'admin_id', sa.admin_id,
                'first_name', sap.first_name,
                'last_name', sap.last_name,
                'email', sap.email,
                'phone', sap.phone,
                'registration_date', sap.registration_date
              )
            )
          )
        ) FILTER (WHERE e.enrollment_id IS NOT NULL) as enrollments,
        json_agg(
          json_build_object(
            'progress_id', pr.progress_id,
            'lesson_completed', pr.lesson_completed,
            'validation_date', pr.validation_date,
            'achieved_level', pr.achieved_level,
            'student_id', pr.student_id,
            'course_id', pr.course_id,
            'student', json_build_object(
              'student_id', s2.student_id,
              'first_name', sp2.first_name,
              'last_name', sp2.last_name,
              'email', sp2.email,
              'phone', sp2.phone,
              'registration_date', sp2.registration_date,
              'current_level', s2.current_level,
              'admin', json_build_object(
                'admin_id', sa2.admin_id,
                'first_name', sap2.first_name,
                'last_name', sap2.last_name,
                'email', sap2.email,
                'phone', sap2.phone,
                'registration_date', sap2.registration_date
              )
            )
          )
        ) FILTER (WHERE pr.progress_id IS NOT NULL) as progresses
      FROM "Course" c
      LEFT JOIN "Instrument" i ON c.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON c.admin_id = a.admin_id
      LEFT JOIN "Person" ap ON a.person_id = ap.person_id
      LEFT JOIN "Enrollment" e ON c.course_id = e.course_id
      LEFT JOIN "Student" s ON e.student_id = s.student_id
      LEFT JOIN "Person" sp ON s.person_id = sp.person_id
      LEFT JOIN "Admin" sa ON s.admin_id = sa.admin_id
      LEFT JOIN "Person" sap ON sa.person_id = sap.person_id
      LEFT JOIN "Progress" pr ON c.course_id = pr.course_id
      LEFT JOIN "Student" s2 ON pr.student_id = s2.student_id
      LEFT JOIN "Person" sp2 ON s2.person_id = sp2.person_id
      LEFT JOIN "Admin" sa2 ON s2.admin_id = sa2.admin_id
      LEFT JOIN "Person" sap2 ON sa2.person_id = sap2.person_id
      WHERE c.course_id = ${id}
      GROUP BY c.course_id, c.title, c.description, c.level, c.video_url, c.publication_date, c.instrument_id, c.admin_id,
               i.instrument_id, i.name, i.description,
               a.admin_id, ap.first_name, ap.last_name, ap.email, ap.phone, ap.registration_date
    `;
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

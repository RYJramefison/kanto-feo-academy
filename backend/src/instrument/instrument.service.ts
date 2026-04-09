import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';

@Injectable()
export class InstrumentService {
  constructor(private prisma: PrismaService) {}

  async create(createInstrumentDto: CreateInstrumentDto) {
    return this.prisma.instrument.create({
      data: createInstrumentDto,
      include: {
        students: true,
        courses: true,
      },
    });
  }

  async findAll() {
    return this.prisma.$queryRaw`
      SELECT 
        i.instrument_id,
        i.name,
        i.description,
        json_agg(
          json_build_object(
            'student_id', s.student_id,
            'first_name', sp.first_name,
            'last_name', sp.last_name,
            'email', sp.email,
            'phone', sp.phone,
            'registration_date', sp.registration_date,
            'current_level', s.current_level,
            'admin', json_build_object(
              'admin_id', a.admin_id,
              'first_name', ap.first_name,
              'last_name', ap.last_name,
              'email', ap.email,
              'phone', ap.phone,
              'registration_date', ap.registration_date
            )
          )
        ) FILTER (WHERE s.student_id IS NOT NULL) as students,
        json_agg(
          json_build_object(
            'course_id', c.course_id,
            'title', c.title,
            'description', c.description,
            'level', c.level,
            'video_url', c.video_url,
            'publication_date', c.publication_date,
            'admin', json_build_object(
              'admin_id', ca.admin_id,
              'first_name', cap.first_name,
              'last_name', cap.last_name,
              'email', cap.email,
              'phone', cap.phone,
              'registration_date', cap.registration_date
            )
          )
        ) FILTER (WHERE c.course_id IS NOT NULL) as courses
      FROM "Instrument" i
      LEFT JOIN "Student" s ON i.instrument_id = s.instrument_id
      LEFT JOIN "Person" sp ON s.person_id = sp.person_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
      LEFT JOIN "Person" ap ON a.person_id = ap.person_id
      LEFT JOIN "Course" c ON i.instrument_id = c.instrument_id
      LEFT JOIN "Admin" ca ON c.admin_id = ca.admin_id
      LEFT JOIN "Person" cap ON ca.person_id = cap.person_id
      GROUP BY i.instrument_id, i.name, i.description
    `;
  }

  async findOne(id: number) {
    return this.prisma.$queryRaw`
      SELECT 
        i.instrument_id,
        i.name,
        i.description,
        json_agg(
          json_build_object(
            'student_id', s.student_id,
            'first_name', sp.first_name,
            'last_name', sp.last_name,
            'email', sp.email,
            'phone', sp.phone,
            'registration_date', sp.registration_date,
            'current_level', s.current_level,
            'admin', json_build_object(
              'admin_id', a.admin_id,
              'first_name', ap.first_name,
              'last_name', ap.last_name,
              'email', ap.email,
              'phone', ap.phone,
              'registration_date', ap.registration_date
            )
          )
        ) FILTER (WHERE s.student_id IS NOT NULL) as students,
        json_agg(
          json_build_object(
            'course_id', c.course_id,
            'title', c.title,
            'description', c.description,
            'level', c.level,
            'video_url', c.video_url,
            'publication_date', c.publication_date,
            'admin', json_build_object(
              'admin_id', ca.admin_id,
              'first_name', cap.first_name,
              'last_name', cap.last_name,
              'email', cap.email,
              'phone', cap.phone,
              'registration_date', cap.registration_date
            )
          )
        ) FILTER (WHERE c.course_id IS NOT NULL) as courses
      FROM "Instrument" i
      LEFT JOIN "Student" s ON i.instrument_id = s.instrument_id
      LEFT JOIN "Person" sp ON s.person_id = sp.person_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
      LEFT JOIN "Person" ap ON a.person_id = ap.person_id
      LEFT JOIN "Course" c ON i.instrument_id = c.instrument_id
      LEFT JOIN "Admin" ca ON c.admin_id = ca.admin_id
      LEFT JOIN "Person" cap ON ca.person_id = cap.person_id
      WHERE i.instrument_id = ${id}
      GROUP BY i.instrument_id, i.name, i.description
    `;
  }

  async update(id: number, updateInstrumentDto: UpdateInstrumentDto) {
    return this.prisma.instrument.update({
      where: { instrument_id: id },
      data: updateInstrumentDto,
      include: {
        students: true,
        courses: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.instrument.delete({
      where: { instrument_id: id },
    });
  }
}

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

    // Create Person first
    const person = await this.prisma.$queryRaw`
      INSERT INTO "Person" (first_name, last_name, email, phone, password, registration_date)
      VALUES (${createStudentDto.first_name}, ${createStudentDto.last_name}, ${createStudentDto.email}, 
              ${createStudentDto.phone}, ${hashedPassword}, NOW())
      RETURNING person_id
    `;

    // Type assertion to resolve TypeScript error
    const personArray = person as Array<{ person_id: number }>;
    const personId = personArray[0].person_id;

    // Then create Student linked to Person
    await this.prisma.$executeRaw`
      INSERT INTO "Student" (person_id, current_level, instrument_id, admin_id)
      VALUES (${personId}, ${createStudentDto.current_level}::"CourseLevel", 
              ${createStudentDto.instrument_id}, ${createStudentDto.admin_id})
    `;

    // Return the created student with person data
    return this.prisma.$queryRaw`
      SELECT 
        s.student_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date,
        s.current_level,
        i.name as instrument_name,
        a.admin_id
      FROM "Student" s
      JOIN "Person" p ON s.person_id = p.person_id
      LEFT JOIN "Instrument" i ON s.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
      WHERE s.student_id = (SELECT student_id FROM "Student" WHERE person_id = ${personId})
    `;
  }

  findAll() {
    return this.prisma.$queryRaw`
      SELECT 
        s.student_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date,
        s.current_level,
        i.name as instrument_name,
        a.admin_id
      FROM "Student" s
      JOIN "Person" p ON s.person_id = p.person_id
      LEFT JOIN "Instrument" i ON s.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
    `;
  }

  findOne(id: number) {
    return this.prisma.$queryRaw`
      SELECT 
        s.student_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date,
        s.current_level,
        i.name as instrument_name,
        a.admin_id
      FROM "Student" s
      JOIN "Person" p ON s.person_id = p.person_id
      LEFT JOIN "Instrument" i ON s.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
      WHERE s.student_id = ${id}
    `;
  }

  async findByEmail(email: string) {
    return this.prisma.$queryRaw`
      SELECT 
        s.student_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date,
        s.current_level,
        i.name as instrument_name,
        a.admin_id,
        p.password
      FROM "Student" s
      JOIN "Person" p ON s.person_id = p.person_id
      LEFT JOIN "Instrument" i ON s.instrument_id = i.instrument_id
      LEFT JOIN "Admin" a ON s.admin_id = a.admin_id
      WHERE p.email = ${email}
    `;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (updateStudentDto.password) {
      const hashedPassword = await bcrypt.hash(updateStudentDto.password, 10);
      return this.prisma.$executeRaw`
        UPDATE "Person" 
        SET 
          first_name = ${updateStudentDto.first_name},
          last_name = ${updateStudentDto.last_name},
          email = ${updateStudentDto.email},
          phone = ${updateStudentDto.phone},
          password = ${hashedPassword}
        WHERE person_id = (SELECT person_id FROM "Student" WHERE student_id = ${id})
      `;
    } else {
      return this.prisma.$executeRaw`
        UPDATE "Person" 
        SET 
          first_name = ${updateStudentDto.first_name},
          last_name = ${updateStudentDto.last_name},
          email = ${updateStudentDto.email},
          phone = ${updateStudentDto.phone}
        WHERE person_id = (SELECT person_id FROM "Student" WHERE student_id = ${id})
      `;
    }
  }

  async remove(id: number) {
    return this.prisma.$executeRaw`
      DELETE FROM "Student" WHERE student_id = ${id}
    `;
  }
}

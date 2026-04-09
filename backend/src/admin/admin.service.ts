import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    // Create Person first
    const person = await this.prisma.$queryRaw`
      INSERT INTO "Person" (first_name, last_name, email, phone, password, registration_date)
      VALUES (${createAdminDto.first_name}, ${createAdminDto.last_name}, ${createAdminDto.email}, 
              ${createAdminDto.phone}, ${hashedPassword}, NOW())
      RETURNING person_id
    `;

    // Type assertion to resolve TypeScript error
    const personArray = person as Array<{ person_id: number }>;
    const personId = personArray[0].person_id;

    // Then create Admin linked to Person
    await this.prisma.$executeRaw`
      INSERT INTO "Admin" (person_id)
      VALUES (${personId})
    `;

    // Return the created admin with person data
    return this.prisma.$queryRaw`
      SELECT 
        a.admin_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date
      FROM "Admin" a
      JOIN "Person" p ON a.person_id = p.person_id
      WHERE a.admin_id = (SELECT admin_id FROM "Admin" WHERE person_id = ${personId})
    `;
  }

  async findAll() {
    return this.prisma.$queryRaw`
      SELECT 
        a.admin_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date
      FROM "Admin" a
      JOIN "Person" p ON a.person_id = p.person_id
    `;
  }

  async findOne(id: number) {
    return this.prisma.$queryRaw`
      SELECT 
        a.admin_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date
      FROM "Admin" a
      JOIN "Person" p ON a.person_id = p.person_id
      WHERE a.admin_id = ${id}
    `;
  }

  async findByEmail(email: string) {
    return this.prisma.$queryRaw`
      SELECT 
        a.admin_id,
        p.first_name,
        p.last_name,
        p.email,
        p.phone,
        p.registration_date,
        p.password
      FROM "Admin" a
      JOIN "Person" p ON a.person_id = p.person_id
      WHERE p.email = ${email}
    `;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password) {
      const hashedPassword = await bcrypt.hash(updateAdminDto.password, 10);
      return this.prisma.$executeRaw`
        UPDATE "Person" 
        SET 
          first_name = ${updateAdminDto.first_name},
          last_name = ${updateAdminDto.last_name},
          email = ${updateAdminDto.email},
          phone = ${updateAdminDto.phone},
          password = ${hashedPassword}
        WHERE person_id = (SELECT person_id FROM "Admin" WHERE admin_id = ${id})
      `;
    } else {
      return this.prisma.$executeRaw`
        UPDATE "Person" 
        SET 
          first_name = ${updateAdminDto.first_name},
          last_name = ${updateAdminDto.last_name},
          email = ${updateAdminDto.email},
          phone = ${updateAdminDto.phone}
        WHERE person_id = (SELECT person_id FROM "Admin" WHERE admin_id = ${id})
      `;
    }
  }

  async remove(id: number) {
    return this.prisma.$executeRaw`
      DELETE FROM "Admin" WHERE admin_id = ${id}
    `;
  }
}

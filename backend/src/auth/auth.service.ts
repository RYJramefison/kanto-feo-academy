import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    role: 'admin' | 'student',
  ) {
    let user: any;

    if (role === 'admin') {
      const result = await this.prisma.$queryRaw`
        SELECT a.admin_id, p.first_name, p.last_name, p.email, p.password
        FROM "Admin" a
        JOIN "Person" p ON a.person_id = p.person_id
        WHERE p.email = ${email}
      `;
      user = (result as any[])[0];
    } else {
      const result = await this.prisma.$queryRaw`
        SELECT s.student_id, p.first_name, p.last_name, p.email, p.password
        FROM "Student" s
        JOIN "Person" p ON s.person_id = p.person_id
        WHERE p.email = ${email}
      `;
      user = (result as any[])[0];
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(
      loginDto.email,
      loginDto.password,
      loginDto.role,
    );

    const payload = {
      sub: loginDto.role === 'admin' ? user.admin_id : user.student_id,
      email: user.email,
      role: loginDto.role,
      firstName: user.first_name,
      lastName: user.last_name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: loginDto.role === 'admin' ? user.admin_id : user.student_id,
        email: user.email,
        role: loginDto.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    if (registerDto.role === 'admin') {
      // Create Person first
      const person = await this.prisma.$queryRaw`
        INSERT INTO "Person" (first_name, last_name, email, phone, password, registration_date)
        VALUES (${registerDto.first_name}, ${registerDto.last_name}, ${registerDto.email}, 
                ${registerDto.phone}, ${hashedPassword}, NOW())
        RETURNING person_id
      `;

      const personArray = person as Array<{ person_id: number }>;
      const personId = personArray[0].person_id;

      // Then create Admin
      await this.prisma.$executeRaw`
        INSERT INTO "Admin" (person_id)
        VALUES (${personId})
      `;

      const result = await this.prisma.$queryRaw`
        SELECT a.admin_id, p.first_name, p.last_name, p.email, p.registration_date
        FROM "Admin" a
        JOIN "Person" p ON a.person_id = p.person_id
        WHERE a.admin_id = (SELECT admin_id FROM "Admin" WHERE person_id = ${personId})
      `;
      return (result as any[])[0];
    } else {
      // Student registration
      if (!registerDto.instrument_id || !registerDto.admin_id) {
        throw new UnauthorizedException(
          'Instrument ID and Admin ID are required for student registration',
        );
      }

      // Validate CourseLevel enum
      const validLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
      if (
        registerDto.current_level &&
        !validLevels.includes(registerDto.current_level)
      ) {
        throw new UnauthorizedException(
          `Invalid current_level. Valid values are: ${validLevels.join(', ')}`,
        );
      }

      const person = await this.prisma.$queryRaw`
        INSERT INTO "Person" (first_name, last_name, email, phone, password, registration_date)
        VALUES (${registerDto.first_name}, ${registerDto.last_name}, ${registerDto.email}, 
                ${registerDto.phone}, ${hashedPassword}, NOW())
        RETURNING person_id
      `;

      const personArray = person as Array<{ person_id: number }>;
      const personId = personArray[0].person_id;

      await this.prisma.$executeRaw`
        INSERT INTO "Student" (person_id, current_level, instrument_id, admin_id)
        VALUES (${personId}, ${registerDto.current_level}::"CourseLevel", 
                ${registerDto.instrument_id}, ${registerDto.admin_id})
      `;

      const result = await this.prisma.$queryRaw`
        SELECT s.student_id, p.first_name, p.last_name, p.email, p.registration_date, s.current_level
        FROM "Student" s
        JOIN "Person" p ON s.person_id = p.person_id
        WHERE s.student_id = (SELECT student_id FROM "Student" WHERE person_id = ${personId})
      `;
      return (result as any[])[0];
    }
  }
}

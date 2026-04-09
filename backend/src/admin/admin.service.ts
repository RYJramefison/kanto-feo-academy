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
    return this.prisma.admin.create({
      data: {
        ...createAdminDto,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.admin.findMany({
      include: {
        students: true,
        courses: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.admin.findUnique({
      where: { admin_id: id },
      include: {
        students: true,
        courses: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.admin.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }
    return this.prisma.admin.update({
      where: { admin_id: id },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    return this.prisma.admin.delete({
      where: { admin_id: id },
    });
  }
}

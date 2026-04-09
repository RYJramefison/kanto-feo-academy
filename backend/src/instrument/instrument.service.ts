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
    return this.prisma.instrument.findMany({
      include: {
        students: true,
        courses: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.instrument.findUnique({
      where: { instrument_id: id },
      include: {
        students: true,
        courses: true,
      },
    });
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentStatus } from '../common/enums/payment-status.enum';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: createPaymentDto,
      include: {
        student: true,
      },
    });
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        student: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({
      where: { payment_id: id },
      include: {
        student: true,
      },
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { payment_id: id },
      data: updatePaymentDto,
      include: {
        student: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.payment.delete({
      where: { payment_id: id },
    });
  }

  async findByStudent(studentId: number) {
    return this.prisma.payment.findMany({
      where: { student_id: studentId },
      include: {
        student: true,
      },
    });
  }

  async findByStatus(status: PaymentStatus) {
    return this.prisma.payment.findMany({
      where: { status },
      include: {
        student: true,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { NotificationGateway } from './notification/notification.gateway';
import { MailModule } from './mail/mail.module';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { InstrumentModule } from './instrument/instrument.module';
import { CourseModule } from './course/course.module';
import { PaymentModule } from './payment/payment.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ProgressModule } from './progress/progress.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MailModule,
    StudentModule,
    AdminModule,
    InstrumentModule,
    CourseModule,
    PaymentModule,
    EnrollmentModule,
    ScheduleModule,
    ProgressModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationGateway],
})
export class AppModule {}

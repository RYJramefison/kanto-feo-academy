import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { NotificationGateway } from './notification/notification.gateway';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PrismaModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService, NotificationGateway],
})
export class AppModule {}

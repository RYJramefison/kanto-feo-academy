import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    await this.mailService.sendMail(
      user.email,
      'Welcome',
      `Hello ${user.email}, your account is created`,
    );
  }
}

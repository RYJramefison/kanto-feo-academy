import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(user: {
    email: string;
    id: number;
  }): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }

  async register({ email }: { email: string }) {
    await this.mailService.sendEmail(
      email,
      'Welcome',
      `Hello ${email}, your account is created`,
    );
  }
}

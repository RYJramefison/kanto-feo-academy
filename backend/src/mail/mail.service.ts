import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your@email.com',
        pass: 'yourpassword',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    return this.transporter.sendMail({
      from: 'your@email.com',
      to,
      subject,
      text,
    });
  }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  sendEmail(
    toAddress: string,
    subject: string,
    messageText: string,
  ): Promise<nodemailer.SentMessageInfo> {
    const mailOptions = {
      from: process.env.MAIL_ADDRESS,
      to: toAddress,
      subject,
      text: messageText,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.transporter.sendMail(mailOptions);
  }
}

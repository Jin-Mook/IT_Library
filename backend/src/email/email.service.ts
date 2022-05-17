import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMemberJoinVerification(emailAddress: string, verifyCode: string) {
    const mailOptions: EmailOptions = {
      from: process.env.MAIL_EMAIL,
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        <h1>아래 인증코드를 이용해 이메일 인증을 진행해 주세요</h1>
        <h2>인증코드</h2>
        <h2>${verifyCode}</h2>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

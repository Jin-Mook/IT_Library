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

  async sendMemberJoinVerification(emailAddress: string, verifyNumber: number) {
    const baseUrl = 'http://localhost:8000';

    const url = `${baseUrl}/api/auth/email?verifyNumber=${verifyNumber}`;

    const mailOptions: EmailOptions = {
      from: process.env.MAIL_EMAIL,
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입 확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

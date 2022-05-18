import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/common.dto';
import { AuthRepository } from './repository/auth.repository';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService,
  ) {}

  // 닉네임 체크 함수
  async checkNickname(nickname: string): Promise<ResponseDto> {
    const exNicknameId = await this.authRepository.checkNickname(nickname);

    if (exNicknameId)
      throw new NotAcceptableException('이미 존재하는 닉네임 입니다.');

    return { success: true, message: '사용 가능한 닉네임 입니다.' };
  }

  // 이메일 체크 및 인증코드 전송 함수
  async checkEmail(email: string) {
    const exEmailId = await this.authRepository.checkEmail(email);

    if (exEmailId)
      throw new NotAcceptableException('이미 존재하는 이메일 입니다.');

    const verifyCode = this.makeVerifyCode();
    await this.emailService.sendMemberJoinVerification(email, verifyCode);
    return {
      success: true,
      message: '인증코드 전송 완료',
      code: verifyCode,
    };
  }

  // 회원가입 함수
  async registerUser(
    nickname: string,
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    message: string;
    userInfo: { id: number; nickname: string };
  }> {
    await this.checkNickname(nickname);

    const saltOrRounds = +process.env.HASH;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    await this.authRepository.registerUser(nickname, email, hashedPassword);
    const exUser = await this.authRepository.findUser(email);

    return {
      success: true,
      message: '회원가입 완료.',
      userInfo: {
        id: exUser.id,
        nickname: exUser.nickname,
      },
    };
  }

  // 세션에 유저 정보를 저장하는 함수
  inputUserInfoToSession(id: number, nickname: string, session) {
    session.userId = id;
    session.nickName = nickname;

    return {
      success: true,
      message: '로그인 완료',
      userInfo: {
        id,
        nickname,
      },
    };
  }

  // 인증코드 만들어주는 함수
  private makeVerifyCode() {
    return Math.random().toString(36).substring(2, 8);
  }

  // 쿠키를 전달하는 함수
  makeCookie(res: Response, id: number) {
    res.cookie('key', id, {
      signed: false,
      httpOnly: true,
      secure: false,
    });
  }
}

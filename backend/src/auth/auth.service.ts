import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/common.dto';
import { AuthRepository } from './repository/auth.repository';
import * as bcrpyt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

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
  ): Promise<ResponseDto> {
    await this.checkNickname(nickname);

    const saltOrRounds = +process.env.HASH;
    const hashedPassword = await bcrpyt.hash(password, saltOrRounds);
    await this.authRepository.registerUser(nickname, email, hashedPassword);

    return {
      success: true,
      message: '회원가입 완료.',
    };
  }

  // 로그인 인증 함수
  async validateUser(email: string, password: string) {
    const user = await this.authRepository.findUser(email);
    if (user) {
      const passwordCheck = await bcrpyt.compare(password, user.password);
      if (passwordCheck) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }
    throw new UnauthorizedException('존재하지 않는 유저입니다.');
  }

  // 인증코드 만들어주는 함수
  private makeVerifyCode() {
    return Math.random().toString(36).substring(2, 8);
  }
}

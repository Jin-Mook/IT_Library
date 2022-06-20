import { LocalAuthGuard } from './guard/local-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 닉네임 또는 이메일 중복 확인 및 이메일 인증코드 발송
  @Get('check')
  async checkNickname(@Query() query: { nickname?: string; email?: string }) {
    if (query.nickname) return this.authService.checkNickname(query.nickname);
    else return this.authService.checkEmail(query.email);
  }

  // 회원가입
  @Post('register')
  async registerUser(
    @Body() registerBody: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { nickname, email, password } = registerBody;
    const result = await this.authService.registerUser(
      nickname,
      email,
      password,
    );
    const { id, ...rest } = result.userInfo;
    this.authService.makeCookie(res, id);

    return result;
  }

  // 로그인
  @UseGuards(LocalAuthGuard) // 가드를 통해 req.user에 passport의 return값을 넣어준다.
  @Post('login')
  async login(
    @Req() req,
    @Session() session: Record<string | number, any>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, nickname, ...rest } = req.user;
    const result = this.authService.inputUserInfoToSession(
      id,
      nickname,
      session,
    );
    this.authService.makeCookie(res, id);
    return result;
  }

  // 로그아웃
  @Get('logout')
  async logout(
    @Session() session: Record<string | number, any>,
    @Res({ passthrough: true }) res,
    @Req() req: Request,
  ) {
    console.log(session);
    // 쿠키를 지우는 로직
    this.authService.removeCookie(res, 'key');
    this.authService.removeCookie(res, 'connect.sid');
    console.log(req.cookies);
    // 세션을 지우는 로직
    await this.authService.removeSession(req);

    return { success: true, message: '로그아웃 완료' };
  }
}

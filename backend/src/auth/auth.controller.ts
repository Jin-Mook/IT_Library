import { LocalAuthGuard } from './guard/local-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

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
  async registerUser(@Body() registerBody: RegisterDto) {
    const { nickname, email, password } = registerBody;
    return this.authService.registerUser(nickname, email, password);
  }

  // 로그인
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    console.log(req.sessionID);
    console.log('session: ', req.session);
    return req.user;
  }
}

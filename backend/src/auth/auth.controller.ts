import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 닉네임 중복 확인
  @Get('check')
  async checkNickname(@Query('nickname') nickname: string) {
    return this.authService.checkNickname(nickname);
  }

  // 회원가입
  @Post('register')
  async registerUser(@Body() registerBody: RegisterDto) {
    const { nickname, email, password } = registerBody;
    return this.authService.registerUser(nickname, email, password);
  }
}

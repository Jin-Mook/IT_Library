import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthRepository } from '../repository/auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authRepository.findUser(email);
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }
    throw new UnauthorizedException('존재하지 않는 유저입니다.');
  }
}

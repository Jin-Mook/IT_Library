import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersModel: Repository<UsersEntity>,
  ) {}

  async checkNickname(nickname: string) {
    const exNicknameId = await this.usersModel
      .createQueryBuilder('user')
      .select('user.id')
      .where(`user.nickname = '${nickname}'`)
      .getOne();

    return exNicknameId;
  }

  async checkEmail(email: string) {
    const exEmailId = await this.usersModel
      .createQueryBuilder('user')
      .select('user.id')
      .where(`user.email = '${email}'`)
      .getOne();

    return exEmailId;
  }

  async registerUser(nickname, email, hashedPassword) {
    await this.usersModel
      .createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({ nickname, email, password: hashedPassword, email_check: true })
      .execute();
  }
}

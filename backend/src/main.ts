import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    session({
      secret: 'my-secret',
      resave: false, // 요청이 올때 세션에 수정이 없어도 다시 저장할지 설정
      saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 생성할지 설정
      cookie: {
        httpOnly: true,
        secure: false, // https 프로토콜에서 사용 가능하도록 설정
      },
    }),
  );
  await app.listen(8000);
}
bootstrap();

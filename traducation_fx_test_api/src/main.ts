import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 4000;

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://10.5.0.2:3000',
      'http://192.168.50.110:3000',
      'http://172.23.128.1:3000',
    ],
  });

  await app.listen(port);

  Logger.log(
    `🚀 Server running on http://localhost:${port}`,
    'NestApplication',
  );
}

void bootstrap();

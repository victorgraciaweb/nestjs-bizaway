import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');
  const corsEnabled = configService.get<boolean>('CORS_ENABLED');
  const port = configService.get<number>('PORT');

  app.setGlobalPrefix(globalPrefix);
  
  if (corsEnabled) {
    app.enableCors();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  await app.listen(port);
}
bootstrap();

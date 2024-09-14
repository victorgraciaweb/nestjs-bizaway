import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // App
  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');
  const corsEnabled = configService.get<boolean>('CORS_ENABLED');
  const port = configService.get<number>('PORT');

  // Swagger
  const titleSwagger = configService.get<string>('TITLE_SWAGGER');
  const descriptionSwagger = configService.get<string>('DESCRIPTION_SWAGGER');
  const versionSwagger = configService.get<string>('VERSION_SWAGGER');
  const tagSwagger = configService.get<string>('TAG_SWAGGER');

  app.setGlobalPrefix(globalPrefix);
  
  if (corsEnabled) {
    app.enableCors();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  )

  const config = new DocumentBuilder()
    .setTitle(titleSwagger)
    .setDescription(descriptionSwagger)
    .setVersion(versionSwagger)
    .addTag(tagSwagger)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(port);
}
bootstrap();

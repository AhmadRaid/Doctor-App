import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor } from './utills/api-response-interceptor/api-response-interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Apply the response interceptor globally
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  app.useStaticAssets(path.join(__dirname, '../uploads'));

  await app.listen(3000);
}
bootstrap();

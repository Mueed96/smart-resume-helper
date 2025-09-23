import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add this line to allow requests from your frontend
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
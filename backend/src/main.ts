import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/custom-logger.service';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(CustomLogger);
  app.useLogger(logger);
  
  const uploadDir = join(process.cwd(), 'uploads');
  console.log('Serving static files from:', uploadDir);
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Food Delivery API')
    .setDescription('API for Food Delivery application — shops, products, orders, coupons')
    .setVersion('1.0')
    .addTag('shops')
    .addTag('products')
    .addTag('orders')
    .addTag('coupons')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📄 Swagger docs: http://localhost:3000/api/docs');
}
bootstrap();

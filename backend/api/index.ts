import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const server = express();
const prisma = new PrismaClient();

let cachedHandler: any;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
  return server;
}

export default async (req: any, res: any) => {
  console.log('Request URL:', req.url);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

  // Simple health check to avoid cold start issues and verify DB
  if (req.url === '/api/health' || req.url === '/health') {
    try {
      await prisma.$connect();
      await prisma.shop.findFirst({ select: { id: true } });
      return res.status(200).json({ status: 'ok', database: 'connected' });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req, res);
};

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import path from 'path';

const server = express();
let prisma: PrismaClient;

// Ensure Prisma client is generated
try {
  prisma = new PrismaClient();
} catch (e) {
  console.log('Generating Prisma client...');
  execSync('npx prisma generate --schema=./prisma/schema.prisma');
  prisma = new PrismaClient();
}

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
  
  // Health check
  if (req.url === '/api/health' || req.url === '/health') {
    try {
      await prisma.$connect();
      const shopCount = await prisma.shop.count();
      return res.status(200).json({ status: 'ok', database: 'connected', shops: shopCount });
    } catch (err) {
      console.error('Health check error:', err);
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req, res);
};

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule, 
    ShopsModule, 
    ProductsModule, 
    OrdersModule, 
    CouponsModule, 
    EventsModule, 
    UsersModule, 
    LoggerModule, 
    AuthModule
  ],
  controllers: [HealthController],
})
export class AppModule {}

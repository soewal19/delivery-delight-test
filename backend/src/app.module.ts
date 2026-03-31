import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PrismaModule, ShopsModule, ProductsModule, OrdersModule, CouponsModule, EventsModule, UsersModule, LoggerModule],
})
export class AppModule {}

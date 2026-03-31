import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class EventsModule {}

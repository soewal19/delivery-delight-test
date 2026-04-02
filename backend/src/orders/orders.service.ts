import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AppGateway } from '../events/app.gateway';
import { CustomLogger } from '../logger/custom-logger.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: AppGateway,
    private logger: CustomLogger,
  ) {}

  async create(dto: CreateOrderDto) {
    this.logger.log(`Creating order for email: ${dto.email}`);
    const order = await this.prisma.order.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        total: dto.total,
        userId: dto.userId,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Simulate real-time order processing
    this.simulateOrderProcessing(order.id);

    return order;
  }

  private simulateOrderProcessing(orderId: string) {
    const statuses = ['confirmed', 'cooking', 'on_the_way', 'delivered'];
    let delay = 5000;

    statuses.forEach((status, index) => {
      setTimeout(async () => {
        await this.prisma.order.update({
          where: { id: orderId },
          data: { status },
        });
        this.eventsGateway.server.emit('order_update', { orderId, status });
      }, delay * (index + 1));
    });
  }

  findByContact(email?: string, phone?: string, orderId?: string) {
    const where: any = {};
    
    // Require at least one filter
    if (!email && !phone && !orderId) return [];

    if (orderId) {
      where.id = orderId;
    }
    
    if (email) {
      where.email = { equals: email, mode: 'insensitive' };
    }
    
    if (phone) {
      where.phone = { equals: phone };
    }

    return this.prisma.order.findMany({
      where,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
  }
}

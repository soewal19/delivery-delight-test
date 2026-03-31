import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    });
  }

  async upsert(data: { email: string; name?: string; avatar?: string }) {
    return this.prisma.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        avatar: data.avatar,
      },
      create: {
        email: data.email,
        name: data.name,
        avatar: data.avatar,
      },
    });
  }

  async getStats(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        total: true,
        createdAt: true,
      },
    });

    // Group by month for the chart
    const monthlyStats = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!acc[key]) {
        acc[key] = { name: key, total: 0, count: 0 };
      }
      acc[key].total += order.total;
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { name: string; total: number; count: number }>);

    return {
      history: Object.values(monthlyStats),
      summary: {
        totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
        orderCount: orders.length,
        avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0,
      },
    };
  }
}

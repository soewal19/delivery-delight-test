import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async findAll(minRating?: number, maxRating?: number) {
    const where: any = {};
    if (minRating !== undefined || maxRating !== undefined) {
      where.rating = {};
      if (minRating !== undefined) where.rating.gte = minRating;
      if (maxRating !== undefined) where.rating.lte = maxRating;
    }
    const shops = await this.prisma.shop.findMany({ 
      where, 
      include: { _count: { select: { products: true } } } 
    });

    return shops.map(shop => ({
      ...shop,
      productCount: shop._count.products,
      _count: undefined,
    }));
  }

  async findOne(id: string) {
    const shop = await this.prisma.shop.findUnique({ 
      where: { id }, 
      include: { 
        products: { include: { category: true, comments: true } },
        _count: { select: { products: true } }
      } 
    });
    if (!shop) return null;
    return {
      ...shop,
      productCount: shop._count.products,
      _count: undefined,
      products: shop.products.map(p => ({
        ...p,
        category: p.category.name,
      })),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    shopId?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const { page = 1, limit = 6, shopId, categoryId, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    const where: any = {};
    if (shopId) where.shopId = shopId;
    if (categoryId) where.categoryId = categoryId;

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { category: true, shop: true, comments: true },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return { 
      items: items.map(p => ({
        ...p,
        category: p.category.name,
        categoryId: p.categoryId,
      })), 
      total, 
      page, 
      limit, 
      totalPages: Math.ceil(total / limit) 
    };
  }

  async findOne(id: string) {
    const p = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, shop: true, comments: true },
    });
    if (!p) return null;
    return {
      ...p,
      category: p.category.name,
      categoryId: p.categoryId,
    };
  }
}

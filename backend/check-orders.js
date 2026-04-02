const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const orderCount = await prisma.order.count();
    console.log('Total orders:', orderCount);
    const lastOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    console.log('Last 5 orders:', JSON.stringify(lastOrders, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();

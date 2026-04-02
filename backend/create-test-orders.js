const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'search-test@ukr.net';
  const phone = '+380670000000';
  
  console.log('Creating 20 test orders for:', email);

  // Get some products to create order items
  const products = await prisma.product.findMany({ take: 5 });
  if (products.length === 0) {
    console.error('No products found to create orders!');
    return;
  }

  for (let i = 1; i <= 20; i++) {
    const order = await prisma.order.create({
      data: {
        email,
        phone,
        address: `Search Test Street, House ${i}`,
        total: Math.floor(Math.random() * 100) + 20,
        items: {
          create: [
            {
              productId: products[Math.floor(Math.random() * products.length)].id,
              quantity: Math.floor(Math.random() * 3) + 1,
              price: products[0].price
            }
          ]
        }
      }
    });
    console.log(`Created order #${i} with ID: ${order.id}`);
  }

  console.log('Successfully created 20 test orders for search-test@ukr.net.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

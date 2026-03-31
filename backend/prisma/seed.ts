import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid unique constraint errors
  await prisma.comment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // Categories
  const burgers = await prisma.category.create({ data: { name: 'Burgers' } });
  const drinks = await prisma.category.create({ data: { name: 'Drinks' } });
  const desserts = await prisma.category.create({ data: { name: 'Desserts' } });
  const pizza = await prisma.category.create({ data: { name: 'Pizza' } });

  // Shops
  const shop1 = await prisma.shop.create({
    data: { name: 'Burger Palace', description: 'Best burgers in town', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', rating: 4.7, lat: 50.4501, lng: 30.5234 },
  });
  const shop2 = await prisma.shop.create({
    data: { name: 'Pizza House', description: 'Authentic Italian pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', rating: 4.3, lat: 50.4547, lng: 30.5238 },
  });
  const shop3 = await prisma.shop.create({
    data: { name: 'Sweet Corner', description: 'Desserts & drinks', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', rating: 3.8, lat: 50.4470, lng: 30.5200 },
  });

  const products = [
    { name: 'Classic Burger', description: 'Juicy beef patty with lettuce and tomato', price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', rating: 4.5, shopId: shop1.id, categoryId: burgers.id },
    { name: 'Cheese Burger', description: 'Double cheese with caramelized onions', price: 10.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300', rating: 4.8, shopId: shop1.id, categoryId: burgers.id },
    { name: 'Bacon Burger', description: 'Crispy bacon with BBQ sauce', price: 11.49, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300', rating: 4.6, shopId: shop1.id, categoryId: burgers.id },
    { name: 'Veggie Burger', description: 'Plant-based patty with avocado', price: 9.99, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300', rating: 4.2, shopId: shop1.id, categoryId: burgers.id },
    { name: 'Coca Cola', description: 'Ice cold classic cola 500ml', price: 2.49, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300', rating: 4.0, shopId: shop1.id, categoryId: drinks.id },
    { name: 'Milkshake', description: 'Creamy vanilla milkshake', price: 5.99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300', rating: 4.7, shopId: shop1.id, categoryId: drinks.id },
    { name: 'Margherita Pizza', description: 'Classic tomato and mozzarella', price: 12.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300', rating: 4.5, shopId: shop2.id, categoryId: pizza.id },
    { name: 'Pepperoni Pizza', description: 'Spicy pepperoni with extra cheese', price: 14.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', rating: 4.9, shopId: shop2.id, categoryId: pizza.id },
    { name: 'Hawaiian Pizza', description: 'Ham and pineapple combo', price: 13.49, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300', rating: 3.9, shopId: shop2.id, categoryId: pizza.id },
    { name: 'Four Cheese Pizza', description: 'Mozzarella, gorgonzola, parmesan, cheddar', price: 15.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', rating: 4.7, shopId: shop2.id, categoryId: pizza.id },
    { name: 'Lemonade', description: 'Fresh squeezed lemonade', price: 3.49, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300', rating: 4.3, shopId: shop2.id, categoryId: drinks.id },
    { name: 'Iced Coffee', description: 'Cold brew with oat milk', price: 4.99, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300', rating: 4.6, shopId: shop2.id, categoryId: drinks.id },
    { name: 'Chocolate Cake', description: 'Rich dark chocolate layered cake', price: 6.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300', rating: 4.8, shopId: shop3.id, categoryId: desserts.id },
    { name: 'Cheesecake', description: 'New York style cheesecake', price: 7.49, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300', rating: 4.9, shopId: shop3.id, categoryId: desserts.id },
    { name: 'Tiramisu', description: 'Italian coffee-flavored dessert', price: 8.49, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', rating: 4.7, shopId: shop3.id, categoryId: desserts.id },
    { name: 'Ice Cream Sundae', description: 'Three scoops with toppings', price: 5.99, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300', rating: 4.4, shopId: shop3.id, categoryId: desserts.id },
    { name: 'Fruit Smoothie', description: 'Mixed berry smoothie bowl', price: 6.49, image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300', rating: 4.5, shopId: shop3.id, categoryId: drinks.id },
    { name: 'BBQ Burger', description: 'Smokey BBQ sauce with jalapeños', price: 12.49, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300', rating: 4.3, shopId: shop1.id, categoryId: burgers.id },
    { name: 'Mushroom Pizza', description: 'Wild mushroom with truffle oil', price: 16.99, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300', rating: 4.6, shopId: shop2.id, categoryId: pizza.id },
    { name: 'Brownie', description: 'Warm fudge brownie with ice cream', price: 5.49, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=300', rating: 4.5, shopId: shop3.id, categoryId: desserts.id },
  ];

  for (const p of products) {
    const product = await prisma.product.create({ data: p });
    // Add default comments
    await prisma.comment.createMany({
      data: [
        { author: 'John D.', text: 'Great quality, will order again!', rating: 5.0, productId: product.id },
        { author: 'Sarah M.', text: 'Good taste, delivery was fast', rating: 4.0, productId: product.id },
        { author: 'Alex K.', text: 'Decent portion size for the price', rating: 3.5, productId: product.id },
      ],
    });
  }

  // Coupons
  await prisma.coupon.createMany({
    data: [
      { code: 'WELCOME10', discount: 10 },
      { code: 'SAVE20', discount: 20 },
      { code: 'FREESHIP', discount: 5 },
    ],
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

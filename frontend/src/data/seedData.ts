import type { Product, Shop, Coupon, Comment } from '@/types';

const bilingualComments = (productId: string): Comment[] => [
  { id: `${productId}-1`, author: 'John D.', text: 'Great quality, will order again!', rating: 5.0, productId, createdAt: '2024-01-15' },
  { id: `${productId}-2`, author: 'Анна К.', text: 'Отличное качество, буду заказывать ещё!', rating: 5.0, productId, createdAt: '2024-01-18' },
  { id: `${productId}-3`, author: 'Sarah M.', text: 'Good taste, delivery was fast', rating: 4.0, productId, createdAt: '2024-02-03' },
  { id: `${productId}-4`, author: 'Дмитрий П.', text: 'Вкусно, доставка была быстрой', rating: 4.0, productId, createdAt: '2024-02-10' },
  { id: `${productId}-5`, author: 'Alex K.', text: 'Decent portion size for the price', rating: 3.5, productId, createdAt: '2024-02-20' },
  { id: `${productId}-6`, author: 'Мария С.', text: 'Нормальный размер порции за такую цену', rating: 3.5, productId, createdAt: '2024-03-01' },
  { id: `${productId}-7`, author: 'Mike R.', text: 'Loved every bite! Highly recommended.', rating: 4.5, productId, createdAt: '2024-03-10' },
  { id: `${productId}-8`, author: 'Олег В.', text: 'Каждый кусочек был великолепен! Рекомендую.', rating: 4.5, productId, createdAt: '2024-03-15' },
];

export const shops: Shop[] = [
  { id: '1', name: 'Burger Palace', description: 'Best burgers in town with premium ingredients', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', rating: 4.7, productCount: 7 },
  { id: '2', name: 'Pizza House', description: 'Authentic Italian pizza baked in wood-fired oven', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', rating: 4.3, productCount: 7 },
  { id: '3', name: 'Sweet Corner', description: 'Irresistible desserts & refreshing drinks', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', rating: 3.8, productCount: 6 },
];

export const categories = ['Burgers', 'Pizza', 'Drinks', 'Desserts'];

export const products: Product[] = [
  { id: '1', name: 'Classic Burger', description: 'Juicy beef patty with lettuce, tomato, and special sauce', price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', rating: 4.5, shopId: '1', categoryId: '1', category: 'Burgers', comments: bilingualComments('1') },
  { id: '2', name: 'Cheese Burger', description: 'Double cheese with caramelized onions', price: 10.99, originalPrice: 13.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300', rating: 4.8, shopId: '1', categoryId: '1', category: 'Burgers', comments: bilingualComments('2') },
  { id: '3', name: 'Bacon Burger', description: 'Crispy bacon with smoky BBQ sauce', price: 11.49, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300', rating: 4.6, shopId: '1', categoryId: '1', category: 'Burgers', comments: bilingualComments('3') },
  { id: '4', name: 'Veggie Burger', description: 'Plant-based patty with fresh avocado', price: 9.99, originalPrice: 12.49, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300', rating: 4.2, shopId: '1', categoryId: '1', category: 'Burgers', comments: bilingualComments('4') },
  { id: '5', name: 'Coca Cola', description: 'Ice cold classic cola 500ml', price: 2.49, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300', rating: 4.0, shopId: '1', categoryId: '3', category: 'Drinks', comments: bilingualComments('5') },
  { id: '6', name: 'Milkshake', description: 'Creamy vanilla milkshake with whipped cream', price: 5.99, originalPrice: 7.99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300', rating: 4.7, shopId: '1', categoryId: '3', category: 'Drinks', comments: bilingualComments('6') },
  { id: '7', name: 'BBQ Burger', description: 'Smokey BBQ sauce with jalapeños', price: 12.49, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300', rating: 4.3, shopId: '1', categoryId: '1', category: 'Burgers', comments: bilingualComments('7') },
  { id: '8', name: 'Margherita Pizza', description: 'Classic tomato and fresh mozzarella', price: 12.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300', rating: 4.5, shopId: '2', categoryId: '2', category: 'Pizza', comments: bilingualComments('8') },
  { id: '9', name: 'Pepperoni Pizza', description: 'Spicy pepperoni with extra mozzarella', price: 14.99, originalPrice: 18.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', rating: 4.9, shopId: '2', categoryId: '2', category: 'Pizza', comments: bilingualComments('9') },
  { id: '10', name: 'Hawaiian Pizza', description: 'Ham and sweet pineapple combo', price: 13.49, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300', rating: 3.9, shopId: '2', categoryId: '2', category: 'Pizza', comments: bilingualComments('10') },
  { id: '11', name: 'Four Cheese Pizza', description: 'Mozzarella, gorgonzola, parmesan, cheddar', price: 15.99, originalPrice: 19.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', rating: 4.7, shopId: '2', categoryId: '2', category: 'Pizza', comments: bilingualComments('11') },
  { id: '12', name: 'Mushroom Pizza', description: 'Wild mushroom with truffle oil drizzle', price: 16.99, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300', rating: 4.6, shopId: '2', categoryId: '2', category: 'Pizza', comments: bilingualComments('12') },
  { id: '13', name: 'Lemonade', description: 'Fresh squeezed lemonade with mint', price: 3.49, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300', rating: 4.3, shopId: '2', categoryId: '3', category: 'Drinks', comments: bilingualComments('13') },
  { id: '14', name: 'Iced Coffee', description: 'Cold brew with oat milk', price: 4.99, originalPrice: 6.49, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300', rating: 4.6, shopId: '2', categoryId: '3', category: 'Drinks', comments: bilingualComments('14') },
  { id: '15', name: 'Chocolate Cake', description: 'Rich dark chocolate layered cake', price: 6.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300', rating: 4.8, shopId: '3', categoryId: '4', category: 'Desserts', comments: bilingualComments('15') },
  { id: '16', name: 'Cheesecake', description: 'New York style classic cheesecake', price: 7.49, originalPrice: 9.99, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300', rating: 4.9, shopId: '3', categoryId: '4', category: 'Desserts', comments: bilingualComments('16') },
  { id: '17', name: 'Tiramisu', description: 'Italian coffee-flavored layered dessert', price: 8.49, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', rating: 4.7, shopId: '3', categoryId: '4', category: 'Desserts', comments: bilingualComments('17') },
  { id: '18', name: 'Ice Cream Sundae', description: 'Three scoops with chocolate sauce', price: 5.99, originalPrice: 7.49, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300', rating: 4.4, shopId: '3', categoryId: '4', category: 'Desserts', comments: bilingualComments('18') },
  { id: '19', name: 'Fruit Smoothie', description: 'Mixed berry smoothie with banana', price: 6.49, image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300', rating: 4.5, shopId: '3', categoryId: '3', category: 'Drinks', comments: bilingualComments('19') },
  { id: '20', name: 'Brownie', description: 'Warm fudge brownie with vanilla ice cream', price: 5.49, originalPrice: 6.99, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=300', rating: 4.5, shopId: '3', categoryId: '4', category: 'Desserts', comments: bilingualComments('20') },
];

export const coupons: Coupon[] = [
  { id: '1', code: 'WELCOME10', discount: 10, active: true, description: 'Welcome discount for new customers' },
  { id: '2', code: 'SAVE20', discount: 20, active: true, description: 'Save 20% on orders over $30' },
  { id: '3', code: 'FREESHIP', discount: 5, active: true, description: 'Free shipping on any order' },
  { id: '4', code: 'BURGER15', discount: 15, active: true, description: '15% off all burgers' },
  { id: '5', code: 'PIZZA25', discount: 25, active: true, description: '25% off pizza orders' },
  { id: '6', code: 'SWEET10', discount: 10, active: true, description: '10% off desserts' },
  { id: '7', code: 'SUMMER30', discount: 30, active: true, description: 'Summer special — 30% off' },
  { id: '8', code: 'LOYAL5', discount: 5, active: true, description: 'Loyalty reward discount' },
  { id: '9', code: 'NIGHT20', discount: 20, active: true, description: 'Late night 20% off orders' },
  { id: '10', code: 'COMBO10', discount: 10, active: false, description: 'Combo meal discount (expired)' },
];

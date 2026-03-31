import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t bg-card mt-auto">
    <div className="container py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🍔</span>
            <span className="text-lg font-bold text-foreground">FoodDelivery</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Fresh food delivered fast to your door. Quality ingredients, best prices.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
          <nav className="flex flex-col gap-1.5">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shops</Link>
            <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Orders</Link>
            <Link to="/coupons" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Coupons</Link>
            <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cart</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <p>📧 info@fooddelivery.com</p>
            <p>📞 +1 302 543 20 12</p>
            <p>🌐 www.fooddelivery.com</p>
          </div>
        </div>
      </div>
      <div className="border-t mt-6 pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FoodDelivery. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

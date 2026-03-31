import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, HelpCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import SearchBar from '@/components/SearchBar';
import { ConnectionStatus } from './ConnectionStatus';

const Header = () => {
  const itemCount = useCartStore((s) => s.getItemCount());
  const user = useUserStore((s) => s.user);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🍔</span>
          <span className="text-xl font-bold text-foreground hidden sm:inline">FoodDelivery</span>
        </Link>

        <div className="flex-1 flex items-center justify-center gap-4">
          <SearchBar />
          <div className="hidden lg:block">
            <ConnectionStatus />
          </div>
        </div>

        <nav className="flex items-center gap-2 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/help">
                <Button variant="ghost" size="sm" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden md:inline">Help</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>How to use & FAQ</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user?.name || 'Profile'}</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Personal Cabinet & Stats</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/orders"><Button variant="ghost" size="sm">Orders</Button></Link>
            </TooltipTrigger>
            <TooltipContent>View your order history</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/coupons"><Button variant="ghost" size="sm">Coupons</Button></Link>
            </TooltipTrigger>
            <TooltipContent>Browse available coupons</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/cart" className="relative">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.span
                        key={itemCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground font-bold"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>View your shopping cart</TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
};

export default Header;

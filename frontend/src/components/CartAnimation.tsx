import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CartAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const CartAnimation = ({ show, onComplete }: CartAnimationProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            if (!show) onComplete();
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 rounded-2xl bg-primary px-8 py-6 text-primary-foreground shadow-2xl pointer-events-auto"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, y: -60 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onAnimationComplete={onComplete}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 500 }}
            >
              <Check className="h-8 w-8" />
            </motion.div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShoppingCart className="h-4 w-4" />
              Added to cart!
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartAnimation;

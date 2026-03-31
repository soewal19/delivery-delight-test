import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import burgerImg from '@/assets/preloader/burger.png';
import pizzaImg from '@/assets/preloader/pizza.png';
import sushiImg from '@/assets/preloader/sushi.png';
import saladImg from '@/assets/preloader/salad.png';
import donutImg from '@/assets/preloader/donut.png';
import tacosImg from '@/assets/preloader/tacos.png';

const foodItems = [
  { src: pizzaImg, alt: 'Pizza', size: 110, x: 6, y: 8 },
  { src: burgerImg, alt: 'Burger', size: 100, x: 88, y: 6 },
  { src: sushiImg, alt: 'Sushi', size: 95, x: 4, y: 52 },
  { src: saladImg, alt: 'Salad', size: 105, x: 90, y: 48 },
  { src: donutImg, alt: 'Donut', size: 80, x: 10, y: 85 },
  { src: tacosImg, alt: 'Tacos', size: 100, x: 85, y: 82 },
  { src: pizzaImg, alt: 'Pizza 2', size: 60, x: 30, y: 4 },
  { src: burgerImg, alt: 'Burger 2', size: 55, x: 72, y: 92 },
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setReady(true);
          return 100;
        }
        return p + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [ready, onComplete]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
  }, []);

  return (
    <motion.div
      className="preloader-wrapper"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Parallax depth layers */}
      <div
        className="preloader-depth preloader-depth--far"
        style={{ transform: `translate(${mouse.x * -30}px, ${mouse.y * -30}px) scale(1.15)` }}
      />
      <div
        className="preloader-depth preloader-depth--mid"
        style={{ transform: `translate(${mouse.x * -15}px, ${mouse.y * -15}px) scale(1.08)` }}
      />
      <div
        className="preloader-depth preloader-depth--near"
        style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)` }}
      />

      {/* Floating real food photos with depth-based parallax */}
      {foodItems.map((food, i) => {
        const depth = 1 + i * 0.25;
        return (
          <motion.div
            key={i}
            className="preloader-food-item"
            initial={{ opacity: 0, scale: 0, rotate: -20 + i * 8 }}
            animate={{
              opacity: [0, 0.85, 0.65],
              scale: 1,
              rotate: 0,
              y: [0, -10 - i * 2, 0],
            }}
            transition={{
              delay: 0.15 + i * 0.1,
              duration: 0.7,
              y: { repeat: Infinity, duration: 3.5 + i * 0.4, ease: 'easeInOut' },
            }}
            style={{
              left: `${food.x}%`,
              top: `${food.y}%`,
              width: food.size,
              height: food.size,
              transform: `translate(-50%, -50%) translate(${mouse.x * depth * 10}px, ${mouse.y * depth * 10}px)`,
            }}
          >
            <img
              src={food.src}
              alt={food.alt}
              width={food.size}
              height={food.size}
              className="preloader-food-img"
              draggable={false}
            />
          </motion.div>
        );
      })}

      {/* Central hero content with 3D tilt */}
      <div
        className="preloader-hero"
        style={{
          transform: `
            translate(${mouse.x * 6}px, ${mouse.y * 6}px)
            perspective(1000px)
            rotateY(${mouse.x * 4}deg)
            rotateX(${-mouse.y * 4}deg)
          `,
        }}
      >
        {/* Glow ring */}
        <motion.div
          className="preloader-glow-ring"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ delay: 0.3, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Hero food image */}
        <motion.div
          initial={{ scale: 0, rotateZ: -180 }}
          animate={{ scale: 1, rotateZ: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.1 }}
          className="preloader-logo-icon"
        >
          <img
            src={burgerImg}
            alt="FoodDelivery"
            width={120}
            height={120}
            className="preloader-hero-img"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="preloader-brand"
        >
          FoodDelivery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="preloader-tagline"
        >
          Fresh meals, delivered fast
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="preloader-bar-container"
        >
          <div className="preloader-bar-track">
            <motion.div
              className="preloader-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="preloader-bar-label">{progress}%</span>
        </motion.div>

        {/* CTA / Loading status */}
        <AnimatePresence mode="wait">
          {ready ? (
            <motion.button
              key="enter"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={onComplete}
              className="preloader-cta"
            >
              <span>Enter Store</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          ) : (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="preloader-status"
            >
              Preparing your experience…
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Corner accents */}
      <div className="preloader-corner preloader-corner--tl" style={{ transform: `translate(${mouse.x * -5}px, ${mouse.y * -5}px)` }} />
      <div className="preloader-corner preloader-corner--br" style={{ transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)` }} />
    </motion.div>
  );
};

export default Preloader;

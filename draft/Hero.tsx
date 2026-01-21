'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Product images for the animated carousel
const productImages = [
  '/images/services/barcode.webp',
  '/images/services/card-printers.webp',
  '/images/services/fire-alarm.webp',
  '/images/services/surveillance.webp',
];

// Base delay to start after header animation finishes
const HEADER_ANIMATION_DURATION = 0.8;

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Exact brand colors sampled from the image
  const colors = {
    navy: '#2c1e4a',    // Dark Purple/Navy
    magenta: '#992864', // Brand Magenta
    blue: '#dbeafe',    // Light Blue (Tailwind slate-200/blue-100 equivalent)
  };

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[750px] bg-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* =========================================
          BACKGROUND LAYER (Absolute Positioned)
          ========================================= */}

      {/* --- TOP LEFT CLUSTER --- */}
      {/* Contains: Large Magenta Trapezoid, Navy Corner, Light Blue Accent */}
      <motion.div 
        className="absolute top-0 left-0 w-[45%] md:w-[40%] max-w-[600px] z-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: HEADER_ANIMATION_DURATION, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Light Blue Accent (Top Edge) */}
          <path d="M120 0 L220 0 L180 40 L120 0 Z" fill={colors.blue} />
          
          {/* Deep Navy Corner Triangle (Top Left) */}
          <path d="M0 0 L110 0 L0 110 Z" fill={colors.navy} />
          
          {/* Main Magenta Shape (The large angular block) */}
          {/* Overlaps correctly with the navy corner */}
          <path d="M0 110 L110 0 L320 0 L80 240 L0 160 Z" fill={colors.magenta} />
        </svg>
      </motion.div>

      {/* --- TOP RIGHT CLUSTER --- */}
      {/* Contains: 4x4 Dot Grid, Navy Corner, Magenta Accent */}
      <motion.div 
        className="absolute top-0 right-0 w-[35%] md:w-[30%] max-w-[450px] z-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: HEADER_ANIMATION_DURATION + 0.1, ease: 'easeOut' }}
      >
         <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto ml-auto">
           {/* 4x4 Dot Grid (Floating Left) */}
           <g fill={colors.magenta}>
             {[0, 1, 2, 3].map((row) => 
               [0, 1, 2, 3].map((col) => (
                 <circle key={`grid-${row}-${col}`} cx={40 + (col * 15)} cy={40 + (row * 15)} r="3" />
               ))
             )}
           </g>

           {/* Deep Navy Corner Shape */}
           <path d="M300 0 L150 0 L300 150 Z" fill={colors.navy} />
           
           {/* Magenta Accent (The small tip/triangle) */}
           <path d="M300 150 L300 200 L250 150 Z" fill={colors.magenta} />
         </svg>
      </motion.div>

      {/* --- BOTTOM LEFT CLUSTER --- */}
      {/* Contains: Corner Navy/Magenta, 5 Vertical Dots, 6 Diagonal Stripes */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[45%] md:w-[35%] max-w-[500px] z-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: HEADER_ANIMATION_DURATION + 0.2, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto mt-auto">
           
           {/* The 6 Diagonal Stripes (Navy) - Bottom Center-ish */}
           <g fill={colors.navy}>
              <path d="M140 250 L160 230 L168 230 L148 250 Z" />
              <path d="M175 250 L195 230 L203 230 L183 250 Z" />
              <path d="M210 250 L230 230 L238 230 L218 250 Z" />
              <path d="M245 250 L265 230 L273 230 L253 250 Z" />
              <path d="M280 250 L300 230 L308 230 L288 250 Z" />
              <path d="M315 250 L335 230 L343 230 L323 250 Z" />
           </g>

           {/* Corner Geometry */}
           {/* Deep Navy Triangle (Very Corner) */}
           <path d="M0 250 L0 150 L100 250 Z" fill={colors.navy} />
           {/* Magenta Triangle (Sitting on top/next to it) */}
           <path d="M0 150 L80 70 L100 250 Z" fill={colors.magenta} /> 
           
           {/* 5 Vertical Magenta Dots */}
           <g fill={colors.magenta}>
             <circle cx="30" cy="50" r="4" />
             <circle cx="30" cy="70" r="4" />
             <circle cx="20" cy="90" r="4" /> {/* Slightly offset to follow curve illusion */}
             <circle cx="15" cy="110" r="4" />
             <circle cx="10" cy="130" r="4" />
           </g>
        </svg>
      </motion.div>

      {/* --- BOTTOM RIGHT CLUSTER --- */}
      {/* Contains: Large Magenta, Navy Chevron, Light Blue, Vertical Navy Dots */}
      <motion.div 
        className="absolute bottom-0 right-0 w-[40%] md:w-[35%] max-w-[500px] z-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: HEADER_ANIMATION_DURATION + 0.3, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 350 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto mt-auto ml-auto">
           {/* Light Blue Accent (Top of the cluster) */}
           <path d="M250 150 L280 120 L320 160 Z" fill={colors.blue} />

           {/* Main Large Magenta Triangle */}
           <path d="M350 300 L150 300 L350 100 Z" fill={colors.magenta} />
           
           {/* Deep Navy Corner Overlay (The "Fold") */}
           <path d="M350 300 L350 220 L270 300 Z" fill={colors.navy} />
           {/* Extra Navy shard for the 'L' shape look */}
           <path d="M350 50 L350 0 L300 50 Z" fill={colors.navy} />

           {/* 5 Vertical Navy Dots (Left of the shape) */}
           <g fill={colors.navy}>
             <circle cx="280" cy="50" r="4" />
             <circle cx="280" cy="70" r="4" />
             <circle cx="280" cy="90" r="4" />
             <circle cx="280" cy="110" r="4" />
             <circle cx="280" cy="130" r="4" />
           </g>
        </svg>
      </motion.div>

      {/* --- CENTER BOTTOM CHEVRONS --- */}
      {/* Light gray arrows at the bottom center */}
      <motion.div 
        className="absolute bottom-6 flex space-x-2 opacity-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 0.5, delay: HEADER_ANIMATION_DURATION + 1.2, ease: 'easeOut' }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
            </svg>
        ))}
      </motion.div>

      {/* =========================================
          CONTENT LAYER (Relative, Z-10)
          ========================================= */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center text-center">

        {/* LOGO + TITLE SECTION */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Logo Image */}
          <motion.div 
            className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: HEADER_ANIMATION_DURATION + 0.4, ease: 'easeOut' }}
          >
            <Image
              src="/images/logo.png"
              alt="WST Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Divider Line */}
          <motion.div 
            className="w-[2px] h-16 md:h-24 bg-gray-300 hidden md:block"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.4, delay: HEADER_ANIMATION_DURATION + 0.6, ease: 'easeOut' }}
          />
          
          {/* Arabic Company Name */}
          <motion.h2 
            className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight" 
            style={{color: colors.navy}}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: HEADER_ANIMATION_DURATION + 0.5, ease: 'easeOut' }}
          >
            مؤسسة حلول الوسام للتجارة
          </motion.h2>
        </div>

        {/* ANIMATED PRODUCT IMAGES CAROUSEL */}
        <motion.div 
          className="relative w-full max-w-[600px] h-[280px] md:h-[350px] my-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: HEADER_ANIMATION_DURATION + 0.7, ease: 'easeOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={productImages[currentImageIndex]}
                alt={`Product ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Carousel Indicators */}
          <motion.div 
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: HEADER_ANIMATION_DURATION + 0.9, ease: 'easeOut' }}
          >
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-[#992864] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* CATCHY PHRASE / HEADLINE */}
        <motion.h1 
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold mt-10 mb-4" 
          style={{color: colors.navy}}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: HEADER_ANIMATION_DURATION + 1.0, ease: 'easeOut' }}
        >
          بوابتك لتطوير أعمالك
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;
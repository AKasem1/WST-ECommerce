'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Typing text component
const TypingText = ({ 
  text, 
  className, 
  speed = 50, 
  onComplete 
}: { 
  text: string; 
  className?: string; 
  speed?: number; 
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
        />
      )}
    </span>
  );
};

export default function HeroSection() {
  const [titleComplete, setTitleComplete] = useState(false);
  const [descriptionComplete, setDescriptionComplete] = useState(false);

  const title = 'مؤسسة حلول الوسام للتجارة';
  const description = 'شريكك الموثوق لحلول تقنية متكاملة تنقل أعمالك إلى آفاق جديدة من النجاح والتميز';

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 lg:px-12">
        
        {/* Logo + Title Section */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Logo Image - appears first before typing */}
          <motion.div 
            className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src="/images/logo.png"
              alt="WST Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Divider Line - appears after description completes */}
          <motion.div 
            className="w-16 h-[2px] md:w-[2px] md:h-20 bg-white/60 hidden md:block"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={descriptionComplete ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.4, delay: 0, ease: 'easeOut' }}
          />
          
          {/* Arabic Company Name with typing animation */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg min-h-[1.5em]">
            <TypingText 
              text={title} 
              speed={60} 
              onComplete={() => setTitleComplete(true)} 
            />
          </h1>
        </div>

        {/* Description with typing animation - starts after title */}
        <div className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 max-w-3xl leading-relaxed drop-shadow-md min-h-[2em]">
          {titleComplete && (
            <TypingText 
              text={description} 
              speed={30} 
              onComplete={() => setDescriptionComplete(true)} 
            />
          )}
        </div>

        {/* CTA Button - appears last after logo */}
        <motion.a
          href="/shop"
          initial={{ opacity: 0, y: 30 }}
          animate={descriptionComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-[#992864] text-white font-bold text-lg md:text-xl rounded-full hover:bg-[#7a1f50] transition-all duration-300 hover:scale-105 shadow-lg"
        >
          متجرنا
          <svg
            className="w-5 h-5 md:w-6 md:h-6 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}

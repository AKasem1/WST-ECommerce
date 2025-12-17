'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

export default function TypingSection() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'خدمات عالية الجودة تساهم في بناء بيئة أكثر أمانًا وذكاءً لعملائنا';
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Generate particle positions only once on client side
  const particles = useMemo(() => {
    if (!isMounted) return [];
    return [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(typingInterval);
      }
    }, 80); // Typing speed in milliseconds

    return () => clearInterval(typingInterval);
  }, [isMounted]);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: '#382A67' }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(186, 81, 131, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(186, 81, 131, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(186, 81, 131, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(186, 81, 131, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(186, 81, 131, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main text with typing animation */}
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white leading-relaxed"
            dir="rtl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {displayedText}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1 h-8 md:h-12 bg-white ml-1 align-middle"
              />
            )}
          </motion.h2>

          {/* Decorative underline animation */}
          <motion.div
            className="mt-8 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Pulsing glow effect */}
          {isComplete && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                background:
                  'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

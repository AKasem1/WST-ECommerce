'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { services } from '@/data/services';

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide for mobile carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      // Swipe right - go to previous
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    } else if (info.offset.x < -threshold) {
      // Swipe left - go to next
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
  };

  return (
    <section 
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Floating Symbols Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Symbol */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-10 left-10 text-white text-6xl md:text-8xl"
        >
          ◆
        </motion.div>
        
        {/* Top Right Symbol */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 text-white text-5xl md:text-7xl"
        >
          ✦
        </motion.div>
        
        {/* Bottom Left Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1.2 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-20 left-1/4 text-white text-4xl md:text-6xl"
        >
          ◇
        </motion.div>
        
        {/* Bottom Right Symbol */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 0.1, x: -20 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-32 right-1/3 text-white text-5xl md:text-7xl"
        >
          ✧
        </motion.div>

        {/* Center Symbol */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-9xl md:text-[200px]"
        >
          ◈
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-12 md:mb-16 lg:mb-20"
        >
          خدماتنا
        </motion.h2>

        {/* Mobile Carousel - Hidden on md and up */}
        <div className="md:hidden relative">
          <div className="relative h-[450px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute w-full max-w-sm mx-auto cursor-grab active:cursor-grabbing"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                  {/* Image Container */}
                  <div 
                    className="relative aspect-square overflow-hidden border-4 rounded-2xl"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <Image
                      src={services[currentIndex].image}
                      alt={services[currentIndex].name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Service Name */}
                  <div className="p-6 text-center">
                    <h3 
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {services[currentIndex].name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: 'easeOut' 
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Image Container */}
                <div 
                  className="relative aspect-square overflow-hidden border-4 rounded-2xl"
                  style={{ borderColor: 'var(--color-border-primary)' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </motion.div>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Service Name */}
                <div className="p-6 text-center">
                  <h3 
                    className="text-xl md:text-2xl font-bold transition-colors duration-300"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {service.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

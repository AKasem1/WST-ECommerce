'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { partners } from '@/data/partners';

export default function PartnersSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Auto-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf: number;
    const speed = 2; // Adjust speed here

    const step = () => {
      if (!paused && !dragging.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  // Drag / Swipe
  const onDown = (x: number) => {
    const el = trackRef.current!;
    dragging.current = true;
    startX.current = x - el.offsetLeft;
    startScroll.current = el.scrollLeft;
    setPaused(true);
  };

  const onMove = (x: number) => {
    if (!dragging.current) return;
    const el = trackRef.current!;
    const cur = x - el.offsetLeft;
    el.scrollLeft = startScroll.current - (cur - startX.current) * 2;
  };

  const onUp = () => {
    dragging.current = false;
    setTimeout(() => setPaused(false), 400);
  };

  return (
    <section 
      className="bg-white py-16 md:py-24 lg:py-32 overflow-hidden" 
      ref={ref}
      dir="ltr"
    >
      {/* Title - Contained */}
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 lg:mb-20"
          style={{ color: 'var(--color-text-primary)' }}
        >
          شركاؤنا
        </motion.h2>
      </div>

      {/* Auto-scrolling Carousel - Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1 }
        }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="relative"
      >
        {/* Gradient Overlays for fade effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-white to-transparent pointer-events-none z-10" />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 md:gap-12 lg:gap-16 overflow-x-scroll select-none cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch' 
          }}
          onMouseDown={(e) => onDown(e.pageX)}
          onMouseMove={(e) => onMove(e.pageX)}
          onMouseUp={onUp}
          onMouseLeave={() => {
            if (dragging.current) onUp();
            setPaused(false);
          }}
          onTouchStart={(e) => onDown(e.touches[0].pageX)}
          onTouchMove={(e) => onMove(e.touches[0].pageX)}
          onTouchEnd={onUp}
          onMouseEnter={() => setPaused(true)}
        >
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.id}-${index}`} 
              className="shrink-0 h-40 md:h-52 lg:h-60"
            >
              <div className="h-full flex items-center justify-center px-4">
                <div className="relative w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                    draggable={false}
                    priority={index < partners.length}
                    sizes="(max-width: 768px) 160px, (max-width: 1024px) 208px, 240px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subtitle - Contained */}
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="text-center mt-12 text-gray-600 text-lg md:text-xl"
        >
          نفخر بشراكتنا مع أفضل العلامات التجارية العالمية
        </motion.p>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

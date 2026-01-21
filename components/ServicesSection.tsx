'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/swiper-custom.css';
import { services } from '@/data/services';

// Original section bg color - now used for accents
const ACCENT_COLOR = '#BA5183';

export default function ServicesSection() {
  return (
    <section 
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-white"
      dir="rtl"
    >
      {/* Floating Symbols Background - now using accent color */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Symbol */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-10 left-10 text-6xl md:text-8xl"
          style={{ color: ACCENT_COLOR }}
        >
          ◆
        </motion.div>
        
        {/* Top Right Symbol */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 text-5xl md:text-7xl"
          style={{ color: ACCENT_COLOR }}
        >
          ✦
        </motion.div>
        
        {/* Bottom Left Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1.2 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-20 left-1/4 text-4xl md:text-6xl"
          style={{ color: ACCENT_COLOR }}
        >
          ◇
        </motion.div>
        
        {/* Bottom Right Symbol */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 0.1, x: -20 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-32 right-1/3 text-5xl md:text-7xl"
          style={{ color: ACCENT_COLOR }}
        >
          ✧
        </motion.div>

        {/* Center Symbol */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl md:text-[200px]"
          style={{ color: ACCENT_COLOR }}
        >
          ◈
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title with Modern Shape */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="relative inline-block">
            {/* Decorative shape behind title */}
            <div 
              className="absolute -inset-x-8 -inset-y-3 md:-inset-x-12 md:-inset-y-4 rounded-full opacity-15"
              style={{ backgroundColor: ACCENT_COLOR }}
            />
            {/* Decorative accent lines */}
            <div 
              className="absolute -left-16 md:-left-24 top-1/2 -translate-y-1/2 w-8 md:w-16 h-1 rounded-full"
              style={{ backgroundColor: ACCENT_COLOR }}
            />
            <div 
              className="absolute -right-16 md:-right-24 top-1/2 -translate-y-1/2 w-8 md:w-16 h-1 rounded-full"
              style={{ backgroundColor: ACCENT_COLOR }}
            />
            {/* Small decorative dots */}
            <div 
              className="absolute -left-20 md:-left-28 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: ACCENT_COLOR }}
            />
            <div 
              className="absolute -right-20 md:-right-28 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: ACCENT_COLOR }}
            />
            <h2 
              className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-center"
              style={{ color: 'var(--color-text-primary)' }}
            >
              خدماتنا
            </h2>
          </div>
        </motion.div>

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 my-10 mx-2 group border-2"
                  style={{ borderColor: ACCENT_COLOR }}
                >
                  {/* Image Container */}
                  <div 
                    className="relative aspect-square overflow-hidden border-b-2"
                    style={{ borderColor: ACCENT_COLOR }}
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
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
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}


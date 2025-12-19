'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/swiper-custom.css';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section 
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      dir="rtl"
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

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            loop={true}
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
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 my-10 mx-2 group"
                >
                  {/* Image Container */}
                  <div 
                    className="relative aspect-square overflow-hidden border-4 rounded-2xl"
                    style={{ borderColor: 'var(--color-border-primary)' }}
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

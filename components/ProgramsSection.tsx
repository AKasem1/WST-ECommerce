'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/swiper-custom.css';
import type { ProgramResponse } from '@/types/program';

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs?limit=10');
        const data = await response.json();
        setPrograms(data.programs || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

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
          برامجنا
        </motion.h2>

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
              delay: 500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={600}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {programs.map((program, index) => (
              <SwiperSlide key={program._id}>
                <Link href={`/programs/${program.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 my-10 mx-2 group cursor-pointer"
                  >
                    {/* Image Container */}
                    <div 
                      className="relative aspect-square overflow-hidden border-4 rounded-2xl"
                      style={{ borderColor: 'var(--color-border-primary)' }}
                    >
                      <Image
                        src={program.programImage}
                        alt={program.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Free/Paid Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          program.isFree ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {program.isFree ? 'مجاني' : 'مدفوع'}
                        </span>
                      </div>
                    </div>

                    {/* Program Info */}
                    <div className="p-6 text-center">
                      <h3 
                        className="text-xl md:text-2xl font-bold transition-colors duration-300 mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {program.name}
                      </h3>
                      {program.nameEn && (
                        <p className="text-sm text-gray-500 mb-3">{program.nameEn}</p>
                      )}
                      {program.shortDescription && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {program.shortDescription}
                        </p>
                      )}
                      
                      {/* Platforms */}
                      {program.platforms && program.platforms.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                          {program.platforms.slice(0, 3).map((platform, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {platform}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

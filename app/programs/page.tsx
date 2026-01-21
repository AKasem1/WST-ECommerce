'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ProgramResponse } from '@/types/program';

// Brand colors
const PRIMARY_COLOR = '#382A67';
const ACCENT_COLOR = '#BA5183';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: PRIMARY_COLOR }}
          >
            برامجنا
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            اكتشف مجموعة برامجنا المتكاملة لإدارة أعمالك بكفاءة عالية
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/programs/${program.slug}`}>
                <div 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer border-2 h-full"
                  style={{ borderColor: ACCENT_COLOR }}
                >
                  {/* Image Container */}
                  <div 
                    className="relative aspect-square overflow-hidden border-b-2"
                    style={{ borderColor: ACCENT_COLOR }}
                  >
                    <Image
                      src={program.programImage}
                      alt={program.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Program Info */}
                  <div className="p-6 text-center">
                    <h3 
                      className="text-xl md:text-2xl font-bold transition-colors duration-300 mb-2"
                      style={{ color: PRIMARY_COLOR }}
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

                    {/* View Details Button */}
                    <div 
                      className="mt-4 py-2 px-4 rounded-full text-white font-semibold text-sm inline-block transition-all duration-300 group-hover:scale-105"
                      style={{ backgroundColor: ACCENT_COLOR }}
                    >
                      عرض التفاصيل
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Programs Message */}
        {programs.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">لا توجد برامج متاحة حالياً</p>
          </div>
        )}

        {/* Comparison CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4 text-lg">
            هل تريد مقارنة الباقات المختلفة؟
          </p>
          <Link
            href="/programs/comparison"
            className="inline-block px-8 py-4 text-white rounded-full font-bold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            مقارنة الباقات
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

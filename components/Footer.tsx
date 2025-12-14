'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const services = [
    'أجهزة الحضور والانصراف',
    'أجهزة الشبكات والاتصالات',
    'أجهزة الكاشير ومشتملاتها',
    'أجهزة الكمبيوتر ومشتملاتها'
  ];

  return (
    <footer 
      ref={ref}
      className="text-white py-12 md:py-16"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info - Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col items-center md:items-start text-center md:text-right"
          >
            <Image
              src="/images/logo.png"
              alt="WST Logo"
              width={150}
              height={75}
              className="mb-4"
            />
            <p className="text-sm leading-relaxed" dir="rtl">
              7410خالد بن الوليد-حي الشرفيه -الكود البريدي
              <br />
              2622-امام الطازج
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p dir="ltr">whatsapp: +(966) 594-013037</p>
              <p dir="ltr">Phone: +(966) 55-6887101</p>
              <p dir="ltr">Email: support@wessams.com</p>
            </div>
          </motion.div>

          {/* Services - Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-center md:text-right"
          >
            <h3 
              className="text-xl md:text-2xl font-bold mb-6"
              style={{ color: 'var(--color-bg-primary)' }}
            >
              خدمات
            </h3>
            <ul className="space-y-3" dir="rtl">
              {services.map((service, index) => (
                <li 
                  key={index}
                  className="text-sm md:text-base text-gray-300"
                >
                  • {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About Us - Column 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-center md:text-right"
          >
            <h3 
              className="text-xl md:text-2xl font-bold mb-6"
              style={{ color: 'var(--color-bg-primary)' }}
            >
              معلومات عنا
            </h3>
            <ul className="space-y-3" dir="rtl">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300"
                >
                  • من نحن
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300"
                >
                  • تواصل معنا
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Policies - Column 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-center md:text-right"
          >
            <h3 
              className="text-xl md:text-2xl font-bold mb-6"
              style={{ color: 'var(--color-bg-primary)' }}
            >
              السياسات
            </h3>
            <ul className="space-y-3" dir="rtl">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300"
                >
                  • سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1 }
          }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-12 pt-8 border-t border-gray-700 text-center"
        >
          <p className="text-sm text-gray-400" dir="rtl">
            Copyright © 2025 مؤسسة حلول الوسام للتجارة | جميع الحقوق محفوظة
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#382A67' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Floating Symbol */}
        <motion.div
          initial={{ opacity: 0, y: -30, rotate: 0 }}
          animate={{ opacity: 0.15, y: 0, rotate: 360 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-10 left-10 text-6xl md:text-8xl"
          style={{ color: '#BA5183' }}
        >
          ✦
        </motion.div>

        {/* Top Right Floating Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-20 right-20 text-5xl md:text-7xl text-white"
        >
          ◆
        </motion.div>

        {/* Bottom Left Floating Symbol */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.12, x: 0 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          className="absolute bottom-16 left-1/4 text-4xl md:text-6xl"
          style={{ color: '#BA5183' }}
        >
          ◇
        </motion.div>

        {/* Bottom Right Floating Symbol */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="absolute bottom-20 right-1/3 text-5xl md:text-7xl text-white"
        >
          ✧
        </motion.div>

        {/* Center Large Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl md:text-[200px] text-white"
        >
          ◈
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8" dir="rtl">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="text-[120px] md:text-[250px] lg:text-[220px] font-bold leading-none"
            style={{ color: '#BA5183' }}
          >
            404
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            الصفحة غير موجودة
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '150px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 mx-auto"
            style={{
              background: 'linear-gradient(to left, #BA5183, white)',
            }}
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* Home Button */}
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: '#BA5183',
                color: 'white'
              }}
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>العودة للرئيسية</span>
            </Link>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold rounded-lg border-2 border-white/30 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>تواصل معنا</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

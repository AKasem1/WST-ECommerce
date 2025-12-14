'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  // Animation delays - orchestrated sequence after navbar (0.6s)
  const baseDelay = 0.8; // Start after navbar animation
  const imageDelay = baseDelay;
  const headlineDelay = baseDelay + 0.3;
  const subheadlineDelay = baseDelay + 0.5;
  const ctaDelay = baseDelay + 0.7;

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Text Content - Right Side */}
          <div className="flex-1 text-center md:text-right space-y-6 md:space-y-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: headlineDelay, duration: 0.6, ease: 'easeOut' }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              مؤسسة حلول الوسام للتجارة
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: subheadlineDelay, duration: 0.6, ease: 'easeOut' }}
              className="text-xl md:text-2xl lg:text-3xl"
              style={{ color: 'var(--color-bg-primary)' }}
            >
              لتقديم حلول أمنية ذكية لراحة بالك
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ctaDelay, duration: 0.6, ease: 'easeOut' }}
            >
              <Link
                href="/shop"
                className="inline-block px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-text-primary)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
                }}
              >
                متجرنا
              </Link>
            </motion.div>
          </div>

          {/* Hero Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: imageDelay, duration: 0.8, ease: 'easeOut' }}
            className="flex-1 w-full max-w-lg md:max-w-none"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-image.jpg"
                alt="مؤسسة حلول الوسام للتجارة"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

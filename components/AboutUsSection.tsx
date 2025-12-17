'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutUsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" dir="rtl">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold"
              style={{ color: '#382A67' }}
            >
              لماذا نحن ؟
            </motion.h2>

            {/* Subtitle */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: '#BA5183' }}
            >
              خدمات عالية الجودة
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl leading-relaxed text-black"
            >
              بوابتك نحو المستقبل الآمن. لأننا ندرك حجم التحديات الأمنية المتسارعة، نقدم
              لكم منظومة متكاملة من الحلول الذكية التي تشمل الأنظمة الأمنية، الشبكات،
              وأنظمة التحكم المتطورة. هدفنا ليس فقط توفير التكنولوجيا، بل منحكم راحة
              البال وكفاءة الأداء التي تستحقونها. اختاروا الابتكار.. اختاروا الأمان
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '150px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-1"
              style={{
                background: 'linear-gradient(to left, #BA5183, #382A67)',
              }}
            />
          </motion.div>

          {/* Logo - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <Image
              src="/images/logo.png"
              alt="Company Logo"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

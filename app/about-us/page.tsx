'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 md:py-28">
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ color: '#382A67' }}
              >
                لماذا نحن ؟
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl font-semibold"
                style={{ color: '#BA5183' }}
              >
                خدمات عالية الجودة
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl leading-relaxed text-black"
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

      {/* About Company Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto" dir="rtl">
            {/* Section Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8"
              style={{ color: '#382A67' }}
            >
              من نحن
            </motion.h2>

            {/* Main Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-10"
            >
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-center">
                <span className="font-bold" style={{ color: '#BA5183' }}>مؤسسة حلول الوسام للتجارة</span> هي مؤسسة سعودية متخصصة في تقديم الحلول التقنية والأنظمة الأمنية والبرمجية المحاسبية. يقع مقرها الرئيسي في مدينة <span className="font-semibold">جدة</span>، وتحديداً في حي الشرفية بشارع خالد بن الوليد.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-center mt-4">
                بدأت نشاطات وخدمات المؤسسة في عام <span className="font-bold" style={{ color: '#382A67' }}>2022</span> وتشمل:
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Service 1: الأنظمة البرمجية والمحاسبية */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4"
                style={{ borderColor: '#BA5183' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BA5183' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#382A67' }}>الأنظمة البرمجية والمحاسبية</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  توفر برامج مالية ومحاسبية متكاملة لإدارة المؤسسات
                </p>
              </motion.div>

              {/* Service 2: الأنظمة الأمنية */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4"
                style={{ borderColor: '#382A67' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#382A67' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#382A67' }}>الأنظمة الأمنية</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  بيع وتركيب كاميرات المراقبة، وأجهزة الحضور والانصراف
                </p>
              </motion.div>

              {/* Service 3: تجهيزات نقاط البيع */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4"
                style={{ borderColor: '#BA5183' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BA5183' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#382A67' }}>تجهيزات نقاط البيع (POS)</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  توفر أجهزة الكاشير، قارئ الباركود، والطابعات الحرارية
                </p>
              </motion.div>

              {/* Service 4: شبكات الحاسب والاتصالات */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4"
                style={{ borderColor: '#382A67' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#382A67' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#382A67' }}>شبكات الحاسب والاتصالات</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  تقديم حلول الشبكات (مثل السويتشات) وأجهزة الكمبيوتر ومستلزماتها
                </p>
              </motion.div>

              {/* Service 5: خدمات الصيانة والتركيب */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4"
                style={{ borderColor: '#BA5183' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BA5183' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#382A67' }}>خدمات الصيانة والتركيب</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  توفر المؤسسة خدمات الدعم الفني والتركيب الميداني لجميع الأجهزة والأنظمة التي تقدمها
                </p>
              </motion.div>
            </div>

            {/* Certification Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-2xl p-6 md:p-8 text-center"
              style={{ background: 'linear-gradient(135deg, #382A67, #BA5183)' }}
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white text-lg md:text-xl font-semibold">
                  المؤسسة مسجلة وموثقة لدى <span className="font-bold">وزارة التجارة السعودية</span> ومنصة الأعمال لضمان موثوقية التعاملات التجارية
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ backgroundColor: '#382A67' }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Floating Symbol */}
          <motion.div
            initial={{ opacity: 0, y: -30, rotate: 0 }}
            whileInView={{ opacity: 0.15, y: 0, rotate: 360 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute top-10 left-10 text-6xl md:text-8xl"
            style={{ color: '#BA5183' }}
          >
            ✦
          </motion.div>

          {/* Top Right Floating Symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-20 right-20 text-5xl md:text-7xl text-white"
          >
            ◆
          </motion.div>

          {/* Bottom Left Floating Symbol */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 0.12, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.3 }}
            className="absolute bottom-16 left-1/4 text-4xl md:text-6xl"
            style={{ color: '#BA5183' }}
          >
            ◇
          </motion.div>

          {/* Bottom Right Floating Symbol */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4 }}
            className="absolute bottom-20 right-1/3 text-5xl md:text-7xl text-white"
          >
            ✧
          </motion.div>

          {/* Center Large Symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl md:text-[200px] text-white"
          >
            ◈
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8" dir="rtl">
            {/* CTA Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              اكتشف منتجاتنا المميزة
            </motion.h2>

            {/* CTA Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              تصفح مجموعتنا الواسعة من الحلول الأمنية والتقنية المتطورة
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: '#BA5183',
                  color: 'white'
                }}
              >
                {/* Text - fades out on hover */}
                <span className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                  تسوق الآن
                </span>
                
                {/* Arrow - fades out on hover */}
                <motion.svg
                  initial={{ x: 0 }}
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-6 h-6 transition-all duration-300 group-hover:opacity-0 group-hover:scale-75"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </motion.svg>

                {/* Shopping Cart Icon - fades in on hover */}
                <svg
                  className="absolute inset-0 m-auto w-8 h-8 md:w-10 md:h-10 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto" dir="rtl">
            {/* Section Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
              style={{ color: '#382A67' }}
            >
              تواصل معنا
            </motion.h2>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/966594013037"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <div>
                    <p className="text-white font-bold text-lg">واتساب</p>
                    <p className="text-white/90 text-xl font-semibold mt-1">0594013037</p>
                  </div>
                </div>
              </motion.a>

              {/* Phone 1 */}
              <motion.a
                href="tel:+966594013037"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #382A67, #BA5183)' }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-white font-bold text-lg">جوال</p>
                    <p className="text-white/90 text-xl font-semibold mt-1">0594013037</p>
                  </div>
                </div>
              </motion.a>

              {/* Phone 2 */}
              <motion.a
                href="tel:+966550887101"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #BA5183, #382A67)' }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-white font-bold text-lg">جوال</p>
                    <p className="text-white/90 text-xl font-semibold mt-1">0550887101</p>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto" dir="rtl">
            {/* Section Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
              style={{ color: '#382A67' }}
            >
              موقعنا
            </motion.h2>

            {/* Map Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ height: '500px' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.2976891234567!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مؤسسة الوسام"
              />
              
              {/* Open in Google Maps Button */}
              <motion.a
                href="https://maps.app.goo.gl/33LXuv6PmCnhqjo57?g_st=iwb"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                style={{ backgroundColor: '#BA5183' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                افتح في خرائط جوجل
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

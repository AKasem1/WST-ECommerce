'use client';

import { motion } from 'framer-motion';

const privacyPoints = [
  {
    title: 'جمع المعلومات',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: 'تقوم المؤسسة بجمع البيانات الشخصية الضرورية لتقديم الخدمات، مثل الاسم، رقم الهاتف، وعنوان البريد الإلكتروني عند التواصل أو طلب خدمة.',
  },
  {
    title: 'استخدام البيانات',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description: 'تُستخدم المعلومات لتحسين تجربة المستخدم، الرد على الاستفسارات، إتمام عمليات الشراء، وتقديم الدعم الفني للأنظمة الأمنية والبرمجية.',
  },
  {
    title: 'حماية البيانات',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: 'تتخذ المؤسسة تدابير أمنية وتقنية لمنع الوصول غير المصرح به للبيانات أو فقدانها، مع التأكيد على عدم مشاركة هذه البيانات مع أطراف ثالثة لأغراض تسويقية مستقلة.',
  },
  {
    title: 'حقوق المستخدم',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    description: 'يحق للعميل الوصول إلى بياناته الشخصية، وطلب تصحيحها أو حذفها من خلال قنوات التواصل الرسمية للمؤسسة.',
  },
  {
    title: 'ملفات تعريف الارتباط (Cookies)',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    description: 'قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تصفح الموقع، ويتاح للمستخدم خيار تعطيلها عبر إعدادات المتصفح.',
  },
  {
    title: 'الإفصاح القانوني',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    description: 'تحتفظ المؤسسة بالحق في الإفصاح عن المعلومات فقط في حال كان ذلك مطلوباً بموجب القانون أو لحماية حقوق الملكية الخاصة بها.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: '#382A67' }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.15, rotate: 360 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute top-10 left-10 text-6xl md:text-8xl"
            style={{ color: '#BA5183' }}
          >
            ✦
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-20 right-20 text-5xl md:text-7xl text-white"
          >
            ◆
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl md:text-[200px] text-white"
          >
            ◈
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center" dir="rtl">
            {/* Shield Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#BA5183' }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              سياسة الخصوصية
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '150px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 mx-auto"
              style={{
                background: 'linear-gradient(to left, #BA5183, white)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
            dir="rtl"
          >
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              تلتزم <span className="font-bold" style={{ color: '#BA5183' }}>مؤسسة حلول الوسام للتجارة</span> في عام 2026 بحماية بيانات عملائها وفقاً للأنظمة المعمول بها في المملكة العربية السعودية، وتتلخص ملامح سياسة الخصوصية الخاصة بها في النقاط التالية:
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Points */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-r-4"
                  style={{ borderColor: index % 2 === 0 ? '#BA5183' : '#382A67' }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: index % 2 === 0 ? '#BA5183' : '#382A67' }}
                    >
                      {point.icon}
                    </div>
                    <div>
                      <h3 
                        className="text-xl font-bold mb-3"
                        style={{ color: '#382A67' }}
                      >
                        {point.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PDPL Compliance Notice */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 text-center"
            dir="rtl"
            style={{ background: 'linear-gradient(135deg, #382A67, #BA5183)' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-white text-lg md:text-xl font-semibold">
                تخضع هذه السياسة للتحديثات الدورية لضمان توافقها مع <span className="font-bold">نظام حماية البيانات الشخصية السعودي (PDPL)</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-500"
            dir="rtl"
          >
            آخر تحديث: يناير 2026
          </motion.p>
        </div>
      </section>
    </main>
  );
}

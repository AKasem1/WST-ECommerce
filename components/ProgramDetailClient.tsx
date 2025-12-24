'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ProgramResponse } from '@/types/program';

interface ProgramDetailClientProps {
  program: ProgramResponse;
}

export default function ProgramDetailClient({ program }: ProgramDetailClientProps) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Program Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={program.programImage}
                  alt={program.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Program Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
                    {program.name}
                  </h1>
                  {program.nameEn && (
                    <p className="text-xl text-purple-200">{program.nameEn}</p>
                  )}
                </div>

                {program.shortDescription && (
                  <p className="text-lg text-purple-100">{program.shortDescription}</p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  <span className={`px-4 py-2 rounded-full font-bold ${
                    program.isFree ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {program.isFree ? 'مجاني' : 'مدفوع'}
                  </span>
                  {program.supportsOffline && (
                    <span className="px-4 py-2 rounded-full bg-yellow-500 text-gray-900 font-bold">
                      يعمل بدون إنترنت
                    </span>
                  )}
                  {program.visibility && (
                    <span className="px-4 py-2 rounded-full bg-purple-500 font-bold">
                      متاح الآن
                    </span>
                  )}
                </div>

                {/* Platforms */}
                {program.platforms && program.platforms.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-purple-200 mb-2">المنصات المدعومة:</h3>
                    <div className="flex flex-wrap gap-2">
                      {program.platforms.map((platform, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/20 rounded-lg text-sm">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download/Demo Links */}
                <div className="flex flex-wrap gap-4">
                  {program.downloadLink && (
                    <a
                      href={program.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white text-purple-900 rounded-lg font-bold hover:bg-purple-100 transition-colors"
                    >
                      تحميل البرنامج
                    </a>
                  )}
                  {program.demoLink && (
                    <a
                      href={program.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
                    >
                      تجربة مجانية
                    </a>
                  )}
                  {program.documentationLink && (
                    <a
                      href={program.documentationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
                    >
                      الدليل الإرشادي
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Full Description */}
            {program.fullDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#382A67' }}>
                  نبذة عن البرنامج
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {program.fullDescription}
                </p>
              </motion.div>
            )}

            {/* Main Features */}
            {program.mainFeatures && program.mainFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#382A67' }}>
                  المميزات الرئيسية
                </h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {program.mainFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Supported Activities */}
            {program.supportedActivities && program.supportedActivities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#382A67' }}>
                  الأنشطة المدعومة
                </h2>
                <div className="flex flex-wrap gap-3">
                  {program.supportedActivities.map((activity, idx) => (
                    <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg font-semibold">
                      {activity}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* System Requirements */}
            {program.systemRequirements && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#382A67' }}>
                  متطلبات التشغيل
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {program.systemRequirements.os && program.systemRequirements.os.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">أنظمة التشغيل:</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {program.systemRequirements.os.map((os, idx) => (
                          <li key={idx}>{os}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {program.systemRequirements.processor && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">المعالج:</h3>
                      <p className="text-gray-700">{program.systemRequirements.processor}</p>
                    </div>
                  )}
                  {program.systemRequirements.ram && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">الذاكرة (RAM):</h3>
                      <p className="text-gray-700">{program.systemRequirements.ram}</p>
                    </div>
                  )}
                  {program.systemRequirements.storage && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">التخزين:</h3>
                      <p className="text-gray-700">{program.systemRequirements.storage}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Pricing */}
            {!program.isFree && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#382A67' }}>
                  التسعير
                </h2>
                {program.basePrice && (
                  <div className="text-4xl font-bold text-purple-900 mb-4">
                    ${program.basePrice}
                  </div>
                )}
                {program.hasSubscription && program.subscriptionPackages && program.subscriptionPackages.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {program.subscriptionPackages.map((pkg, idx) => (
                      <div key={idx} className="border-2 border-purple-200 rounded-lg p-4">
                        <h4 className="font-bold text-lg mb-2">{pkg.name}</h4>
                        <p className="text-3xl font-bold text-purple-900 mb-2">${pkg.price}</p>
                        <p className="text-sm text-gray-600">{pkg.duration}</p>
                        {pkg.features && (
                          <ul className="mt-4 space-y-2 text-sm">
                            {pkg.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Back Button */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-purple-900 text-white rounded-lg font-bold hover:bg-purple-800 transition-colors"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

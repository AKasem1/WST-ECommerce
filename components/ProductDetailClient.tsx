'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ProductResponse } from '@/types/product';

interface ProductDetailClientProps {
  product: ProductResponse;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const handleWhatsApp = () => {
    const specs = product.productSpecs?.join('\n') || '';
    const message = `مرحباً، أنا مهتم بالمنتج: ${product.modelNumber}\n${specs}\nالسعر: ${product.price} ر.س`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={product.productImage}
                  alt={product.modelNumber}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
                    {product.modelNumber}
                  </h1>
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-pink-300">
                  {product.price.toFixed(2)} ر.س
                </div>

                {/* Badges - Stacked on the right */}
                <div className="flex flex-col items-start gap-3">
                  {/* Stock Badge */}
                  <span className={`px-6 py-3 rounded-full font-bold text-lg ${
                    product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {product.quantity > 0 ? `متوفر (${product.quantity} قطعة)` : 'غير متوفر'}
                  </span>

                  {/* Visibility Badge */}
                  {product.visibility && (
                    <span className="px-6 py-3 rounded-full bg-purple-500 font-bold text-lg">
                      متاح للبيع
                    </span>
                  )}
                </div>

                {/* WhatsApp Button - Full Width */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  تواصل عبر واتساب
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Product Specifications */}
            {product.productSpecs && product.productSpecs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#382A67' }}>
                  مواصفات المنتج
                </h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {product.productSpecs.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#382A67' }}>
                تفاصيل المنتج
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">رقم الموديل:</h3>
                  <p className="text-gray-700">{product.modelNumber}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">السعر:</h3>
                  <p className="text-2xl font-bold" style={{ color: '#BA5183' }}>
                    {product.price.toFixed(2)} ر.س
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">الكمية المتوفرة:</h3>
                  <p className="text-gray-700">{product.quantity} قطعة</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">الحالة:</h3>
                  <p className={`font-bold ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.quantity > 0 ? 'متوفر' : 'غير متوفر'}
                  </p>
                </div>
              </div>
            </motion.div>

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

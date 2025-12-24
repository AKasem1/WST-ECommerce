'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/swiper-custom.css';
import type { ProductResponse } from '@/types/product';

export default function ProductsSection() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=10');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWhatsApp = (product: ProductResponse) => {
    const specs = product.productSpecs?.join('\n') || '';
    const message = `مرحباً، أنا مهتم بالمنتج: ${product.modelNumber}\n${specs}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
    <section className="py-20 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#382A67' }}
          >
            منتجاتنا
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            اكتشف أحدث منتجاتنا وحلولنا التقنية
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id}>
                <Link href={`/products/${product.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 my-10 mx-2 cursor-pointer"
                  >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={product.productImage}
                      alt={product.modelNumber}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    {/* Model Number */}
                    <h3
                      className="font-bold text-lg truncate"
                      style={{ color: '#382A67' }}
                    >
                      {product.modelNumber}
                    </h3>

                    {/* Specs */}
                    <div className="text-sm text-gray-600 min-h-[40px]">
                      {product.productSpecs && product.productSpecs.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {product.productSpecs.slice(0, 2).map((spec, idx) => (
                            <li key={idx} className="line-clamp-1">{spec}</li>
                          ))}
                          {product.productSpecs.length > 2 && (
                            <li className="text-gray-400 text-xs">+{product.productSpecs.length - 2} المزيد</li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-gray-400">لا توجد مواصفات</p>
                      )}
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <div>
                        <span
                          className="text-2xl font-bold"
                          style={{ color: '#BA5183' }}
                        >
                          {product.price.toFixed(2)} ر.س
                        </span>
                      </div>

                      {/* Stock Badge */}
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.quantity > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.quantity > 0 ? `متوفر (${product.quantity})` : 'غير متوفر'}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleWhatsApp(product);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all duration-300"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span>تواصل عبر واتساب</span>
                    </motion.button>
                  </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#382A67' }}
          >
            <span>المزيد</span>
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

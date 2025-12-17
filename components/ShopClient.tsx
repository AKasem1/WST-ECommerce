'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import type { ProductResponse } from '@/types/product';
import type { CategoryResponse } from '@/types/category-api';

interface ShopClientProps {
  initialProducts: ProductResponse[];
  initialCategories: CategoryResponse[];
  initialTotal: number;
}

export default function ShopClient({
  initialProducts,
  initialCategories,
  initialTotal,
}: ShopClientProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [products, setProducts] = useState<ProductResponse[]>(initialProducts);
  const [categories] = useState<CategoryResponse[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(initialTotal);
  const [totalAllProducts, setTotalAllProducts] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setCurrentPage(1);
    } else if (!categoryFromUrl && selectedCategory !== 'all') {
      setSelectedCategory('all');
      setCurrentPage(1);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory !== 'all' ? `&categoryId=${selectedCategory}` : '';
      const response = await fetch(
        `/api/products?page=${currentPage}&limit=${productsPerPage}${categoryParam}`
      );
      const data = await response.json();
      setProducts(data.products || []);
      setTotalProducts(data.pagination?.total || 0);
      
      // If filtering by category, fetch total count of all products separately
      if (selectedCategory !== 'all' && currentPage === 1) {
        const allProductsResponse = await fetch('/api/products?page=1&limit=1');
        const allProductsData = await allProductsResponse.json();
        setTotalAllProducts(allProductsData.pagination?.total || 0);
      } else if (selectedCategory === 'all') {
        setTotalAllProducts(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleWhatsApp = (product: ProductResponse) => {
    const message = `مرحباً، أنا مهتم بالمنتج: ${product.modelNumber}\n${product.productDescription}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#382A67' }}>
            المتجر
          </h1>
          <p className="text-lg text-gray-600">
            تصفح جميع منتجاتنا وحلولنا التقنية
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Category Filter */}
          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-64 shrink-0"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#382A67' }}>
                التصنيفات
              </h2>
              <div className="space-y-2">
                {/* All Products */}
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === 'all' ? '#382A67' : 'transparent',
                  }}
                >
                  جميع المنتجات ({totalAllProducts})
                </button>

                {/* Category List */}
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category._id)}
                    className={`w-full text-right px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === category._id
                        ? 'text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === category._id ? '#382A67' : 'transparent',
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Main Content - Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <p className="text-xl text-gray-600">لا توجد منتجات في هذا التصنيف</p>
              </motion.div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
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
                        <h3 className="font-bold text-lg truncate" style={{ color: '#382A67' }}>
                          {product.modelNumber}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                          {product.productDescription}
                        </p>

                        {/* Price and Stock */}
                        <div className="flex items-center justify-between">
                          {/* MSRP Price */}
                          <div>
                            <span className="text-2xl font-bold" style={{ color: '#BA5183' }}>
                              {product.msrpPrice.toFixed(2)} ر.س
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
                            {product.quantity > 0
                              ? `متوفر (${product.quantity})`
                              : 'غير متوفر'}
                          </div>
                        </div>

                        {/* WhatsApp Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleWhatsApp(product)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all duration-300"
                          style={{ backgroundColor: '#25D366' }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span>تواصل عبر واتساب</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center items-center gap-2 flex-wrap"
                  >
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: currentPage === 1 ? '#E5E7EB' : '#382A67',
                        color: currentPage === 1 ? '#9CA3AF' : 'white',
                      }}
                    >
                      السابق
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                          currentPage === page ? 'text-white' : 'text-gray-700 hover:bg-gray-200'
                        }`}
                        style={{
                          backgroundColor: currentPage === page ? '#382A67' : 'white',
                        }}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: currentPage === totalPages ? '#E5E7EB' : '#382A67',
                        color: currentPage === totalPages ? '#9CA3AF' : 'white',
                      }}
                    >
                      التالي
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

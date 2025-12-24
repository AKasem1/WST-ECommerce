'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import ConfirmDialog from './ConfirmDialog';
import imgUpload from '@/lib/imageUpload/imgUpload';
import type { ProductResponse } from '@/types/product';
import type { CategoryResponse } from '@/types/category-api';

interface ProductsClientProps {
  initialProducts: ProductResponse[];
  categories: CategoryResponse[];
}

export default function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [products, setProducts] = useState<ProductResponse[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    modelNumber: '',
    productSpecs: [''],
    quantity: '',
    price: '',
    categoryId: '',
    productImage: '',
    visibility: true,
  });

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productSpecs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !categoryFilter || product.categoryId.toString() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      modelNumber: '',
      productSpecs: [''],
      quantity: '',
      price: '',
      categoryId: '',
      productImage: '',
      visibility: true,
    });
    setImageFile(null);
    setImagePreview('');
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle create
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.productImage;

      // Upload image if selected
      if (imageFile) {
        const uploadedUrl = await imgUpload(imageFile);
        if (!uploadedUrl) {
          alert('فشل في رفع الصورة');
          setIsLoading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: [
            {
              modelNumber: formData.modelNumber,
              productImage: imageUrl,
              productSpecs: formData.productSpecs.filter(spec => spec.trim() !== ''),
              quantity: parseInt(formData.quantity),
              price: parseFloat(formData.price),
              categoryId: formData.categoryId,
              visibility: formData.visibility,
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok && data.created.length > 0) {
        setProducts([...products, data.created[0]]);
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        alert(data.failed?.[0]?.error || 'فشل في إنشاء المنتج');
      }
    } catch (error) {
      alert('حدث خطأ أثناء إنشاء المنتج');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setIsLoading(true);

    try {
      let imageUrl = formData.productImage;

      // Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await imgUpload(imageFile);
        if (!uploadedUrl) {
          alert('فشل في رفع الصورة');
          setIsLoading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const response = await fetch(`/api/products/${selectedProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelNumber: formData.modelNumber,
          productImage: imageUrl,
          productSpecs: formData.productSpecs.filter(spec => spec.trim() !== ''),
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
          categoryId: formData.categoryId,
          visibility: formData.visibility,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setProducts(products.map((p) => (p._id === updated._id ? updated : p)));
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || 'فشل في تحديث المنتج');
      }
    } catch (error) {
      alert('حدث خطأ أثناء تحديث المنتج');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedProduct) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/products/${selectedProduct._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== selectedProduct._id));
        setIsDeleteDialogOpen(false);
        setSelectedProduct(null);
      } else {
        alert('فشل في حذف المنتج');
      }
    } catch (error) {
      alert('حدث خطأ أثناء حذف المنتج');
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (product: ProductResponse) => {
    setSelectedProduct(product);
    setFormData({
      modelNumber: product.modelNumber,
      productSpecs: product.productSpecs.length > 0 ? product.productSpecs : [''],
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      categoryId: product.categoryId.toString(),
      productImage: product.productImage,
      visibility: product.visibility,
    });
    setImagePreview(product.productImage);
    setIsEditModalOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (product: ProductResponse) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Get category name
  const getCategoryName = (categoryId: any) => {
    const category = categories.find((c) => c._id === categoryId.toString());
    return category?.name || 'غير محدد';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between" dir="rtl">
        <h1 className="text-3xl font-bold text-gray-900">إدارة المنتجات</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          إضافة منتج جديد
        </motion.button>
      </div>

      {/* Filters */}
      {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
          >
            <option value="">جميع الفئات</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" dir="rtl">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الصورة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  رقم الموديل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  المواصفات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الفئة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الكمية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  السعر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    لا توجد منتجات
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={product.productImage}
                        alt={product.modelNumber}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.modelNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      <ul className="list-disc list-inside space-y-1">
                        {product.productSpecs.slice(0, 2).map((spec, idx) => (
                          <li key={idx} className="truncate">{spec}</li>
                        ))}
                        {product.productSpecs.length > 2 && (
                          <li className="text-gray-400">+{product.productSpecs.length - 2} المزيد</li>
                        )}
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getCategoryName(product.categoryId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.visibility ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.visibility ? 'ظاهر' : 'مخفي'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => openDeleteDialog(product)}
                          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="إضافة منتج جديد"
      >
        <form onSubmit={handleCreate} className="space-y-4" dir="rtl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الموديل
            </label>
            <input
              type="text"
              required
              value={formData.modelNumber}
              onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المواصفات
            </label>
            <div className="space-y-2">
              {formData.productSpecs.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required={index === 0}
                    value={spec}
                    onChange={(e) => {
                      const newSpecs = [...formData.productSpecs];
                      newSpecs[index] = e.target.value;
                      setFormData({ ...formData, productSpecs: newSpecs });
                    }}
                    placeholder={`مواصفة ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newSpecs = formData.productSpecs.filter((_, i) => i !== index);
                        setFormData({ ...formData, productSpecs: newSpecs });
                      }}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      حذف
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, productSpecs: [...formData.productSpecs, ''] })}
                className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + إضافة مواصفة
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الصورة
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الكمية
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الفئة
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              >
                <option value="">اختر الفئة</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحالة
              </label>
              <div className="flex items-center h-full">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visibility}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-700">ظاهر للعملاء</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'جاري الإنشاء...' : 'إنشاء'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
          resetForm();
        }}
        title="تعديل المنتج"
      >
        <form onSubmit={handleEdit} className="space-y-4" dir="rtl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الموديل
            </label>
            <input
              type="text"
              required
              value={formData.modelNumber}
              onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المواصفات
            </label>
            <div className="space-y-2">
              {formData.productSpecs.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required={index === 0}
                    value={spec}
                    onChange={(e) => {
                      const newSpecs = [...formData.productSpecs];
                      newSpecs[index] = e.target.value;
                      setFormData({ ...formData, productSpecs: newSpecs });
                    }}
                    placeholder={`مواصفة ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newSpecs = formData.productSpecs.filter((_, i) => i !== index);
                        setFormData({ ...formData, productSpecs: newSpecs });
                      }}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      حذف
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, productSpecs: [...formData.productSpecs, ''] })}
                className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + إضافة مواصفة
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الصورة
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الكمية
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الفئة
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              >
                <option value="">اختر الفئة</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحالة
              </label>
              <div className="flex items-center h-full">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visibility}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-700">ظاهر للعملاء</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedProduct(null);
                resetForm();
              }}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'جاري التحديث...' : 'تحديث'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
        title="حذف المنتج"
        message={`هل أنت متأكد من حذف المنتج "${selectedProduct?.modelNumber}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        isLoading={isLoading}
      />
    </div>
  );
}

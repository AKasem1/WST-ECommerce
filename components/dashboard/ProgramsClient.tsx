'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import ConfirmDialog from './ConfirmDialog';
import imgUpload from '@/lib/imageUpload/imgUpload';
import type { ProgramResponse, ISubscriptionPackage, ISystemRequirements } from '@/types/program';
import type { CategoryResponse } from '@/types/category-api';

interface ProgramsClientProps {
  initialPrograms: ProgramResponse[];
  categories: CategoryResponse[];
}

const platformOptions = ['Windows', 'Android', 'iOS', 'macOS', 'Linux', 'Web'];

export default function ProgramsClient({ initialPrograms, categories }: ProgramsClientProps) {
  const [programs, setPrograms] = useState<ProgramResponse[]>(initialPrograms);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    programImage: '',
    shortDescription: '',
    fullDescription: '',
    mainFeatures: [''],
    supportedActivities: [''],
    systemRequirements: {
      os: [''],
      processor: '',
      ram: '',
      storage: '',
      additionalNotes: '',
    } as ISystemRequirements,
    platforms: [] as string[],
    isFree: true,
    basePrice: '',
    hasSubscription: false,
    subscriptionPackages: [] as ISubscriptionPackage[],
    supportsOffline: false,
    categoryId: '',
    visibility: true,
    downloadLink: '',
    demoLink: '',
    documentationLink: '',
    supportedLanguages: ['العربية'],
    version: '',
  });

  // Filter programs
  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (program.nameEn && program.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (program.shortDescription && program.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      nameEn: '',
      programImage: '',
      shortDescription: '',
      fullDescription: '',
      mainFeatures: [''],
      supportedActivities: [''],
      systemRequirements: {
        os: [''],
        processor: '',
        ram: '',
        storage: '',
        additionalNotes: '',
      },
      platforms: [],
      isFree: true,
      basePrice: '',
      hasSubscription: false,
      subscriptionPackages: [],
      supportsOffline: false,
      categoryId: '',
      visibility: true,
      downloadLink: '',
      demoLink: '',
      documentationLink: '',
      supportedLanguages: ['العربية'],
      version: '',
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
      let imageUrl = formData.programImage;

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

      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programs: [
            {
              name: formData.name,
              nameEn: formData.nameEn || undefined,
              programImage: imageUrl,
              shortDescription: formData.shortDescription || undefined,
              fullDescription: formData.fullDescription || undefined,
              mainFeatures: formData.mainFeatures.filter(f => f.trim() !== ''),
              supportedActivities: formData.supportedActivities.filter(a => a.trim() !== ''),
              systemRequirements: {
                os: formData.systemRequirements.os.filter(o => o.trim() !== ''),
                processor: formData.systemRequirements.processor || undefined,
                ram: formData.systemRequirements.ram || undefined,
                storage: formData.systemRequirements.storage || undefined,
                additionalNotes: formData.systemRequirements.additionalNotes || undefined,
              },
              platforms: formData.platforms,
              isFree: formData.isFree,
              basePrice: formData.basePrice ? parseFloat(formData.basePrice) : undefined,
              hasSubscription: formData.hasSubscription,
              subscriptionPackages: formData.subscriptionPackages,
              supportsOffline: formData.supportsOffline,
              categoryId: formData.categoryId || undefined,
              visibility: formData.visibility,
              downloadLink: formData.downloadLink || undefined,
              demoLink: formData.demoLink || undefined,
              documentationLink: formData.documentationLink || undefined,
              supportedLanguages: formData.supportedLanguages,
              version: formData.version || undefined,
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok && data.created.length > 0) {
        setPrograms([...programs, data.created[0]]);
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        alert(data.failed?.[0]?.error || 'فشل في إنشاء البرنامج');
      }
    } catch (error) {
      alert('حدث خطأ أثناء إنشاء البرنامج');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    setIsLoading(true);

    try {
      let imageUrl = formData.programImage;

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

      const response = await fetch(`/api/programs/${selectedProgram._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          nameEn: formData.nameEn || undefined,
          programImage: imageUrl,
          shortDescription: formData.shortDescription || undefined,
          fullDescription: formData.fullDescription || undefined,
          mainFeatures: formData.mainFeatures.filter(f => f.trim() !== ''),
          supportedActivities: formData.supportedActivities.filter(a => a.trim() !== ''),
          systemRequirements: {
            os: formData.systemRequirements.os.filter(o => o.trim() !== ''),
            processor: formData.systemRequirements.processor || undefined,
            ram: formData.systemRequirements.ram || undefined,
            storage: formData.systemRequirements.storage || undefined,
            additionalNotes: formData.systemRequirements.additionalNotes || undefined,
          },
          platforms: formData.platforms,
          isFree: formData.isFree,
          basePrice: formData.basePrice ? parseFloat(formData.basePrice) : undefined,
          hasSubscription: formData.hasSubscription,
          subscriptionPackages: formData.subscriptionPackages,
          supportsOffline: formData.supportsOffline,
          categoryId: formData.categoryId || undefined,
          visibility: formData.visibility,
          downloadLink: formData.downloadLink || undefined,
          demoLink: formData.demoLink || undefined,
          documentationLink: formData.documentationLink || undefined,
          supportedLanguages: formData.supportedLanguages,
          version: formData.version || undefined,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setPrograms(programs.map((p) => (p._id === updated._id ? updated : p)));
        setIsEditModalOpen(false);
        setSelectedProgram(null);
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || 'فشل في تحديث البرنامج');
      }
    } catch (error) {
      alert('حدث خطأ أثناء تحديث البرنامج');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedProgram) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/programs/${selectedProgram._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPrograms(programs.filter((p) => p._id !== selectedProgram._id));
        setIsDeleteDialogOpen(false);
        setSelectedProgram(null);
      } else {
        alert('فشل في حذف البرنامج');
      }
    } catch (error) {
      alert('حدث خطأ أثناء حذف البرنامج');
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (program: ProgramResponse) => {
    setSelectedProgram(program);
    setFormData({
      name: program.name,
      nameEn: program.nameEn || '',
      programImage: program.programImage,
      shortDescription: program.shortDescription || '',
      fullDescription: program.fullDescription || '',
      mainFeatures: program.mainFeatures && program.mainFeatures.length > 0 ? program.mainFeatures : [''],
      supportedActivities: program.supportedActivities && program.supportedActivities.length > 0 ? program.supportedActivities : [''],
      systemRequirements: program.systemRequirements || {
        os: [''],
        processor: '',
        ram: '',
        storage: '',
        additionalNotes: '',
      },
      platforms: program.platforms || [],
      isFree: program.isFree,
      basePrice: program.basePrice?.toString() || '',
      hasSubscription: program.hasSubscription,
      subscriptionPackages: program.subscriptionPackages || [],
      supportsOffline: program.supportsOffline,
      categoryId: program.categoryId?.toString() || '',
      visibility: program.visibility,
      downloadLink: program.downloadLink || '',
      demoLink: program.demoLink || '',
      documentationLink: program.documentationLink || '',
      supportedLanguages: program.supportedLanguages || ['العربية'],
      version: program.version || '',
    });
    setImagePreview(program.programImage);
    setIsEditModalOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (program: ProgramResponse) => {
    setSelectedProgram(program);
    setIsDeleteDialogOpen(true);
  };

  // Get category name
  const getCategoryName = (categoryId: any) => {
    const category = categories.find((c) => c._id === categoryId?.toString());
    return category?.name || 'غير محدد';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between" dir="rtl">
        <h1 className="text-3xl font-bold text-gray-900">إدارة البرامج</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          إضافة برنامج جديد
        </motion.button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <input
          type="text"
          placeholder="ابحث عن برنامج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir="rtl"
        />
      </div>

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
                  الاسم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  المنصات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  النوع
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
              {filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    لا توجد برامج
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((program) => (
                  <tr key={program._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={program.programImage}
                        alt={program.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{program.name}</div>
                      {program.nameEn && (
                        <div className="text-xs text-gray-500">{program.nameEn}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {program.platforms && program.platforms.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {program.platforms.slice(0, 2).map((platform, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {platform}
                            </span>
                          ))}
                          {program.platforms.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                              +{program.platforms.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        program.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {program.isFree ? 'مجاني' : 'مدفوع'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {program.isFree ? (
                        'مجاني'
                      ) : program.hasSubscription ? (
                        'اشتراك'
                      ) : program.basePrice ? (
                        `$${program.basePrice}`
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        program.visibility ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {program.visibility ? 'ظاهر' : 'مخفي'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(program)}
                          className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => openDeleteDialog(program)}
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
        title="إضافة برنامج جديد"
      >
        <form onSubmit={handleCreate} className="space-y-4 max-h-[80vh] overflow-y-auto" dir="rtl">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم البرنامج (عربي)
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم البرنامج (English)
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
          </div>

          {/* Image */}
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

          {/* Descriptions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وصف مختصر
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              rows={2}
              maxLength={500}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الوصف الكامل
            </label>
            <textarea
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              rows={4}
            />
          </div>

          {/* Main Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المميزات الرئيسية
            </label>
            <div className="space-y-2">
              {formData.mainFeatures.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.mainFeatures];
                      newFeatures[index] = e.target.value;
                      setFormData({ ...formData, mainFeatures: newFeatures });
                    }}
                    placeholder={`ميزة ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = formData.mainFeatures.filter((_, i) => i !== index);
                        setFormData({ ...formData, mainFeatures: newFeatures });
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
                onClick={() => setFormData({ ...formData, mainFeatures: [...formData.mainFeatures, ''] })}
                className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + إضافة ميزة
              </button>
            </div>
          </div>

          {/* Supported Activities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الأنشطة المدعومة
            </label>
            <div className="space-y-2">
              {formData.supportedActivities.map((activity, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => {
                      const newActivities = [...formData.supportedActivities];
                      newActivities[index] = e.target.value;
                      setFormData({ ...formData, supportedActivities: newActivities });
                    }}
                    placeholder={`نشاط ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newActivities = formData.supportedActivities.filter((_, i) => i !== index);
                        setFormData({ ...formData, supportedActivities: newActivities });
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
                onClick={() => setFormData({ ...formData, supportedActivities: [...formData.supportedActivities, ''] })}
                className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + إضافة نشاط
              </button>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المنصات المدعومة
            </label>
            <div className="grid grid-cols-3 gap-2">
              {platformOptions.map((platform) => (
                <label key={platform} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, platforms: [...formData.platforms, platform] });
                      } else {
                        setFormData({ ...formData, platforms: formData.platforms.filter(p => p !== platform) });
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* System Requirements */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">متطلبات التشغيل</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  أنظمة التشغيل
                </label>
                <div className="space-y-2">
                  {formData.systemRequirements.os.map((os, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={os}
                        onChange={(e) => {
                          const newOS = [...formData.systemRequirements.os];
                          newOS[index] = e.target.value;
                          setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, os: newOS } });
                        }}
                        placeholder={`نظام ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newOS = formData.systemRequirements.os.filter((_, i) => i !== index);
                            setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, os: newOS } });
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
                    onClick={() => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, os: [...formData.systemRequirements.os, ''] } })}
                    className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                  >
                    + إضافة نظام
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المعالج
                  </label>
                  <input
                    type="text"
                    value={formData.systemRequirements.processor}
                    onChange={(e) => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, processor: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الذاكرة (RAM)
                  </label>
                  <input
                    type="text"
                    value={formData.systemRequirements.ram}
                    onChange={(e) => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, ram: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  التخزين
                </label>
                <input
                  type="text"
                  value={formData.systemRequirements.storage}
                  onChange={(e) => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, storage: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">التسعير</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="mr-2 text-sm text-gray-700">برنامج مجاني</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.supportsOffline}
                  onChange={(e) => setFormData({ ...formData, supportsOffline: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="mr-2 text-sm text-gray-700">يدعم العمل بدون إنترنت</label>
              </div>
            </div>

            {!formData.isFree && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  السعر الأساسي
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
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
          setSelectedProgram(null);
          resetForm();
        }}
        title="تعديل البرنامج"
      >
        <form onSubmit={handleEdit} className="space-y-4 max-h-[80vh] overflow-y-auto" dir="rtl">
          {/* Same fields as Create Modal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم البرنامج (عربي) *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم البرنامج (English)
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وصف مختصر
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              rows={2}
              maxLength={500}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الوصف الكامل
            </label>
            <textarea
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المميزات الرئيسية
            </label>
            <div className="space-y-2">
              {formData.mainFeatures.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.mainFeatures];
                      newFeatures[index] = e.target.value;
                      setFormData({ ...formData, mainFeatures: newFeatures });
                    }}
                    placeholder={`ميزة ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = formData.mainFeatures.filter((_, i) => i !== index);
                        setFormData({ ...formData, mainFeatures: newFeatures });
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
                onClick={() => setFormData({ ...formData, mainFeatures: [...formData.mainFeatures, ''] })}
                className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + إضافة ميزة
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الأنشطة المدعومة
            </label>
            <div className="space-y-2">
              {formData.supportedActivities.map((activity, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => {
                      const newActivities = [...formData.supportedActivities];
                      newActivities[index] = e.target.value;
                      setFormData({ ...formData, supportedActivities: newActivities });
                    }}
                    placeholder={`نشاط ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newActivities = formData.supportedActivities.filter((_, i) => i !== index);
                        setFormData({ ...formData, supportedActivities: newActivities });
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
                onClick={() => setFormData({ ...formData, supportedActivities: [...formData.supportedActivities, ''] })}
                className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + إضافة نشاط
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المنصات المدعومة
            </label>
            <div className="grid grid-cols-3 gap-2">
              {platformOptions.map((platform) => (
                <label key={platform} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, platforms: [...formData.platforms, platform] });
                      } else {
                        setFormData({ ...formData, platforms: formData.platforms.filter(p => p !== platform) });
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">متطلبات التشغيل</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  أنظمة التشغيل
                </label>
                <div className="space-y-2">
                  {formData.systemRequirements.os.map((os, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={os}
                        onChange={(e) => {
                          const newOS = [...formData.systemRequirements.os];
                          newOS[index] = e.target.value;
                          setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, os: newOS } });
                        }}
                        placeholder={`نظام ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newOS = formData.systemRequirements.os.filter((_, i) => i !== index);
                            setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, os: newOS } });
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
                    onClick={() => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, os: [...formData.systemRequirements.os, ''] } })}
                    className="w-full px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                  >
                    + إضافة نظام
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المعالج
                  </label>
                  <input
                    type="text"
                    value={formData.systemRequirements.processor}
                    onChange={(e) => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, processor: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الذاكرة (RAM)
                  </label>
                  <input
                    type="text"
                    value={formData.systemRequirements.ram}
                    onChange={(e) => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, ram: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  التخزين
                </label>
                <input
                  type="text"
                  value={formData.systemRequirements.storage}
                  onChange={(e) => setFormData({ ...formData, systemRequirements: { ...formData.systemRequirements, storage: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">التسعير</h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="mr-2 text-sm text-gray-700">برنامج مجاني</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.supportsOffline}
                  onChange={(e) => setFormData({ ...formData, supportsOffline: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="mr-2 text-sm text-gray-700">يدعم العمل بدون إنترنت</label>
              </div>
            </div>

            {!formData.isFree && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  السعر الأساسي
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedProgram(null);
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
          setSelectedProgram(null);
        }}
        onConfirm={handleDelete}
        title="حذف البرنامج"
        message={`هل أنت متأكد من حذف البرنامج "${selectedProgram?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        isLoading={isLoading}
      />
    </div>
  );
}

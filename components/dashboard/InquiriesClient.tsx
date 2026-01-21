'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { InquiryResponse } from '@/types/inquiry';

interface InquiriesClientProps {
  initialInquiries: InquiryResponse[];
}

export default function InquiriesClient({ initialInquiries }: InquiriesClientProps) {
  const [inquiries] = useState<InquiryResponse[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.includes(searchTerm) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between" dir="rtl">
        <h1 className="text-3xl font-bold text-gray-900">الاستفسارات</h1>
        <div className="text-sm text-gray-600">
          إجمالي الاستفسارات: <span className="font-bold">{inquiries.length}</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <input
          type="text"
          placeholder="ابحث عن استفسار..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir="rtl"
        />
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            لا توجد استفسارات
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <motion.div
              key={inquiry._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              dir="rtl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{inquiry.name}</h3>
                  <p className="text-sm text-gray-600" dir="ltr">{inquiry.phone}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(inquiry.createdAt)}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

// Brand colors
const PRIMARY_COLOR = '#382A67';
const ACCENT_COLOR = '#BA5183';

// Package data
const packages = [
  { id: 'cashier', name: 'إصدار كاشير', icon: '🖥️' },
  { id: 'merchant', name: 'إصدار تاجر', icon: '📦' },
  { id: 'enterprise', name: 'إصدار شركات', icon: '🏢' },
];

// Feature categories and features
const comparisonData = [
  {
    category: 'البيانات الأساسية',
    features: [
      { name: 'بيانات المؤسسة', cashier: true, merchant: true, enterprise: true },
      { name: 'المجموعة الضريبية', cashier: true, merchant: true, enterprise: true },
      { name: 'تعريف البنوك', cashier: false, merchant: true, enterprise: true },
      { name: 'تعريف الخزنة', cashier: false, merchant: true, enterprise: true },
      { name: 'تعريف المخازن', cashier: true, merchant: false, enterprise: true },
      { name: 'تعريف الوحدات', cashier: true, merchant: true, enterprise: true },
      { name: 'تعريف الأصناف', cashier: true, merchant: true, enterprise: true },
      { name: 'تعريف مجموعة الأصناف', cashier: true, merchant: true, enterprise: true },
      { name: 'العيارات', cashier: true, merchant: true, enterprise: true },
      { name: 'تعريف الخدمات', cashier: false, merchant: false, enterprise: true },
      { name: 'تعريف الشركات', cashier: false, merchant: false, enterprise: true },
      { name: 'تعريف الفروع', cashier: false, merchant: false, enterprise: true },
    ],
  },
  {
    category: 'الفواتير',
    features: [
      { name: 'فاتورة المشتريات', cashier: true, merchant: true, enterprise: true },
      { name: 'فاتورة المبيعات', cashier: true, merchant: true, enterprise: true },
      { name: 'مردود المشتريات', cashier: true, merchant: true, enterprise: true },
      { name: 'مردود المبيعات', cashier: true, merchant: true, enterprise: true },
      { name: 'فاتورة عرض سعر', cashier: true, merchant: true, enterprise: true },
      { name: 'فاتورة مبيعات سريعة', cashier: true, merchant: true, enterprise: true },
      { name: 'فاتورة خدمات', cashier: false, merchant: true, enterprise: true },
      { name: 'انتاج', cashier: false, merchant: true, enterprise: true },
      { name: 'طلب شراء', cashier: false, merchant: true, enterprise: true },
      { name: 'مخزون اول المدة', cashier: true, merchant: true, enterprise: true },
    ],
  },
  {
    category: 'التقارير',
    features: [
      { name: 'فواتير حسب نوع الفاتورة', cashier: true, merchant: true, enterprise: true },
      { name: 'فواتير حسب العملاء', cashier: true, merchant: true, enterprise: true },
      { name: 'مبيعات ومشتريات تفصيلية', cashier: true, merchant: true, enterprise: true },
      { name: 'صافي مبيعات وارباح', cashier: true, merchant: true, enterprise: true },
      { name: 'مبيعات ومشتريات موظف', cashier: true, merchant: true, enterprise: true },
    ],
  },
  {
    category: 'المخازن',
    features: [
      { name: 'مطابقة الجرد', cashier: true, merchant: true, enterprise: true },
      { name: 'وارد مخزني', cashier: true, merchant: true, enterprise: true },
      { name: 'صرف مخزني', cashier: true, merchant: true, enterprise: true },
      { name: 'كشف جرد المخازن', cashier: true, merchant: true, enterprise: true },
      { name: 'ارصدة المخزن حتى تاريخ', cashier: true, merchant: true, enterprise: true },
      { name: 'حركة صنف محددة', cashier: true, merchant: true, enterprise: true },
      { name: 'صنف باجمالي الحركات', cashier: true, merchant: true, enterprise: true },
      { name: 'تقرير حركة سيريال', cashier: false, merchant: false, enterprise: true },
      { name: 'تعديل سيريال', cashier: false, merchant: false, enterprise: true },
      { name: 'اصناف وصلت حد الطلب', cashier: false, merchant: false, enterprise: true },
      { name: 'الاصناف التي ستنتهي صلاحيتها', cashier: false, merchant: false, enterprise: true },
    ],
  },
  {
    category: 'عملاء وموردين',
    features: [
      { name: 'بيانات العملاء والموردين', cashier: true, merchant: true, enterprise: true },
      { name: 'ارصدة حسابات العملاء', cashier: false, merchant: true, enterprise: true },
      { name: 'كشف حساب عميل', cashier: true, merchant: true, enterprise: true },
      { name: 'حركة اخر سداد للعملاء', cashier: false, merchant: true, enterprise: true },
      { name: 'كشف حساب عميل مجمع', cashier: false, merchant: true, enterprise: true },
    ],
  },
  {
    category: 'اعدادات النظام',
    features: [
      { name: 'صلاحيات المستخدمين', cashier: true, merchant: true, enterprise: true },
      { name: 'اعدادات شاشة الفاتورة والطباعة', cashier: true, merchant: true, enterprise: true },
      { name: 'اعدادات النسخ الاحتياطي', cashier: true, merchant: true, enterprise: true },
      { name: 'تبديل مستخدم', cashier: true, merchant: true, enterprise: true },
    ],
  },
  {
    category: 'السندات',
    features: [
      { name: 'سند قبض و صرف', cashier: true, merchant: true, enterprise: true },
      { name: 'تقرير سند صرف وقبض', cashier: true, merchant: true, enterprise: true },
      { name: 'سند تحويل', cashier: false, merchant: false, enterprise: true },
    ],
  },
  {
    category: 'شؤون الموظفين',
    features: [
      { name: 'صلاحيات شؤون الموظفين', cashier: false, merchant: true, enterprise: true },
    ],
  },
  {
    category: 'الحسابات',
    features: [
      { name: 'شجرة الحسابات', cashier: false, merchant: true, enterprise: true },
      { name: 'القيود اليومية والإفتتاحية', cashier: false, merchant: true, enterprise: true },
      { name: 'كشف حساب', cashier: false, merchant: true, enterprise: true },
      { name: 'ميزان مراجعة رئيسي وتحليلي', cashier: false, merchant: true, enterprise: true },
      { name: 'ارباح وخسائر حسابات رئيسية وتحليلية', cashier: false, merchant: true, enterprise: true },
      { name: 'ميزان عمومية حسابات رئيسية وتحليلية', cashier: false, merchant: true, enterprise: true },
      { name: 'إقفال السنة المالية', cashier: false, merchant: true, enterprise: true },
      { name: 'مراكز التكلفة', cashier: false, merchant: false, enterprise: true },
      { name: 'تقرير مراكز التكلفة', cashier: false, merchant: false, enterprise: true },
      { name: 'ارصدة حسابات الخزن', cashier: true, merchant: true, enterprise: true },
    ],
  },
];

// Check/X icons
const CheckIcon = () => (
  <svg className="w-6 h-6" style={{ color: ACCENT_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Comparison() {
  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ color: PRIMARY_COLOR }}
          >
            مقارنة الباقات
          </h1>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Row */}
            <div 
              className="grid grid-cols-4 text-white"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <div className="p-4 font-bold text-lg text-center border-l border-white/20 mt-6">
                النموذج
              </div>
              {packages.map((pkg) => (
                <div key={pkg.id} className="p-4 text-center border-l border-white/20 last:border-l-0">
                  <span className="text-2xl mb-2 block">{pkg.icon}</span>
                  <span className="font-bold">{pkg.name}</span>
                </div>
              ))}
            </div>

            {/* Feature Categories */}
            {comparisonData.map((category, catIdx) => (
              <div key={catIdx}>
                {/* Category Header */}
                <div 
                  className="grid grid-cols-4 bg-gray-100 border-t border-gray-200"
                >
                  <div 
                    className="col-span-4 p-4 font-bold text-lg text-center"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    {category.category}
                  </div>
                </div>

                {/* Features */}
                {category.features.map((feature, featIdx) => (
                  <motion.div
                    key={featIdx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: featIdx * 0.05 }}
                    className={`grid grid-cols-4 border-t border-gray-200 ${
                      featIdx % 2 === 0 ? 'bg-white' : 'bg-red-50/50'
                    }`}
                  >
                    {/* Feature Name */}
                    <div className="p-4 font-medium text-gray-800 border-l border-gray-200">
                      {feature.name}
                    </div>
                    
                    {/* Cashier */}
                    <div className="p-4 flex items-center justify-center border-l border-gray-200">
                      {feature.cashier ? <CheckIcon /> : <XIcon />}
                    </div>
                    
                    {/* Merchant */}
                    <div className="p-4 flex items-center justify-center border-l border-gray-200">
                      {feature.merchant ? <CheckIcon /> : <XIcon />}
                    </div>
                    
                    {/* Enterprise */}
                    <div className="p-4 flex items-center justify-center">
                      {feature.enterprise ? <CheckIcon /> : <XIcon />}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6 text-lg">
              هل تحتاج مساعدة في اختيار الباقة المناسبة؟
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 text-white rounded-full font-bold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              تواصل معنا
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

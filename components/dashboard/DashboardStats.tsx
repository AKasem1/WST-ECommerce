'use client';

import { motion } from 'framer-motion';
import type { DashboardStats as StatsType } from '@/types/dashboard';

interface DashboardStatsProps {
  stats: StatsType;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'الفئات',
      total: stats.categories.total,
      recent: stats.categories.recent,
      icon: '📁',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'المنتجات',
      total: stats.products.total,
      recent: stats.products.recent,
      icon: '📦',
      color: 'from-green-500 to-green-600',
      // extra: `${stats.products.lowStock} منتج منخفض المخزون`,
    },
    {
      title: 'الخدمات',
      total: stats.services.total,
      recent: stats.services.recent,
      icon: '⚙️',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${card.color} p-4`}>
            <div className="flex items-center justify-between" dir="rtl">
              <div>
                <p className="text-white text-opacity-90 text-sm">
                  {card.title}
                </p>
                <h3 className="text-white text-3xl font-bold mt-1">
                  {card.total}
                </h3>
              </div>
              <div className="text-4xl">{card.icon}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

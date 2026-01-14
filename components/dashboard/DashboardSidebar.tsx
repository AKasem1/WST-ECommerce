'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Folder, 
  Package, 
  Settings, 
  Monitor, 
  Mail 
} from 'lucide-react';

const navItems = [
  { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { name: 'الفئات', href: '/dashboard/categories', icon: Folder },
  { name: 'المنتجات', href: '/dashboard/products', icon: Package },
  { name: 'الخدمات', href: '/dashboard/services', icon: Settings },
  { name: 'البرامج', href: '/dashboard/programs', icon: Monitor },
  { name: 'الاستفسارات', href: '/dashboard/inquiries', icon: Mail },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-gray-200 min-h-screen" dir="rtl">
      <div className="p-6">
        <h2 className="text-2xl font-bold" style={{ color: '#382A67' }}>
          لوحة التحكم
        </h2>
      </div>

      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02, x: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: '#BA5183' } : {}}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

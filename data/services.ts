import { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 1,
    name: 'أنظمة إنذار الحريق',
    image: '/images/services/fire-alarm.webp',
    slug: 'fire-alarm-systems'
  },
  {
    id: 2,
    name: 'أنظمة الباركود',
    image: '/images/services/barcode.webp',
    slug: 'barcode-systems'
  },
  {
    id: 3,
    name: 'كاميرات المراقبة',
    image: '/images/services/surveillance.webp',
    slug: 'surveillance-cameras'
  },
  {
    id: 4,
    name: 'طابعات البطاقات',
    image: '/images/services/card-printers.webp',
    slug: 'card-printers'
  }
];

'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


export default function RamadanBanner() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 relative z-10 mb-12" dir="rtl">
      {/* Ramadan Sale Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/30"
      >
        <svg 
          viewBox="0 0 800 250" 
          className="w-full h-auto block" 
          role="banner" 
          aria-label="Ramadan Sale Ad Banner"
        >
          <defs>
            <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#0a1931', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1B3A5F', stopOpacity: 1 }} />
            </linearGradient>
            
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#FDB931', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#C49102', stopOpacity: 1 }} />
            </linearGradient>
            
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: '#FFFACD', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#FDB931', stopOpacity: 0 }} />
            </radialGradient>

            <pattern id="geoPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="none" stroke="#FDB931" strokeOpacity="0.1" strokeWidth="1"/>
              <circle cx="25" cy="25" r="5" fill="#FDB931" fillOpacity="0.05"/>
            </pattern>

            {/* Reuseable path for decorative mini moons */}
            <path id="miniMoonPath" d="M10 0 A 10 10 0 1 0 10 20 A 8 8 0 1 1 10 0 Z" />
          </defs>

          {/* Backgrounds */}
          <rect x="0" y="0" width="800" height="250" fill="url(#nightSky)" />
          <rect x="0" y="0" width="800" height="250" fill="url(#geoPattern)" />
          
          {/* Main Big Moon & Star (Left) */}
          <g transform="translate(80, 80)">
            <path d="M40 0 A 40 40 0 1 0 40 80 A 32 32 0 1 1 40 0 Z" fill="url(#goldGrad)">
              <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M60 20 L65 35 L80 40 L65 45 L60 60 L55 45 L40 40 L55 35 Z" fill="url(#goldGrad)">
              <animateTransform attributeName="transform" type="rotate" from="0 60 40" to="360 60 40" dur="10s" repeatCount="indefinite"/>
            </path>
          </g>

          {/* --- NEW: Decorative Scattered Hilal Icons --- */}
          <g fill="url(#goldGrad)" opacity="0.7">
             {/* Top Right, small, floating */}
            <g transform="translate(740, 40) scale(0.8) rotate(-20)">
               <use href="#miniMoonPath" />
               <animateTransform attributeName="transform" type="translate" values="0,0; 0,4; 0,0" dur="4s" repeatCount="indefinite" additive="sum"/>
            </g>
            
             {/* Bottom Left area, floating slowly */}
            <g transform="translate(50, 200) scale(0.6) rotate(10)">
               <use href="#miniMoonPath" />
               <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="5s" begin="1s" repeatCount="indefinite" additive="sum"/>
            </g>

             {/* Top Left area, near big moon */}
            <g transform="translate(150, 30) scale(0.5) rotate(5)">
               <use href="#miniMoonPath" />
               <animateTransform attributeName="transform" type="translate" values="0,0; 2,2; 0,0" dur="6s" repeatCount="indefinite" additive="sum"/>
            </g>
          </g>
          {/* ------------------------------------------- */}


          {/* Lanterns */}
          <g>
            {/* Large Lantern */}
            <g transform="translate(40, -60)">
              <line x1="20" y1="0" x2="20" y2="60" stroke="url(#goldGrad)" strokeWidth="2"/>
              <circle cx="20" cy="100" r="30" fill="url(#lanternGlow)" opacity="0.6">
                 <animate attributeName="opacity" values="0.6;0.8;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <path d="M10 60 L30 60 L35 90 C 35 110, 5 110, 5 90 Z" fill="url(#goldGrad)"/>
            </g>
            {/* Small Lantern */}
            <g transform="translate(700, -35) scale(0.7)">
              <line x1="20" y1="0" x2="20" y2="50" stroke="url(#goldGrad)" strokeWidth="2"/>
              <circle cx="20" cy="85" r="30" fill="url(#lanternGlow)" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.8;0.6" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <path d="M10 50 L30 50 L35 80 C 35 100, 5 100, 5 80 Z" fill="url(#goldGrad)"/>
            </g>
          </g>

          {/* Text Content */}
          <g textAnchor="middle">
            <text x="400" y="70" fontSize="48" fill="url(#goldGrad)" fontWeight="bold" fontFamily="inherit">رمضان كريم</text>
            <text x="400" y="125" fontSize="42" fill="#FFFFFF" fontWeight="900" letterSpacing="1">عروض رمضان الكبرى</text>
            <text x="400" y="165" fontSize="24" fill="#FDB931" fontWeight="bold">خصم يصل إلى 50% على جميع الفئات</text>
          </g>

          {/* Button */}
          <g 
            transform="translate(320, 190)" 
            cursor="pointer"
            onClick={() => router.push('/shop')}
          >
            <rect x="0" y="0" width="160" height="40" rx="20" ry="20" fill="url(#goldGrad)">
                <animate attributeName="fill" values="#FFD700;#FDB931;#FFD700" dur="2s" repeatCount="indefinite"/>
            </rect>
            <text x="80" y="26" fontSize="18" fill="#0a1931" fontWeight="bold" textAnchor="middle" fontFamily="inherit">تسوق الآن</text>
          </g>
          
          {/* Gift Boxes Right */}
          <g transform="translate(620, 140) rotate(10)">
              <rect x="0" y="20" width="40" height="40" fill="url(#goldGrad)" opacity="0.8"/>
              <rect x="18" y="0" width="4" height="20" fill="url(#goldGrad)"/>
              <rect x="5" y="25" width="30" height="5" fill="#0a1931" opacity="0.3"/>
          </g>
           <g transform="translate(670, 160) rotate(-5)">
              <rect x="0" y="15" width="30" height="35" fill="url(#goldGrad)" opacity="0.8"/>
              <rect x="13" y="0" width="4" height="15" fill="url(#goldGrad)"/>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
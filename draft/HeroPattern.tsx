import React from 'react';
import './hero-pattern.css'; // Ensure this path matches your file structure

const HeroPattern = () => {
  return (
    <section 
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: 'clamp(520px, 60vh, 720px)' }}
    >
      {/* =========================================
          LAYER 1: Soft Blobs (Background)
          ========================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Blob Top Left */}
        <div className="absolute top-[-140px] left-[-160px] w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full blur-3xl opacity-90 mix-blend-multiply bg-[#EEF1F6]" />
        
        {/* Blob Mid Right */}
        <div className="absolute top-[40px] right-[-220px] w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] rounded-full blur-3xl opacity-70 mix-blend-multiply bg-[#EEF1F6]" />
        
        {/* Blob Bottom Center */}
        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[520px] h-[320px] sm:w-[680px] sm:h-[380px] rounded-full blur-3xl opacity-60 mix-blend-multiply bg-[#EEF1F6]" />
      </div>

      {/* =========================================
          LAYER 2: Corner Ribbons (Polygons)
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
        {/* --- Top Left Corner --- */}
        <div className="absolute top-0 left-0">
          {/* Layer 2 (Magenta) */}
          <div 
            className="absolute top-0 left-0 bg-[#B04A83] opacity-95 w-[320px] h-[220px] sm:w-[400px] sm:h-[260px]"
            style={{ clipPath: 'polygon(0 0, 70% 0, 45% 45%, 0 70%)' }}
          />
          {/* Layer 1 (Blue) */}
          <div 
            className="absolute top-0 left-0 bg-[#2D2A70] w-[340px] h-[240px] sm:w-[420px] sm:h-[280px]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 62% 62%, 0 100%)' }}
          />
        </div>

        {/* --- Top Right Corner --- */}
        <div className="absolute top-0 right-0">
           {/* Layer 2 (Magenta) */}
           <div 
            className="absolute top-0 right-0 bg-[#B04A83] opacity-95 w-[320px] h-[220px] sm:w-[400px] sm:h-[260px]"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 70%, 55% 45%)' }}
          />
          {/* Layer 1 (Blue) */}
          <div 
            className="absolute top-0 right-0 bg-[#2D2A70] w-[340px] h-[240px] sm:w-[420px] sm:h-[280px]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 38% 62%)' }}
          />
        </div>

        {/* --- Bottom Left Corner --- */}
        <div className="absolute bottom-0 left-0">
           {/* Layer 2 (Magenta) */}
           <div 
            className="absolute bottom-0 left-0 bg-[#B04A83] opacity-95 w-[320px] h-[220px] sm:w-[400px] sm:h-[260px]"
            style={{ clipPath: 'polygon(0 30%, 45% 55%, 70% 100%, 0 100%)' }}
          />
          {/* Layer 1 (Blue) */}
          <div 
            className="absolute bottom-0 left-0 bg-[#2D2A70] w-[360px] h-[240px] sm:w-[440px] sm:h-[300px]"
            style={{ clipPath: 'polygon(0 0, 62% 38%, 100% 100%, 0 100%)' }}
          />
        </div>

        {/* --- Bottom Right Corner --- */}
        <div className="absolute bottom-0 right-0">
           {/* Layer 2 (Magenta) */}
           <div 
            className="absolute bottom-0 right-0 bg-[#B04A83] opacity-95 w-[320px] h-[220px] sm:w-[400px] sm:h-[260px]"
            style={{ clipPath: 'polygon(55% 55%, 100% 30%, 100% 100%, 30% 100%)' }}
          />
          {/* Layer 1 (Blue) */}
          <div 
            className="absolute bottom-0 right-0 bg-[#2D2A70] w-[360px] h-[240px] sm:w-[440px] sm:h-[300px]"
            style={{ clipPath: 'polygon(38% 38%, 100% 0, 100% 100%, 0 100%)' }}
          />
        </div>
      </div>

      {/* =========================================
          LAYER 3: Dotted Clusters
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden="true">
        {/* Dots Top Right */}
        <div 
          className="absolute top-[84px] right-[140px] w-[120px] h-[120px] bg-dot-pattern opacity-80"
          style={{ 
            '--dot-color': 'rgba(176, 74, 131, 0.65)', 
            '--dot-size': '3.6px', // 1.8px radius * 2
            '--dot-space': '14px' 
          } as React.CSSProperties}
        />

        {/* Dots Mid Left */}
        <div 
          className="absolute top-[220px] left-[80px] w-[96px] h-[96px] bg-dot-pattern"
          style={{ 
            '--dot-color': 'rgba(45, 42, 112, 0.55)', 
            '--dot-size': '3.2px', 
            '--dot-space': '14px' 
          } as React.CSSProperties}
        />

        {/* Dots Mid Right (Hidden on mobile) */}
        <div 
          className="hidden md:block absolute top-[320px] right-[70px] w-[72px] h-[72px] bg-dot-pattern"
          style={{ 
            '--dot-color': 'rgba(45, 42, 112, 0.45)', 
            '--dot-size': '3px', 
            '--dot-space': '16px' 
          } as React.CSSProperties}
        />
      </div>

      {/* =========================================
          LAYER 4: Main Content
          ========================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col items-center">
        
        {/* --- Device Mockups Group --- */}
        {/* Mobile: Stacked Flex | Desktop: Relative/Absolute Composition */}
        <div className="relative w-full max-w-[900px] flex flex-col gap-6 items-center md:block md:h-[460px] mb-8 sm:mb-12">
          
          {/* 1. Tablet (Left Back) */}
          <div className="
            relative md:absolute 
            w-[220px] h-[300px] sm:w-[260px] sm:h-[340px]
            md:top-[40px] md:left-[40px] lg:left-[80px] z-10
            bg-white border-2 border-slate-200 rounded-2xl shadow-xl
            flex flex-col overflow-hidden
          ">
             {/* Fake UI */}
             <div className="h-6 bg-slate-100 border-b border-slate-100 flex items-center px-3 space-x-1">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
             </div>
             <div className="p-3 space-y-2">
               <div className="w-full h-24 bg-slate-50 rounded"></div>
               <div className="w-2/3 h-2 bg-slate-100 rounded"></div>
               <div className="w-1/2 h-2 bg-slate-100 rounded"></div>
             </div>
          </div>

          {/* 2. Desktop Monitor (Center Back) */}
          <div className="
            relative md:absolute 
            w-full max-w-[520px] h-[300px] sm:w-[640px] sm:h-[360px]
            md:top-0 md:left-1/2 md:-translate-x-1/2 z-30
          ">
            {/* Screen */}
            <div className="w-full h-full bg-white border-2 border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col">
              {/* Browser Bar */}
              <div className="h-7 bg-slate-50 border-b border-slate-100 flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
                <div className="flex-1 h-3 bg-white border border-slate-200 rounded-sm mx-2"></div>
              </div>
              {/* Content Body */}
              <div className="flex-1 p-4 bg-white grid grid-cols-4 gap-4">
                <div className="col-span-1 bg-slate-50 h-full rounded-md"></div>
                <div className="col-span-3 space-y-3">
                   <div className="w-full h-8 bg-slate-50 rounded-md"></div>
                   <div className="flex gap-3">
                      <div className="flex-1 h-20 bg-slate-50 rounded-md"></div>
                      <div className="flex-1 h-20 bg-slate-50 rounded-md"></div>
                   </div>
                   <div className="w-full h-32 bg-slate-50 rounded-md"></div>
                </div>
              </div>
            </div>
            {/* Stand */}
            <div className="hidden md:flex flex-col items-center">
               <div className="w-12 h-8 bg-gradient-to-b from-slate-200 to-slate-100"></div>
               <div className="w-32 h-1.5 bg-slate-300 rounded-full shadow-sm"></div>
            </div>
          </div>

          {/* 3. Laptop (Right Front) */}
          <div className="
            relative md:absolute 
            w-[340px] h-[220px] sm:w-[420px] sm:h-[270px]
            md:top-[90px] md:right-[20px] lg:right-[60px] z-20
          ">
             {/* Laptop Lid */}
             <div className="w-full h-[85%] bg-white border-2 border-slate-200 rounded-t-xl rounded-b-md shadow-xl overflow-hidden flex flex-col">
                <div className="h-full w-full p-3 bg-white">
                   <div className="w-full h-full bg-slate-50 rounded border border-dashed border-slate-200"></div>
                </div>
             </div>
             {/* Laptop Base */}
             <div className="w-[110%] -ml-[5%] h-[15%] bg-slate-100 border border-slate-200 rounded-b-xl shadow-lg relative flex justify-center">
                <div className="w-16 h-1 bg-slate-300 rounded-full mt-1"></div>
             </div>
          </div>

          {/* 4. Handheld / PDA (Left Front) */}
          <div className="
            relative md:absolute 
            w-[140px] h-[220px] sm:w-[160px] sm:h-[240px]
            md:bottom-[20px] md:left-[100px] z-40
            bg-[#2a2a2a] rounded-3xl shadow-2xl border-4 border-[#333]
            flex flex-col
          ">
             {/* Screen Area */}
             <div className="flex-1 m-2 bg-slate-800 rounded-xl overflow-hidden p-2">
                <div className="w-full h-full bg-slate-700/50 rounded flex flex-col gap-1 p-1">
                   <div className="w-full h-1 bg-slate-600 rounded-sm"></div>
                   <div className="w-2/3 h-1 bg-slate-600 rounded-sm"></div>
                </div>
             </div>
             {/* Keypad Area */}
             <div className="h-[40%] px-3 pb-4 grid grid-cols-3 gap-1 content-center">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-full aspect-square bg-gray-700 rounded-sm opacity-50"></div>
                ))}
             </div>
          </div>

        </div>

        {/* --- Text Content --- */}
        <div className="relative z-50 max-w-2xl mx-auto text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2D2A70] leading-tight">
            بوابتك لتطوير أعمالك
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            الحلول المتكاملة لنقاط البيع، الأنظمة الأمنية، وإدارة المخزون
          </p>
          
          {/* Optional CTA Button to complete the feel */}
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 rounded-full bg-[#2D2A70] text-white font-medium hover:bg-[#23205A] transition shadow-lg shadow-indigo-900/20">
              تواصل معنا
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroPattern;
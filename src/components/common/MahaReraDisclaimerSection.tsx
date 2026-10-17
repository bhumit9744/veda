import React from 'react';

export default function MahaReraDisclaimerSection() {
  const mahareraUrl = "https://maharerait.maharashtra.gov.in/project/view/67238";
  const portalUrl = "https://maharera.maharashtra.gov.in";

  return (
    <section 
      id="maharera-disclaimer" 
      aria-label="MahaRERA Disclaimer & Registration Information"
      className="w-full bg-[#FAF7F2] text-[#484743] py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden font-codec z-40 border-t border-[#D1C0AF]/50"
    >
      {/* Decorative Botanical Palm Fronds (Subtle low-opacity luxury accents in corners) */}
      <div 
        className="absolute -top-12 -left-12 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none opacity-[0.05] text-[#98795A] select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full rotate-45 transform">
          <path d="M100 10 C120 40, 160 60, 190 70 C160 80, 130 90, 100 100 C110 130, 120 160, 110 190 C100 160, 90 130, 80 100 C50 110, 20 110, 0 100 C30 90, 60 70, 80 50 C85 30, 90 20, 100 10 Z" />
          <path d="M100 30 C130 60, 150 100, 170 120 C140 115, 115 105, 95 95 C95 125, 90 155, 80 180 C75 150, 75 120, 75 95 C55 105, 30 110, 10 105 C35 95, 60 75, 75 55 Z" />
        </svg>
      </div>
      <div 
        className="absolute -bottom-16 -right-12 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none opacity-[0.07] text-[#98795A] select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full -rotate-12 transform">
          <path d="M100 10 C120 40, 160 60, 190 70 C160 80, 130 90, 100 100 C110 130, 120 160, 110 190 C100 160, 90 130, 80 100 C50 110, 20 110, 0 100 C30 90, 60 70, 80 50 C85 30, 90 20, 100 10 Z" />
          <path d="M100 30 C130 60, 150 100, 170 120 C140 115, 115 105, 95 95 C95 125, 90 155, 80 180 C75 150, 75 120, 75 95 C55 105, 30 110, 10 105 C35 95, 60 75, 75 55 Z" />
        </svg>
      </div>

      {/* Main Elegant Disclaimer Panel */}
      <div className="max-w-7xl mx-auto relative bg-[#FAF7F2] p-6 sm:p-8 md:p-12 lg:p-14">
        
        {/* Antique Gold Frame with Refined Concave Corners */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Straight frame lines */}
          <div className="absolute top-2 sm:top-3 left-8 sm:left-9 right-8 sm:right-9 h-[1px] bg-[#D1C0AF]" />
          <div className="absolute bottom-2 sm:bottom-3 left-8 sm:left-9 right-8 sm:right-9 h-[1px] bg-[#D1C0AF]" />
          <div className="absolute left-2 sm:left-3 top-8 sm:top-9 bottom-8 sm:bottom-9 w-[1px] bg-[#D1C0AF]" />
          <div className="absolute right-2 sm:right-3 top-8 sm:top-9 bottom-8 sm:bottom-9 w-[1px] bg-[#D1C0AF]" />

          {/* Top-Left Concave Corner */}
          <svg 
            className="absolute top-2 sm:top-3 left-2 sm:left-3 w-6 h-6 text-[#D1C0AF]" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path d="M 24 0 A 24 24 0 0 1 0 24" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Top-Right Concave Corner */}
          <svg 
            className="absolute top-2 sm:top-3 right-2 sm:right-3 w-6 h-6 text-[#D1C0AF]" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path d="M 0 0 A 24 24 0 0 0 24 24" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Bottom-Left Concave Corner */}
          <svg 
            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-6 h-6 text-[#D1C0AF]" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path d="M 0 0 A 24 24 0 0 0 24 24" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Bottom-Right Concave Corner */}
          <svg 
            className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-6 h-6 text-[#D1C0AF]" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path d="M 24 0 A 24 24 0 0 1 0 24" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Content Layout: 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column — ~75% Width */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between">
            
            {/* Header: DISCLAIMER with letter-spacing & gold rule */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-[#98795A] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-sm sm:text-base md:text-[17px] font-medium"
              >
                DISCLAIMER
              </h2>
              <span className="inline-block w-8 sm:w-12 h-[1px] bg-[#98795A]/70" aria-hidden="true" />
            </div>

            {/* Exact Legal Disclaimer Paragraph */}
            <p className="text-[12px] sm:text-[12.5px] md:text-[13px] text-[#484743] leading-relaxed font-light text-justify sm:text-left">
              Disclaimer: This advertisement is for informational and promotional purposes only. All images, illustrations, layouts and specifications are indicative and for representational purposes only. The project shall be developed in accordance with approved plans and applicable statutory approvals. Actual development, amenities and specifications shall be as per the applicable project documents. This advertisement pertains only to the project registered under the MahaRERA registration number mentioned below. Any future phases or additional developments, including on adjoining land, shall be subject to applicable statutory approvals and separate MahaRERA registration, wherever required.
            </p>

            {/* MahaRERA Website Link */}
            <p className="mt-3 sm:mt-3.5 text-[12px] sm:text-[12.5px] md:text-[13px] text-[#484743]">
              For complete details, please visit{' '}
              <a 
                href={portalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#98795A] hover:text-[#7A5B3E] underline underline-offset-4 decoration-[#98795A]/50 hover:decoration-[#7A5B3E] font-medium transition-colors"
              >
                https://maharera.maharashtra.gov.in
              </a>.
            </p>

            {/* Thin Gold Divider */}
            <div className="w-full h-[1px] bg-[#D1C0AF]/60 my-5 sm:my-6" aria-hidden="true" />

            {/* Three Project Information Blocks in Horizontal Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x divide-[#D1C0AF]/60">
              
              {/* Block 1: PROJECT NAME */}
              <div className="sm:pr-4 lg:pr-6 flex flex-col justify-start">
                <span className="text-[9.5px] sm:text-[10px] md:text-[10.5px] uppercase tracking-[0.2em] text-[#7B7A77] font-medium mb-1">
                  PROJECT NAME
                </span>
                <span 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-[16px] sm:text-[18px] md:text-[20px] text-[#714A2C] font-normal leading-snug"
                >
                  Veda Monteza
                </span>
              </div>

              {/* Block 2: PROMOTER */}
              <div className="sm:px-4 lg:px-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#D1C0AF]/30 flex flex-col justify-start">
                <span className="text-[9.5px] sm:text-[10px] md:text-[10.5px] uppercase tracking-[0.2em] text-[#7B7A77] font-medium mb-1">
                  PROMOTER
                </span>
                <span 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-[16px] sm:text-[18px] md:text-[20px] text-[#714A2C] font-normal leading-snug"
                >
                  Veda Lifespace Limited
                </span>
              </div>

              {/* Block 3: MAHARERA REGISTRATION NO. */}
              <div className="sm:pl-4 lg:pl-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#D1C0AF]/30 flex flex-col justify-start">
                <span className="text-[9.5px] sm:text-[10px] md:text-[10.5px] uppercase tracking-[0.2em] text-[#7B7A77] font-medium mb-1">
                  MAHARERA REGISTRATION NO.
                </span>
                <span 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-[16px] sm:text-[18px] md:text-[20px] text-[#714A2C] font-normal leading-snug tracking-wide"
                >
                  PP1270002602275
                </span>
              </div>

            </div>

          </div>

          {/* Right Column — ~25% Width with QR Card */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center justify-center">
            <div className="w-full max-w-[220px] sm:max-w-[240px] bg-white border border-[#D1C0AF] rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(152,121,90,0.06)] flex flex-col items-center text-center transition-transform duration-300 hover:shadow-[0_8px_28px_rgba(152,121,90,0.12)]">
              
              {/* Scannable MahaRERA QR Code */}
              <a 
                href={mahareraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                title="Scan or click to view project on MahaRERA website"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 bg-white p-2 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/maharera-qr.png" 
                    alt="QR code for MahaRERA project information" 
                    width={160}
                    height={160}
                    className="w-full h-full object-contain block transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </a>

              {/* Action caption */}
              <a
                href={mahareraUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="mt-3.5 text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.22em] font-semibold text-[#98795A] hover:text-[#7A5B3E] transition-colors leading-relaxed block"
              >
                SCAN TO VIEW ON<br />MAHARERA WEBSITE
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

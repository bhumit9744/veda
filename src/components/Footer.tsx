import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/assetUrl';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'X', url: 'https://x.com/vedalifespace', icon: '/assets/images/X-Icon-White.png' },
    { name: 'Facebook', url: 'https://www.facebook.com/vedalifespaces', icon: '/assets/images/facebook-icon.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/veda-life-spaces/', icon: '/assets/images/Linkedin-Icon.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/vedalifespaces/', icon: '/assets/images/Instagram-Icon.png' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Vedalifespaces', icon: '/assets/images/Youtube-Icon.png' }
  ];

  return (
    <footer className="w-full bg-[#080808] text-[#F0EBDD] pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-28 sm:pb-32 md:pb-14 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#F0EBDD]/10 relative z-50 overflow-hidden font-codec">
      {/* Subtle Ambient Gold Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-48 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(199, 163, 74, 0.12), transparent 70%)'
        }}
        aria-hidden="true"
      />

      {/* Subtle Top Accent Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C7A34A]/25 to-transparent pointer-events-none" />

      {/* 3-Column Luxury Layout: Brand (wider) | Get In Touch | Connect */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 xl:gap-20 items-start relative z-10">

        {/* 1. Left Column — Brand (lg:col-span-5) */}
        <div className="md:col-span-2 lg:col-span-5 flex flex-col items-start text-left">
          <Link to="/" className="inline-block transition-opacity duration-300 hover:opacity-90" aria-label="Veda Life Spaces Home">
            <img
              src={assetUrl('/assets/images/logo.png')}
              className="h-10 sm:h-12 md:h-14 w-auto object-contain max-w-[170px] sm:max-w-none"
              alt="Veda Life Spaces"
            />
          </Link>
          <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#F0EBDD]/70 leading-relaxed font-light mt-5 sm:mt-6 max-w-full sm:max-w-[420px] break-words">
            Transforming land into thoughtfully planned, infrastructure-ready branded villa plots, designed for confident ownership and long-term potential.
          </p>
          <div className="mt-6 sm:mt-8 w-full sm:w-auto">
            <Link
              to="/contact-us.php"
              className="group inline-flex items-center justify-center gap-3 border border-[#C7A34A]/40 hover:border-[#C7A34A] bg-[#C7A34A]/10 hover:bg-[#C7A34A]/20 text-[#C7A34A] hover:text-[#F0EBDD] px-6 sm:px-7 py-3 rounded-full text-xs tracking-[0.18em] uppercase font-medium transition-all duration-300 shadow-sm w-full sm:w-auto"
            >
              <span>Start A Conversation</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* 2. Middle Column — Get In Touch (lg:col-span-4) */}
        <div className="flex flex-col text-left lg:col-span-4">
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A34A]"></span>
            <h4 className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#C7A34A] font-semibold">
              Get In Touch
            </h4>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Email */}
            <a
              href="mailto:info@vedalifespaces.in"
              className="group flex flex-col p-2.5 sm:p-3 -mx-2.5 sm:-mx-3 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all duration-300"
            >
              <span className="text-[10px] sm:text-[11px] text-[#F0EBDD]/40 uppercase tracking-widest mb-1">Email</span>
              <span className="text-sm md:text-[15px] text-[#F0EBDD]/90 group-hover:text-[#C7A34A] transition-colors font-light break-all">
                info@vedalifespaces.in
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+919619394620"
              className="group flex flex-col p-2.5 sm:p-3 -mx-2.5 sm:-mx-3 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all duration-300"
            >
              <span className="text-[10px] sm:text-[11px] text-[#F0EBDD]/40 uppercase tracking-widest mb-1">Telephone</span>
              <span className="text-sm md:text-[15px] text-[#F0EBDD]/90 group-hover:text-[#C7A34A] transition-colors font-light whitespace-nowrap">
                +91 96193 94620
              </span>
            </a>

            {/* Location & Appointment */}
            <div className="flex flex-col p-2.5 sm:p-3 -mx-2.5 sm:-mx-3">
              <span className="text-[10px] sm:text-[11px] text-[#F0EBDD]/40 uppercase tracking-widest mb-1">Location</span>
              <span className="text-sm md:text-[15px] text-[#F0EBDD]/80 font-light leading-relaxed">
                Mapgaon, Alibaug, Maharashtra
              </span>
              <span className="text-xs text-[#C7A34A]/80 font-light mt-1">
                Site visits by appointment
              </span>
            </div>
          </div>
        </div>

        {/* 3. Right Column — Connect (lg:col-span-3) */}
        <div className="flex flex-col text-left lg:col-span-3">
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A34A]"></span>
            <h4 className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#C7A34A] font-semibold">
              Connect
            </h4>
          </div>

          <div className="flex flex-col gap-1.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-2 px-2.5 sm:px-3 -mx-2.5 sm:-mx-3 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.03] transition-all duration-300 min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#C7A34A]/50 group-hover:bg-[#C7A34A]/10 transition-colors shrink-0">
                    <img
                      src={assetUrl(social.icon)}
                      alt={social.name}
                      className="w-4 h-4 object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-sm text-[#F0EBDD]/80 group-hover:text-[#F0EBDD] font-light transition-colors">
                    {social.name}
                  </span>
                </div>
                <span className="text-xs text-[#C7A34A] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto mt-14 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-[#F0EBDD]/10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#F0EBDD]/40 font-codec text-center md:text-left">
        <p className="order-2 md:order-1 leading-relaxed">
          © {currentYear} VEDA LIFESPACES. ALL RIGHTS RESERVED.
        </p>

        <span className="order-1 md:order-2 text-xs tracking-[0.3em] font-light text-[#C7A34A]/80 uppercase italic">
          Beyond Living.
        </span>

        <div className="flex items-center justify-center gap-5 sm:gap-7 order-3 md:pr-32 lg:pr-36">
          <Link to="/privacy-policy" className="hover:text-[#F0EBDD] transition-colors py-1.5">
            Privacy Policy
          </Link>
          <span className="text-[#F0EBDD]/20">|</span>
          <Link to="/disclaimer" className="hover:text-[#F0EBDD] transition-colors py-1.5">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}

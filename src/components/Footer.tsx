import React from 'react';
import { Link } from 'react-router-dom';

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
    <footer className="w-full bg-[#080808] text-[#F0EBDD] pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 lg:px-16 border-t border-[#F0EBDD]/10 relative z-50 overflow-hidden font-codec">
      {/* Ambient Top Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-56 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(199, 163, 74, 0.14), transparent 70%)'
        }}
        aria-hidden="true"
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C7A34A]/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">

        {/* Brand & Tagline Column */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <Link to="/" className="inline-block transition-opacity duration-300 hover:opacity-90">
            <img
              src="/assets/images/logo.png"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              alt="Veda Life Spaces"
            />
          </Link>
          <p className="text-[14px] md:text-[15px] text-[#F0EBDD]/65 leading-relaxed font-light mt-5 md:mt-6 max-w-[420px]">
            Transforming land into thoughtfully planned, infrastructure-ready branded villa plots, designed for confident ownership and long-term potential.
          </p>
          <div className="mt-7">
            <Link
              to="/contact-us.php"
              className="group inline-flex items-center gap-3 border border-[#C7A34A]/40 hover:border-[#C7A34A] bg-[#C7A34A]/5 hover:bg-[#C7A34A]/15 text-[#C7A34A] hover:text-[#F0EBDD] px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 shadow-sm"
            >
              <span>Start A Conversation</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* Contact & Connect Hub */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 lg:pl-6">

          {/* Contact Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A34A]"></span>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C7A34A] font-semibold">
                Get In Touch
              </h4>
            </div>

            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:info@vedalifespaces.in"
                className="group flex flex-col p-3.5 -mx-3.5 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all duration-300"
              >
                <span className="text-[10px] md:text-[11px] text-[#F0EBDD]/40 uppercase tracking-widest mb-1">Email</span>
                <span className="text-sm md:text-[15px] text-[#F0EBDD]/90 group-hover:text-[#C7A34A] transition-colors font-light">
                  info@vedalifespaces.in
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+919619394620"
                className="group flex flex-col p-3.5 -mx-3.5 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all duration-300"
              >
                <span className="text-[10px] md:text-[11px] text-[#F0EBDD]/40 uppercase tracking-widest mb-1">Telephone</span>
                <span className="text-sm md:text-[15px] text-[#F0EBDD]/90 group-hover:text-[#C7A34A] transition-colors font-light">
                  +91 96193 94620
                </span>
              </a>

              {/* Location */}
              <div className="flex flex-col p-3.5 -mx-3.5">
                <span className="text-[10px] md:text-[11px] text-[#F0EBDD]/40 uppercase tracking-widest mb-1">Location</span>
                <span className="text-sm md:text-[15px] text-[#F0EBDD]/80 font-light">
                  Mapgaon, Alibaug, Maharashtra
                </span>
                <span className="text-xs text-[#C7A34A]/80 font-light mt-0.5">
                  Site visits by  appointment
                </span>
              </div>
            </div>
          </div>

          {/* Connect / Social Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A34A]"></span>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C7A34A] font-semibold">
                Connect
              </h4>
            </div>

            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-2 px-3.5 -mx-3.5 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#C7A34A]/50 group-hover:bg-[#C7A34A]/10 transition-colors">
                      <img
                        src={social.icon}
                        alt={social.name}
                        className="w-3.5 h-3.5 object-contain opacity-75 group-hover:opacity-100 transition-opacity"
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

      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto mt-14 md:mt-20 pt-8 border-t border-[#F0EBDD]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#F0EBDD]/40 font-codec text-center md:text-left">
        <p className="order-2 md:order-1">© {currentYear} VEDA LIFESPACES. ALL RIGHTS RESERVED.</p>

        <span className="hidden lg:inline order-2 text-xs tracking-[0.3em] font-light text-[#C7A34A]/70 uppercase italic">
          Beyond Living.
        </span>

        <div className="flex items-center gap-6 md:gap-8 order-1 md:order-3">
          <Link to="/privacy-policy" className="hover:text-[#F0EBDD] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/disclaimer" className="hover:text-[#F0EBDD] transition-colors">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/aboutus.php' },
    { name: 'Developments', path: '/#developments' },
    { name: 'News', path: '/news.php' },
    { name: 'Careers', path: '/carrers.php' },
    { name: 'Contact', path: '/contact-us.php' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <footer className="w-full bg-[#050505] text-[#F0EBDD] pt-12 md:pt-24 pb-6 md:pb-12 px-5 md:px-12 border-t border-[#F0EBDD]/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-0 lg:gap-8">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col lg:max-w-sm text-center items-center md:text-left md:items-start">
          <Link to="/" className="block">
            <img src="/assets/images/logo.png" className="w-[110px] md:w-auto md:h-16 object-contain" alt="Veda Lifespaces" />
          </Link>
          <p className="text-[14px] md:text-sm text-[#F0EBDD]/60 leading-[1.5] md:leading-relaxed font-body mt-5 md:mt-6 max-w-[340px]">
            Transforming raw land into fully approved, infrastructure-ready residential plots that offer both peace of mind and long-term value appreciation.
          </p>
          <Link to="/contact-us.php" className="inline-flex items-center gap-2 md:gap-4 text-[11px] md:text-xs tracking-[0.18em] md:tracking-[0.2em] uppercase text-[#C7A34A] hover:text-[#F0EBDD] transition-colors mt-6 md:mt-4">
            START A CONVERSATION <span className="text-[14px] md:text-lg leading-none">→</span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-24 lg:gap-24 mt-9 lg:mt-0">
          
          {/* Navigation */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left mt-0">
            <span className="text-[10px] md:text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-3 md:mb-4 font-sans">Explore</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1 md:flex-col md:gap-4 max-w-[280px] md:max-w-none text-[14px] leading-[1.8] md:text-sm">
              {navLinks.map((link, idx) => (
                <React.Fragment key={link.name}>
                  <Link to={link.path} className="font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors whitespace-nowrap">
                    {link.name}
                  </Link>
                  {/* Dot separator for mobile, hidden on desktop */}
                  {idx < navLinks.length - 1 && <span className="md:hidden text-[#F0EBDD]/30 font-bold">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left mt-8 md:mt-0">
            <span className="text-[10px] md:text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-3 md:mb-4 font-sans">Contact</span>
            <a href="mailto:info@vedalifespaces.in" className="text-[14px] md:text-sm leading-[1.8] md:leading-normal font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
              info@vedalifespaces.in
            </a>
            <a href="tel:+919619394620" className="text-[14px] md:text-sm leading-[1.8] md:leading-normal font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
              +91 96193 94620
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left col-span-1 md:col-span-1 mt-8 md:mt-0">
            <span className="text-[10px] md:text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-3 md:mb-4 font-sans">Connect</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-3 md:flex-col md:gap-4 max-w-[280px] md:max-w-none">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-[13px] md:text-sm font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors group whitespace-nowrap">
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    className="w-[16px] h-[16px] md:w-4 md:h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
                  />
                  {social.name}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal */}
      <div className="max-w-7xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#F0EBDD]/10 flex flex-col md:flex-row justify-center items-center md:justify-between gap-6 md:gap-4 text-[9px] md:text-[0.65rem] tracking-[0.12em] md:tracking-[0.1em] uppercase text-[#F0EBDD]/40 font-sans text-center">
        <p className="order-2 md:order-1 opacity-70">© {currentYear} VEDA LIFESPACES. ALL RIGHTS RESERVED.</p>
        <div className="flex justify-center gap-7 md:gap-8 order-1 md:order-2">
          <Link to="/privacy-policy" className="hover:text-[#F0EBDD] transition-colors">Privacy Policy</Link>
          <Link to="/disclaimer" className="hover:text-[#F0EBDD] transition-colors">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}

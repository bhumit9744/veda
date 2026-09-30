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
    <footer className="w-full bg-[#050505] text-[#F0EBDD] pt-24 pb-12 px-6 md:px-12 border-t border-[#F0EBDD]/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col gap-6 lg:max-w-sm">
          <Link to="/" className="block">
            <img src="/assets/images/logo.png" className="h-12 md:h-16 object-contain" alt="Veda Lifespaces" />
          </Link>
          <p className="text-sm text-[#F0EBDD]/60 leading-relaxed font-body mt-2">
            Transforming raw land into fully approved, infrastructure-ready residential plots that offer both peace of mind and long-term value appreciation.
          </p>
          <Link to="/contact-us.php" className="inline-flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-[#C7A34A] hover:text-[#F0EBDD] transition-colors mt-4">
            Start a Conversation <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          
          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-2 font-sans">Explore</span>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-2 font-sans">Contact</span>
            <a href="mailto:info@vedalifespaces.in" className="text-sm font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
              info@vedalifespaces.in
            </a>
            <a href="tel:+919619394620" className="text-sm font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors">
              +91 96193 94620
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#F0EBDD]/40 mb-2 font-sans">Connect</span>
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-body text-[#F0EBDD]/80 hover:text-[#C7A34A] transition-colors group">
                <img 
                  src={social.icon} 
                  alt={social.name} 
                  className="w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
                />
                {social.name}
              </a>
            ))}
          </div>

        </div>
      </div>



      {/* Bottom Legal */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#F0EBDD]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.65rem] tracking-[0.1em] uppercase text-[#F0EBDD]/40 font-sans">
        <p>© {currentYear} Veda Lifespaces. All rights reserved.</p>
        <div className="flex gap-8">
          <Link to="/privacy-policy" className="hover:text-[#F0EBDD] transition-colors">Privacy Policy</Link>
          <Link to="/disclaimer" className="hover:text-[#F0EBDD] transition-colors">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}

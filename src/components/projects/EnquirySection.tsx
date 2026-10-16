import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EnquireButton from '../common/EnquireButton';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  configuration?: string;
}

export default function EnquirySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    configuration: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [K in keyof typeof formData]?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.enq-fade',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateField = (field: keyof typeof formData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return undefined;

      case 'mobile': {
        const clean = value.replace(/[\s\-()]/g, '').replace(/^\+91|^91|^0/, '');
        if (!value.trim()) return 'Please enter your phone number.';
        if (!/^[0-9]{10}$/.test(clean)) return 'Please enter a valid 10-digit phone number.';
        return undefined;
      }

      case 'email':
        if (!value.trim()) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
        return undefined;

      case 'configuration':
        if (!value) return 'Please select your preferred configuration.';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof typeof formData)[]).forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setTouched({
      name: true,
      mobile: true,
      email: true,
      configuration: true
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const cleanMobile = formData.mobile.replace(/[\s\-()]/g, '').replace(/^\+91|^91|^0/, '');
    const formattedPhone = `+91 ${cleanMobile}`;

    // Prefilled message per specifications
    const messageLines = [
      'Hello Veda Life Spaces Team,',
      '',
      'I would like to schedule a site visit.',
      '',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formattedPhone}`,
      `Email: ${formData.email.trim()}`,
      `Preferred Villa: ${formData.configuration}`,
      '',
      'Please contact me to coordinate a convenient visit.',
      '',
      'Thank you.'
    ];

    const message = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(message);
    const destination = '919619394620';
    const url = `https://wa.me/${destination}?text=${encodedMessage}`;

    setWhatsappUrl(url);
    setIsSubmitted(true);

    // Open WhatsApp in a new tab safely
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Browser popup blocked, user can click the visible fallback button
    }

    // Optional silent backup lead creation
    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('mobile', cleanMobile);
      payload.append('email', formData.email.trim());
      payload.append('preferredVilla', formData.configuration);
      payload.append('source', 'Projects Page Schedule Visit Form');
      fetch('/api/createLead.php', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: payload,
      }).catch(() => {});
    } catch {
      // Non-critical, ignore
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', mobile: '', email: '', configuration: '' });
    setTouched({});
    setErrors({});
  };

  return (
    <section id="enquiry-section" ref={sectionRef} className="w-full bg-[#F4F1E8] py-24 md:py-32 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Text Column */}
          <div className="flex flex-col justify-center">
            <div className="enq-fade flex items-center gap-4 mb-6 md:mb-8">
              <span className="font-veda-sans text-xs tracking-[0.2em] uppercase text-[#666]">
                YOUR NEXT CHAPTER BEGINS HERE
              </span>
              <div className="h-px w-12 bg-[#b89a6b]/50"></div>
            </div>
            
            <h2 className="enq-fade font-veda-serif text-4xl md:text-5xl lg:text-6xl text-[#2d2d2d] leading-[1.1] tracking-tight mb-8">
              Your European<br className="hidden md:block"/> Plot Awaits.
            </h2>
            
            <p className="enq-fade font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light mb-8 max-w-md">
              Discover a more considered way of living. Share your details and our team will help you explore the right villa for you.
            </p>

            <div className="enq-fade mb-10">
              <EnquireButton text="ENQUIRE NOW" variant="primary" />
            </div>
            
            {/* Minimal architectural decoration */}
            <div className="enq-fade w-24 h-[120px] border border-[#b89a6b]/30 rounded-t-full mt-auto hidden lg:block opacity-60"></div>
          </div>

          {/* Form Column */}
          <div className="flex flex-col justify-center">
            <div className="enq-fade bg-white/40 p-8 md:p-12 rounded-sm border border-[#2d2d2d]/5 backdrop-blur-sm shadow-sm">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-14 h-14 rounded-full border border-[#b89a6b] flex items-center justify-center mb-5 text-[#b89a6b]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="font-veda-serif text-2xl text-[#2d2d2d] mb-3">Redirecting to WhatsApp</h3>
                  <p className="font-veda-sans text-sm text-[#555] leading-relaxed max-w-sm mb-6">
                    Your visit request details have been prepared for <strong className="text-[#1f1f1f]">{formData.configuration}</strong>. Please press <strong>Send</strong> in WhatsApp to submit your request to our advisory team.
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1a1a1a] text-[#F8F7F4] hover:bg-[#2a2a2a] text-xs uppercase tracking-[0.15em] font-medium transition-all shadow-sm group"
                  >
                    <span>CONTINUE TO WHATSAPP</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 text-xs font-veda-sans text-[#888] hover:text-[#2d2d2d] underline uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Edit details or schedule another visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 md:gap-8">
                  
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label htmlFor="name" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      className={`w-full bg-transparent border-b ${
                        touched.name && errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#2d2d2d]/20 focus:border-[#b89a6b]'
                      } text-[#2d2d2d] py-2 outline-none font-veda-sans text-base transition-colors rounded-none`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-[11px] text-red-600 mt-0.5 font-veda-sans flex items-center gap-1">
                        <span>⚠</span> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label htmlFor="mobile" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-2 font-veda-sans text-base text-[#888] pointer-events-none">+91</span>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        required
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleChange}
                        onBlur={() => handleBlur('mobile')}
                        className={`w-full bg-transparent border-b ${
                          touched.mobile && errors.mobile ? 'border-red-400 focus:border-red-500' : 'border-[#2d2d2d]/20 focus:border-[#b89a6b]'
                        } text-[#2d2d2d] py-2 pl-10 outline-none font-veda-sans text-base transition-colors rounded-none`}
                      />
                    </div>
                    {touched.mobile && errors.mobile && (
                      <p className="text-[11px] text-red-600 mt-0.5 font-veda-sans flex items-center gap-1">
                        <span>⚠</span> {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label htmlFor="email" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      className={`w-full bg-transparent border-b ${
                        touched.email && errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#2d2d2d]/20 focus:border-[#b89a6b]'
                      } text-[#2d2d2d] py-2 outline-none font-veda-sans text-base transition-colors rounded-none`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-[11px] text-red-600 mt-0.5 font-veda-sans flex items-center gap-1">
                        <span>⚠</span> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Select Configuration */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label htmlFor="configuration" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">
                      Select Configuration
                    </label>
                    <div className="relative">
                      <select
                        id="configuration"
                        name="configuration"
                        required
                        value={formData.configuration}
                        onChange={handleChange}
                        onBlur={() => handleBlur('configuration')}
                        className={`w-full bg-transparent border-b ${
                          touched.configuration && errors.configuration ? 'border-red-400 focus:border-red-500' : 'border-[#2d2d2d]/20 focus:border-[#b89a6b]'
                        } text-[#2d2d2d] py-2 outline-none font-veda-sans text-base transition-colors rounded-none appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="bg-[#FAF8F5] text-[#888]">Select your preferred configuration</option>
                        <option value="1,500–1,800 sq. ft." className="bg-[#FAF8F5] text-[#2d2d2d]">1,500–1,800 sq. ft.</option>
                        <option value="1,900–2,300 sq. ft." className="bg-[#FAF8F5] text-[#2d2d2d]">1,900–2,300 sq. ft.</option>
                        <option value="2,300–5,000 sq. ft." className="bg-[#FAF8F5] text-[#2d2d2d]">2,300–5,000 sq. ft.</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                    {touched.configuration && errors.configuration && (
                      <p className="text-[11px] text-red-600 mt-0.5 font-veda-sans flex items-center gap-1">
                        <span>⚠</span> {errors.configuration}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group mt-4 bg-[#1a1a1a] text-[#F8F7F4] hover:bg-[#2a2a2a] px-8 py-4 rounded-full text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-between transition-all duration-300 w-full sm:w-auto self-start shadow-sm disabled:opacity-70 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'PREPARING WHATSAPP...' : 'SCHEDULE YOUR VISIT'}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitToHubSpot, mapFormDataToHubSpot } from '../../utils/hubspot';

gsap.registerPlugin(ScrollTrigger);

export default function EnquirySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    preferredVilla: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit phone number.' });
      return;
    }
    
    if (!formData.preferredVilla) {
      setStatus({ type: 'error', message: 'Please select a preferred villa.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const hubspotFormId = import.meta.env.VITE_HUBSPOT_ENQUIRY_FORM_ID;
      const hubspotData = mapFormDataToHubSpot({ 
        name: formData.name, 
        email: formData.email, 
        mobile: formData.mobile,
        message: `Preferred Villa: ${formData.preferredVilla}`,
        source: 'Projects Page Enquiry Form' 
      });

      const hubspotResult = await submitToHubSpot(hubspotFormId, hubspotData);

      if (hubspotResult.success) {
        setStatus({ type: 'success', message: 'Thank you for your interest. Our team will contact you shortly to arrange your visit.' });
        setFormData({ name: '', mobile: '', email: '', preferredVilla: '' });
      } else {
        setStatus({ type: 'error', message: hubspotResult.message });
      }

      // PHP Fallback
      try {
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          payload.append(key, value.toString());
        });
        payload.append('source', 'Projects Page Enquiry Form');
        await fetch('/api/createLead.php', {
          method: 'POST',
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          body: payload,
        });
      } catch (phpErr) {
        // non-critical error, silently fail fallback
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#F4F1E8] py-24 md:py-32 relative z-20 overflow-hidden">
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
              Your European<br className="hidden md:block"/> Villa Awaits.
            </h2>
            
            <p className="enq-fade font-veda-sans text-base md:text-lg text-[#555] leading-relaxed font-light mb-12 max-w-md">
              Discover a more considered way of living. Share your details and our team will help you explore the right villa for you.
            </p>
            
            {/* Minimal architectural decoration */}
            <div className="enq-fade w-24 h-[120px] border border-[#b89a6b]/30 rounded-t-full mt-auto hidden lg:block opacity-60"></div>
          </div>

          {/* Form Column */}
          <div className="flex flex-col justify-center">
            <div className="enq-fade bg-white/40 p-8 md:p-12 rounded-sm border border-[#2d2d2d]/5 backdrop-blur-sm shadow-sm">
              {status.type === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full border border-[#b89a6b] flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b89a6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="font-veda-serif text-2xl text-[#2d2d2d] mb-4">Enquiry Received</h3>
                  <p className="font-veda-sans text-sm text-[#555] leading-relaxed">{status.message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                  {status.type === 'error' && (
                    <div className="p-4 bg-red-50 text-red-700 text-sm font-veda-sans rounded-sm border border-red-100">
                      {status.message}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="name" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#2d2d2d]/20 text-[#2d2d2d] py-2 outline-none focus:border-[#b89a6b] font-veda-sans text-base transition-colors rounded-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="mobile" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">Phone Number</label>
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
                        className="w-full bg-transparent border-b border-[#2d2d2d]/20 text-[#2d2d2d] py-2 pl-10 outline-none focus:border-[#b89a6b] font-veda-sans text-base transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="email" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#2d2d2d]/20 text-[#2d2d2d] py-2 outline-none focus:border-[#b89a6b] font-veda-sans text-base transition-colors rounded-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="preferredVilla" className="font-veda-sans text-[10px] tracking-widest uppercase text-[#888]">Preferred Villa</label>
                    <div className="relative">
                      <select
                        id="preferredVilla"
                        name="preferredVilla"
                        required
                        value={formData.preferredVilla}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[#2d2d2d]/20 text-[#2d2d2d] py-2 outline-none focus:border-[#b89a6b] font-veda-sans text-base transition-colors rounded-none appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Please select a villa</option>
                        <option value="The Classic">The Classic</option>
                        <option value="Villa Grande">Villa Grande</option>
                        <option value="Villa Royale">Villa Royale</option>
                        <option value="Not decided yet">Not decided yet</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group mt-4 bg-[#1a1a1a] text-[#F8F7F4] hover:bg-[#2a2a2a] px-8 py-4 rounded-full text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-between transition-all duration-300 w-full sm:w-auto self-start shadow-sm disabled:opacity-70"
                  >
                    <span>{isSubmitting ? 'SUBMITTING...' : 'SCHEDULE YOUR VISIT'}</span>
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

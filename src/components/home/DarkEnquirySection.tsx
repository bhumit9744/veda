import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitToHubSpot, mapFormDataToHubSpot } from '../../utils/hubspot';

export default function DarkEnquirySection() {
  const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    mobile: '',
    checkbox: true,
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit phone number.' });
      return;
    }

    try {
      // Submit to HubSpot
      const hubspotFormId = import.meta.env.VITE_HUBSPOT_DARK_ENQUIRY_FORM_ID;
      const hubspotData = mapFormDataToHubSpot({ ...formData, source: 'Homepage Dark Enquiry' });

      const hubspotResult = await submitToHubSpot(hubspotFormId, hubspotData);

      if (hubspotResult.success) {
        setStatus({ type: 'success', message: 'Thank you. A Veda representative will contact you shortly.' });
        setFormData({ name: '', lname: '', email: '', mobile: '', checkbox: true });
      } else {
        setStatus({ type: 'error', message: hubspotResult.message });
      }

      // Also submit to existing PHP API as backup
      try {
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          payload.append(key, value.toString());
        });
        payload.append('source', 'Homepage Dark Enquiry');

        await fetch('/api/createLead.php', {
          method: 'POST',
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          body: payload,
        });
      } catch (phpErr) {
        console.warn('PHP API submission failed (non-critical):', phpErr);
      }

    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
    }
  };

  return (
    <section className="relative w-full bg-[#030705] text-[#F4F1E8] py-32 px-6 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-[#C7A34A]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#010201] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Editorial Typography */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C7A34A] font-medium mb-6">
            Begin Your Journey
          </span>
          <h2 className="font-veda-serif text-5xl md:text-7xl font-light leading-[1.1] tracking-wide mb-8">
            Experience <br/> <i className="text-[#C7A34A]/80">Beyond Living</i>
          </h2>
          <p className="font-veda-sans text-sm md:text-base leading-relaxed text-white/50 max-w-md">
            Register your interest to receive exclusive updates on upcoming developments, priority access to new phases, and invitations to private showcases.
          </p>

          <div className="mt-12 space-y-4">
            <a href="mailto:info@vedalifespaces.in" className="block text-xl md:text-2xl font-light tracking-widest hover:text-[#C7A34A] transition-colors">info@vedalifespaces.in</a>
            <a href="tel:+919619394620" className="block text-xl md:text-2xl font-light tracking-widest hover:text-[#C7A34A] transition-colors">+91 96193 94620</a>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#060D09] p-8 md:p-12 border border-[#C7A34A]/10 rounded-sm relative"
        >
          {/* subtle gold glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A34A]/5 rounded-full blur-[100px] pointer-events-none" />

          {status.message && (
            <div className={`p-4 mb-8 text-sm font-light tracking-wide border ${status.type === 'success' ? 'bg-[#C7A34A]/10 border-[#C7A34A]/30 text-[#F4F1E8]' : 'bg-red-500/10 border-red-500/30 text-red-200'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-10 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 text-[#F4F1E8] py-2 text-sm font-light outline-none transition-all focus:border-[#C7A34A] peer placeholder-transparent"
                  placeholder="First Name"
                />
                <label className="absolute left-0 top-2 text-white/40 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#C7A34A] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest pointer-events-none">
                  First Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="lname"
                  required
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 text-[#F4F1E8] py-2 text-sm font-light outline-none transition-all focus:border-[#C7A34A] peer placeholder-transparent"
                  placeholder="Last Name"
                />
                <label className="absolute left-0 top-2 text-white/40 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#C7A34A] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest pointer-events-none">
                  Last Name
                </label>
              </div>
            </div>

            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-[#F4F1E8] py-2 text-sm font-light outline-none transition-all focus:border-[#C7A34A] peer placeholder-transparent"
                placeholder="Email Address"
              />
              <label className="absolute left-0 top-2 text-white/40 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#C7A34A] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest pointer-events-none">
                Email Address
              </label>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="mobile"
                required
                maxLength={10}
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-[#F4F1E8] py-2 text-sm font-light outline-none transition-all focus:border-[#C7A34A] peer placeholder-transparent"
                placeholder="Phone Number"
              />
              <label className="absolute left-0 top-2 text-white/40 text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#C7A34A] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest pointer-events-none">
                Phone Number
              </label>
            </div>

            <div className="flex items-start gap-4 mt-2">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="authorize-dark"
                  required
                  checked={formData.checkbox}
                  onChange={handleChange}
                  className="w-4 h-4 appearance-none border border-white/30 rounded-sm checked:bg-[#C7A34A] checked:border-[#C7A34A] transition-colors cursor-pointer"
                />
                {formData.checkbox && (
                  <svg className="absolute w-3 h-3 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <label htmlFor="authorize-dark" className="text-[11px] leading-relaxed text-white/40 cursor-pointer hover:text-white/70 transition-colors">
                I authorize Veda Life Spaces and its representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC / NDNC.
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                type="submit" 
                className="group relative inline-flex items-center gap-4 bg-transparent border border-[#C7A34A]/50 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-500 hover:border-[#C7A34A]"
              >
                <div className="absolute inset-0 w-0 bg-[#C7A34A] transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 text-[#C7A34A] group-hover:text-[#030705] transition-colors duration-500">Submit Details</span>
                <span className="relative z-10 text-[#C7A34A] group-hover:text-[#030705] group-hover:translate-x-1 transition-all duration-500">→</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}

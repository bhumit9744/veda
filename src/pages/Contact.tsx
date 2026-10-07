import React, { useState } from 'react';
import { submitToHubSpot, mapFormDataToHubSpot } from '../utils/hubspot';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    mobile: '',
    message: '',
    checkbox: true,
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
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
      const hubspotFormId = import.meta.env.VITE_HUBSPOT_CONTACT_FORM_ID;
      const hubspotData = mapFormDataToHubSpot({ ...formData, source: 'Contact Us Form' });

      const hubspotResult = await submitToHubSpot(hubspotFormId, hubspotData);

      if (hubspotResult.success) {
        setStatus({ type: 'success', message: 'Thank you for your message. We will get back to you shortly.' });
        setFormData({ name: '', lname: '', email: '', mobile: '', message: '', checkbox: true });
      } else {
        setStatus({ type: 'error', message: hubspotResult.message });
      }

      // Also submit to existing PHP API as backup
      try {
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          payload.append(key, value.toString());
        });
        payload.append('source', 'Contact Us Form');

        await fetch('/api/createLead.php', {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
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
    <div className="w-full font-sans bg-[#f4f2ef]">
      <section className="w-full py-20 md:py-[150px] relative">
        <div className="container mx-auto px-[5%] max-w-7xl">
          
          <div className="text-center mb-10 md:mb-[60px]">
            <h2 className="text-4xl md:text-[58px] leading-tight text-[#b89a5c] font-normal mb-5 font-sans">Contact Us</h2>
            <p className="text-base md:text-[20px] leading-[25px] md:leading-[34px] text-[#2f2f2f] max-w-[850px] mx-auto font-light font-sans">
              Please leave your details and our team will get in touch with you shortly.
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 lg:p-[60px] rounded-none md:rounded-[14px] lg:rounded-none shadow-[0_8px_30px_rgba(0,0,0,0.06)] max-w-[1100px] mx-auto">
            {status.message && (
              <div className={`p-4 mb-6 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="First Name*"
                  required
                  maxLength={50}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-[45px] md:h-[60px] border border-[#d9d9d9] px-[22px] text-[14px] md:text-[16px] text-[#2f2f2f] outline-none focus:border-[#b9974c] transition-colors placeholder:text-[#888]"
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name*"
                  required
                  maxLength={50}
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-full h-[45px] md:h-[60px] border border-[#d9d9d9] px-[22px] text-[14px] md:text-[16px] text-[#2f2f2f] outline-none focus:border-[#b9974c] transition-colors placeholder:text-[#888]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[45px] md:h-[60px] border border-[#d9d9d9] px-[22px] text-[14px] md:text-[16px] text-[#2f2f2f] outline-none focus:border-[#b9974c] transition-colors placeholder:text-[#888]"
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Phone Number*"
                  required
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full h-[45px] md:h-[60px] border border-[#d9d9d9] px-[22px] text-[14px] md:text-[16px] text-[#2f2f2f] outline-none focus:border-[#b9974c] transition-colors placeholder:text-[#888]"
                />
              </div>
              
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full h-[150px] md:h-[180px] border border-[#d9d9d9] p-[22px] pt-[18px] text-[14px] md:text-[16px] text-[#2f2f2f] outline-none focus:border-[#b9974c] transition-colors placeholder:text-[#888] resize-none"
              ></textarea>

              <div className="relative pl-[15px] md:pl-[30px]">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="iauthorise3"
                  required
                  checked={formData.checkbox}
                  onChange={handleChange}
                  className="absolute left-0 top-[5px]"
                />
                <label htmlFor="iauthorise3" className="text-[9px] md:text-[14px] leading-[19px] md:leading-[26px] text-[#555] m-0 block">
                  I authorize Veda Life Spaces and its representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC / NDNC.
                </label>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="w-[70%] md:w-auto md:min-w-[220px] h-[40px] md:h-[58px] bg-[#b9974c] text-white text-[14px] md:text-[18px] font-medium rounded-lg hover:bg-[#222] hover:text-[#b9974c] transition-colors"
                >
                  Submit Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { submitToHubSpot, mapFormDataToHubSpot } from '../utils/hubspot';

export default function EnquiryForm({ inline = false }: { inline?: boolean }) {
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

    // Validate phone
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit phone number.' });
      return;
    }

    try {
      // Submit to HubSpot
      const hubspotFormId = import.meta.env.VITE_HUBSPOT_ENQUIRY_FORM_ID;
      const hubspotData = mapFormDataToHubSpot({ ...formData, source: 'Enquiry Inline' });

      const hubspotResult = await submitToHubSpot(hubspotFormId, hubspotData);

      if (hubspotResult.success) {
        setStatus({ type: 'success', message: 'Thank you for your enquiry. We will get back to you soon.' });
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
        payload.append('source', 'Enquiry Inline');

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
    <div className={`bg-bg-beige ${inline ? 'w-full' : 'p-6 border border-gray-200 shadow-sm'}`}>
      {!inline && (
        <>
          <p className="text-primary mb-2 text-sm text-left font-medium">Get In Touch</p>
          <h2 className="text-2xl text-left mb-4 text-text-dark font-medium">Register Your Interest</h2>
        </>
      )}

      {status.message && (
        <div className={`p-3 mb-4 text-sm rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="First Name*"
            required
            maxLength={50}
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-brand-gold/35 text-text-dark py-2 outline-none focus:border-brand-gold placeholder:text-gray-400"
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name*"
            required
            maxLength={50}
            value={formData.lname}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-brand-gold/35 text-text-dark py-2 outline-none focus:border-brand-gold placeholder:text-gray-400"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address*"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-brand-gold/35 text-text-dark py-2 outline-none focus:border-brand-gold placeholder:text-gray-400"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Phone Number*"
          required
          maxLength={10}
          value={formData.mobile}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-brand-gold/35 text-text-dark py-2 outline-none focus:border-brand-gold placeholder:text-gray-400"
        />
        <div className="flex items-start gap-2 mt-2">
          <input
            type="checkbox"
            name="checkbox"
            id={`authorize-${inline ? 'inline' : 'block'}`}
            required
            checked={formData.checkbox}
            onChange={handleChange}
            className="mt-1"
          />
          <label htmlFor={`authorize-${inline ? 'inline' : 'block'}`} className="text-xs text-text-light text-left leading-tight">
            I authorize Veda Life Spaces and its representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC / NDNC.
          </label>
        </div>
        <div>
          <button type="submit" className="mt-2 text-sm px-5 py-2 border border-brand-gold/60 text-[#926536] rounded hover:bg-brand-gold hover:text-white transition-colors">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

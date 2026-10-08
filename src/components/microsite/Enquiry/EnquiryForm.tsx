import { useState } from 'react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    villa: '',
    checkbox: true,
  });
  
  const [status, setStatus] = useState<{ type: 'submitting' | 'success' | 'error' | 'idle'; message: string }>({ type: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = type === 'checkbox' ? e.target.checked : undefined;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'idle', message: '' });

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit phone number.' });
      return;
    }

    setStatus({ type: 'submitting', message: 'Submitting...' });

    try {
      const payload = new FormData();
      // API expects name, lname, email, mobile, source
      // We are merging first/last name into 'name' for minimal fields, or we just send it as name
      payload.append('name', formData.name);
      payload.append('lname', ''); 
      payload.append('email', formData.email);
      payload.append('mobile', formData.mobile);
      payload.append('source', `Microsite - ${formData.villa || 'General'}`);

      const response = await fetch('/api/createLead.php', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: payload,
      });

      const data = await response.json();
      if (data.status === 'success') {
        setStatus({ type: 'success', message: 'THANK YOU. Your visit request has been received.' });
        setFormData({ name: '', email: '', mobile: '', villa: '', checkbox: true });
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to submit form.' });
    }
  };

  if (status.type === 'success') {
    return (
      <div className="bg-veda-white/90 backdrop-blur-md border border-veda-border p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-xl">
        <div className="w-16 h-[1px] bg-veda-gold mb-8"></div>
        <h3 className="text-3xl font-editorial text-veda-forest uppercase mb-4 tracking-widest">Thank You.</h3>
        <p className="text-veda-text-secondary font-light tracking-wide">
          Your visit request has been received. Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative">

      {status.type === 'error' && (
        <div className="text-red-400 text-sm mb-6 text-center tracking-wide font-light">
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        <div className="relative">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-veda-border text-veda-forest py-2 outline-none focus:border-veda-gold transition-colors"
          />
          <label className="absolute left-0 top-2 text-veda-text-secondary text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-veda-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-veda-gold">
            Name
          </label>
        </div>

        <div className="relative">
          <input
            type="tel"
            name="mobile"
            required
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-veda-border text-veda-forest py-2 outline-none focus:border-veda-gold transition-colors"
          />
          <label className="absolute left-0 top-2 text-veda-text-secondary text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-veda-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-veda-gold">
            Phone
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-veda-border text-veda-forest py-2 outline-none focus:border-veda-gold transition-colors"
          />
          <label className="absolute left-0 top-2 text-veda-text-secondary text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-veda-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-veda-gold">
            Email
          </label>
        </div>

        <div className="relative">
          <select
            name="villa"
            value={formData.villa}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-veda-border text-veda-forest py-2 outline-none focus:border-veda-gold transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-veda-ivory text-veda-forest">Select Preference (Optional)</option>
            <option value="Villa A" className="bg-veda-ivory text-veda-forest">Villa A</option>
            <option value="Villa B" className="bg-veda-ivory text-veda-forest">Villa B</option>
            <option value="Villa C" className="bg-veda-ivory text-veda-forest">Villa C</option>
          </select>
          <div className="absolute right-0 top-3 pointer-events-none text-veda-text-secondary">▼</div>
        </div>

        <button 
          type="submit" 
          disabled={status.type === 'submitting'}
          className="mt-4 w-full border border-veda-forest text-veda-forest py-4 text-xs tracking-[0.2em] uppercase hover:bg-veda-forest hover:text-white transition-colors disabled:opacity-50"
        >
          {status.type === 'submitting' ? 'Submitting...' : 'Submit Request'}
        </button>

      </form>
    </div>
  );
}

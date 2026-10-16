import React, { useState, useEffect, useRef } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVilla?: string;
}

interface FormState {
  name: string;
  email: string;
  mobile: string;
  villa: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  villa?: string;
}

const VILLA_OPTIONS = [
  'Villa Classic',
  'Villa Grande',
  'Villa Royale',
  'Not Sure Yet',
] as const;

export const validateIndianMobile = (value: string): { isValid: boolean; cleanNumber: string } => {
  const cleaned = value.replace(/[\s\-()]/g, '');
  let digits = cleaned;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  const isValid = /^[6-9]\d{9}$/.test(digits) || /^[0-9]{10}$/.test(digits);
  return { isValid, cleanNumber: digits };
};

export const validateEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export default function EnquiryModal({ isOpen, onClose, preselectedVilla }: EnquiryModalProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    mobile: '',
    villa: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [K in keyof FormState]?: boolean }>({});
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Sync preselected villa when modal opens or preselection changes
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setWhatsappUrl(null);
      setErrors({});
      setTouched({});
      if (preselectedVilla) {
        setFormData(prev => ({ ...prev, villa: preselectedVilla }));
      }
    }
  }, [isOpen, preselectedVilla]);

  // Lock background scrolling and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus first input on open
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 150);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof FormState, value: string): boolean => {
    let error: string | undefined;

    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Please enter your full name.';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters.';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Please enter your email address.';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address.';
        }
        break;

      case 'mobile':
        if (!value.trim()) {
          error = 'Please enter your mobile number.';
        } else {
          const { isValid } = validateIndianMobile(value);
          if (!isValid) {
            error = 'Please enter a valid 10-digit mobile number.';
          }
        }
        break;

      case 'villa':
        if (!value) {
          error = 'Please select your preferred villa.';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateAll = (): { isValid: boolean; cleanMobile: string } => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const { isValid: isMobileValid, cleanNumber } = validateIndianMobile(formData.mobile);
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Please enter your mobile number.';
    } else if (!isMobileValid) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.villa) {
      newErrors.villa = 'Please select your preferred villa.';
    }

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      mobile: true,
      villa: true,
    });

    const isValid = Object.keys(newErrors).length === 0;
    return { isValid, cleanMobile: cleanNumber };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { isValid, cleanMobile } = validateAll();
    if (!isValid) return;

    const formattedMobile = `+91 ${cleanMobile}`;
    const messageLines = [
      'Hello Veda Life Spaces Team,',
      '',
      'I would like to enquire about Veda Life Spaces.',
      '',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formattedMobile}`,
      `Email: ${formData.email.trim()}`,
      `Preferred Villa: ${formData.villa}`,
      '',
      'I would like to receive the pricing, floor plans and details about scheduling a site visit.',
      '',
      'Please contact me to discuss the next steps.',
      '',
      'Thank you.'
    ];

    const message = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(message);
    const destination = '919619394620';
    const url = `https://wa.me/${destination}?text=${encodedMessage}`;

    setWhatsappUrl(url);
    setIsSubmitted(true);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Browser popup blocked, visible Continue to WhatsApp button provided below
    }

    // Optional silent backup lead logging
    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('mobile', cleanMobile);
      payload.append('email', formData.email.trim());
      payload.append('preferredVilla', formData.villa);
      payload.append('source', 'Shared Site-wide Enquiry Modal');
      fetch('/api/createLead.php', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: payload,
      }).catch(() => {});
    } catch {
      // Non-critical, ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF8F5] text-[#1f1f1f] rounded-lg sm:rounded-xl border border-[#e5decb] shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-300 transform scale-100 my-auto p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(158, 113, 56, 0.15)',
        }}
      >
        {/* Subtle decorative gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b59a68] via-[#9e7138] to-[#b59a68]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-[#7a746e] hover:text-[#1f1f1f] hover:bg-black/[0.05] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] cursor-pointer"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            {/* Modal Header */}
            <div className="pr-8 mb-6">
              <span className="block text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase text-[#9e7138] mb-1.5">
                Veda Life Spaces • Private Advisory
              </span>
              <h2
                id="enquiry-modal-title"
                className="font-serif text-2xl sm:text-3xl text-[#1f1f1f] font-normal tracking-tight"
              >
                Let&apos;s Plan Your Visit
              </h2>
              <div className="w-12 h-[1.5px] bg-[#9e7138]/60 my-2.5" />
              <p className="text-xs sm:text-sm text-[#5f5a54] leading-relaxed">
                Share your details to receive customized pricing, architectural floor plans, or arrange a private site visit in Alibaug.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-4.5">
              {/* Name Field */}
              <div>
                <label htmlFor="enquiry-name" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Full Name <span className="text-[#9e7138]">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="enquiry-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your full name"
                  className={`w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white text-[#1f1f1f] rounded border ${
                    touched.name && errors.name
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-[#d8d0c2] hover:border-[#b8ad9b] focus:border-[#9e7138] focus:ring-1 focus:ring-[#9e7138]'
                  } focus:outline-none transition-colors placeholder:text-[#a09a90]`}
                  required
                />
                {touched.name && errors.name && (
                  <p className="text-[11px] text-rose-600 mt-1 font-normal flex items-center gap-1">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="enquiry-mobile" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Phone Number <span className="text-[#9e7138]">*</span>
                </label>
                <div className="relative flex rounded">
                  <span className="inline-flex items-center px-3 text-xs sm:text-sm font-medium text-[#5f5a54] bg-[#f0eae1] border border-r-0 border-[#d8d0c2] rounded-l select-none">
                    +91
                  </span>
                  <input
                    id="enquiry-mobile"
                    type="tel"
                    name="mobile"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={() => handleBlur('mobile')}
                    placeholder="Enter your 10-digit mobile number"
                    className={`w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white text-[#1f1f1f] rounded-r border ${
                      touched.mobile && errors.mobile
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-[#d8d0c2] hover:border-[#b8ad9b] focus:border-[#9e7138] focus:ring-1 focus:ring-[#9e7138]'
                    } focus:outline-none transition-colors placeholder:text-[#a09a90]`}
                    required
                  />
                </div>
                {touched.mobile && errors.mobile && (
                  <p className="text-[11px] text-rose-600 mt-1 font-normal flex items-center gap-1">
                    <span>⚠</span> {errors.mobile}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="enquiry-email" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Email Address <span className="text-[#9e7138]">*</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="Enter your email address"
                  className={`w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white text-[#1f1f1f] rounded border ${
                    touched.email && errors.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-[#d8d0c2] hover:border-[#b8ad9b] focus:border-[#9e7138] focus:ring-1 focus:ring-[#9e7138]'
                  } focus:outline-none transition-colors placeholder:text-[#a09a90]`}
                  required
                />
                {touched.email && errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1 font-normal flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Preferred Villa Dropdown */}
              <div>
                <label htmlFor="enquiry-villa" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Preferred Villa <span className="text-[#9e7138]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="enquiry-villa"
                    name="villa"
                    value={formData.villa}
                    onChange={handleChange}
                    onBlur={() => handleBlur('villa')}
                    className={`w-full appearance-none px-3.5 py-2.5 sm:py-3 text-sm bg-white text-[#1f1f1f] rounded border ${
                      touched.villa && errors.villa
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-[#d8d0c2] hover:border-[#b8ad9b] focus:border-[#9e7138] focus:ring-1 focus:ring-[#9e7138]'
                    } focus:outline-none transition-colors cursor-pointer`}
                    required
                  >
                    <option value="" disabled className="text-[#a09a90]">
                      Select your preferred villa
                    </option>
                    {VILLA_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="text-[#1f1f1f]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#7a746e]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                {touched.villa && errors.villa && (
                  <p className="text-[11px] text-rose-600 mt-1 font-normal flex items-center gap-1">
                    <span>⚠</span> {errors.villa}
                  </p>
                )}
              </div>

              {/* Informational WhatsApp Notice */}
              <div className="bg-[#f3ede3]/80 border border-[#e5decb] rounded p-3 text-[11px] sm:text-xs text-[#5e5850] leading-relaxed flex items-start gap-2">
                <span className="text-[#9e7138] text-sm shrink-0">💬</span>
                <span>
                  You will be redirected to WhatsApp with your prefilled enquiry details. Please press send in WhatsApp to submit to our advisory team.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#9e7138] hover:bg-[#8b632f] active:bg-[#7a5628]
                             text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm
                             border border-[#d8b075]/70 shadow-[0_2px_8px_rgba(158,113,56,0.3)]
                             hover:shadow-[0_4px_16px_rgba(158,113,56,0.45)] hover:-translate-y-0.5 active:translate-y-0
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] focus-visible:ring-offset-2
                             transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>CONTINUE TO WHATSAPP</span>
                  <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Submission Screen */
          <div className="py-6 sm:py-8 text-center flex flex-col items-center justify-center animate-fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#9e7138]/10 text-[#9e7138] flex items-center justify-center mb-4 sm:mb-5 border border-[#9e7138]/25">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1f1f1f] mb-2 sm:mb-3">
              Redirecting to WhatsApp
            </h3>
            
            <p className="text-xs sm:text-sm text-[#5f5a54] max-w-sm mb-6 sm:mb-7 leading-relaxed">
              Your enquiry has been prepared for <strong className="text-[#1f1f1f]">{formData.villa}</strong>. Please press send in WhatsApp to submit to our team.
            </p>

            {whatsappUrl && (
              <div className="w-full flex flex-col items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.14em] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.077-1.745-.371-.84-.339-1.488-.859-2.072-1.442-.647-.648-1.042-1.424-1.189-1.67-.147-.247-.023-.429.1-.552.11-.11.247-.282.37-.424.124-.143.165-.244.248-.405.082-.161.041-.302-.021-.424-.062-.122-.555-1.336-.761-1.831-.2-.482-.405-.417-.555-.425-.143-.008-.309-.01-.475-.01s-.436.062-.664.312c-.228.249-.871.851-.871 2.076 0 1.224.892 2.408 1.017 2.573.124.165 1.755 2.68 4.252 3.757.594.256 1.058.409 1.42.524.597.189 1.14.162 1.569.098.479-.071 1.474-.602 1.681-1.184.207-.582.207-1.08.145-1.185-.062-.104-.228-.166-.476-.289z"/>
                  </svg>
                  <span>CONTINUE TO WHATSAPP</span>
                  <span>↗</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 text-xs text-[#7a746e] hover:text-[#1f1f1f] underline transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

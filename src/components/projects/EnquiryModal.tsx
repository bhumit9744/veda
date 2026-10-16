import React, { useState, useEffect, useRef } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  mobile: string;
  configuration: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  configuration?: string;
}

const CONFIGURATION_OPTIONS = [
  '1,500–1,800 sq. ft.',
  '1,900–2,300 sq. ft.',
  '2,300–5,000 sq. ft.',
] as const;

export const validateIndianMobile = (value: string): { isValid: boolean; cleanNumber: string } => {
  const cleaned = value.replace(/[\s\-\(\)]/g, '');
  let digits = cleaned;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  const isValid = /^[6-9]\d{9}$/.test(digits);
  return { isValid, cleanNumber: digits };
};

export const validateEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    mobile: '',
    configuration: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [K in keyof FormState]?: boolean }>({});
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

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

  // Reset submitted state when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setWhatsappUrl(null);
      setPopupBlocked(false);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for field if any
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
            error = 'Please enter a valid 10-digit Indian mobile number.';
          }
        }
        break;

      case 'configuration':
        if (!value) {
          error = 'Please select a preferred configuration.';
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
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.configuration) {
      newErrors.configuration = 'Please select a preferred configuration.';
    }

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      mobile: true,
      configuration: true,
    });

    const isValid = Object.keys(newErrors).length === 0;
    return { isValid, cleanMobile: cleanNumber };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { isValid, cleanMobile } = validateAll();
    if (!isValid) return;

    // Exact WhatsApp message format per specifications
    const formattedMobile = `+91 ${cleanMobile}`;
    const messageLines = [
      'Hello Veda Life Spaces Team,',
      '',
      'I am interested in getting the price details and floor plans for Veda Life Spaces.',
      '',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Mobile: ${formattedMobile}`,
      `Preferred Configuration: ${formData.configuration}`,
      '',
      'Please share the pricing details, floor plan, and further information about the selected configuration.',
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
      const newTab = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        setPopupBlocked(true);
      }
    } catch {
      setPopupBlocked(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
      onClick={(e) => {
        // Close on backdrop click
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
        className="relative w-full max-w-lg bg-[#FAF8F5] text-[#1f1f1f] rounded-lg sm:rounded-xl border border-[#e5decb] shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-300 transform scale-100 my-auto p-6 sm:p-8"
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
          className="absolute top-5 right-5 p-2 text-[#7a746e] hover:text-[#1f1f1f] hover:bg-black/[0.05] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138]"
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
              <span className="block text-[11px] font-medium tracking-[0.22em] uppercase text-[#9e7138] mb-1.5">
                Veda Life Spaces • Monteza
              </span>
              <h2
                id="enquiry-modal-title"
                className="font-serif text-2xl sm:text-3xl text-[#1f1f1f] font-normal tracking-tight"
              >
                Get Price &amp; Floor Plans
              </h2>
              <div className="w-12 h-[1.5px] bg-[#9e7138]/60 my-2.5" />
              <p className="text-xs sm:text-sm text-[#5f5a54] leading-relaxed">
                Share your details to receive villa configurations and pricing information from our team.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-4.5">
              {/* Name Field */}
              <div>
                <label htmlFor="enquiry-name" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Name <span className="text-[#9e7138]">*</span>
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

              {/* Email Field */}
              <div>
                <label htmlFor="enquiry-email" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Email <span className="text-[#9e7138]">*</span>
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

              {/* Mobile Number Field */}
              <div>
                <label htmlFor="enquiry-mobile" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Mobile Number <span className="text-[#9e7138]">*</span>
                </label>
                <div className="relative flex rounded">
                  <span className="inline-flex items-center px-3 text-xs sm:text-sm font-medium text-[#5f5a54] bg-[#f0eae1] border border-r-0 border-[#d8d0c2] rounded-l">
                    +91
                  </span>
                  <input
                    id="enquiry-mobile"
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={() => handleBlur('mobile')}
                    placeholder="Enter your mobile number"
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

              {/* Configuration Dropdown */}
              <div>
                <label htmlFor="enquiry-config" className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4a453f] mb-1.5">
                  Select Configuration <span className="text-[#9e7138]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="enquiry-config"
                    name="configuration"
                    value={formData.configuration}
                    onChange={handleChange}
                    onBlur={() => handleBlur('configuration')}
                    className={`w-full appearance-none px-3.5 py-2.5 sm:py-3 text-sm bg-white text-[#1f1f1f] rounded border ${
                      touched.configuration && errors.configuration
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-[#d8d0c2] hover:border-[#b8ad9b] focus:border-[#9e7138] focus:ring-1 focus:ring-[#9e7138]'
                    } focus:outline-none transition-colors cursor-pointer`}
                    required
                  >
                    <option value="" disabled className="text-[#a09a90]">
                      Select your preferred configuration
                    </option>
                    {CONFIGURATION_OPTIONS.map((opt) => (
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
                {touched.configuration && errors.configuration && (
                  <p className="text-[11px] text-rose-600 mt-1 font-normal flex items-center gap-1">
                    <span>⚠</span> {errors.configuration}
                  </p>
                )}
              </div>

              {/* Informational WhatsApp Notice */}
              <div className="bg-[#f3ede3]/80 border border-[#e5decb] rounded p-3 text-[11px] sm:text-xs text-[#5e5850] leading-relaxed flex items-start gap-2">
                <span className="text-[#9e7138] text-sm shrink-0">💬</span>
                <span>
                  You will be redirected to WhatsApp with your prefilled enquiry details. Please tap send in WhatsApp to share with our advisory team.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-[3px] bg-[#9e7138] hover:bg-[#8b632f] active:bg-[#7a5628]
                             text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm
                             border border-[#d8b075]/70 shadow-[0_2px_8px_rgba(158,113,56,0.3)]
                             hover:shadow-[0_4px_16px_rgba(158,113,56,0.45)] hover:-translate-y-0.5 active:translate-y-0
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7138] focus-visible:ring-offset-2
                             transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>SEND ENQUIRY ON WHATSAPP</span>
                  <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Confirmation & Fallback View */
          <div className="py-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#9e7138]/10 text-[#9e7138] mx-auto flex items-center justify-center text-2xl border border-[#9e7138]/20">
              💬
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[#1f1f1f] font-normal mb-1">
                Redirecting to WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-[#5f5a54] max-w-sm mx-auto leading-relaxed">
                Your enquiry message has been prepared for configuration{' '}
                <strong className="text-[#1f1f1f]">{formData.configuration}</strong>. Please press send in WhatsApp to submit to our team.
              </p>
            </div>

            {whatsappUrl && (
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-[3px]
                             bg-[#9e7138] hover:bg-[#8b632f] active:bg-[#7a5628]
                             text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm
                             border border-[#d8b075]/70 shadow-[0_2px_8px_rgba(158,113,56,0.3)]
                             hover:shadow-[0_4px_16px_rgba(158,113,56,0.45)] hover:-translate-y-0.5
                             transition-all duration-200"
                >
                  <span>CONTINUE TO WHATSAPP</span>
                  <span className="text-base leading-none">↗</span>
                </a>

                {popupBlocked && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2.5">
                    Your browser blocked the popup tab. Please tap the button above to continue directly.
                  </p>
                )}

                <p className="text-[11px] text-[#7a746e]">
                  Destination: <span className="font-mono text-[#1f1f1f] font-medium">+91 96193 94620</span>
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#9e7138] hover:underline cursor-pointer"
              >
                ← Edit Details
              </button>
              <span className="text-[#d8d0c2]">|</span>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#7a746e] hover:text-[#1f1f1f] cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

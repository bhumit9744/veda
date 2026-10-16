import React from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

interface EnquireButtonProps {
  villa?: string;
  text?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'compact' | 'light';
  onClick?: () => void;
}

export default function EnquireButton({
  villa,
  text = 'ENQUIRE NOW',
  className = '',
  variant = 'primary',
  onClick
}: EnquireButtonProps) {
  const { openModal } = useEnquiryModal();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
    openModal(villa);
  };

  const baseStyles = "inline-flex items-center justify-center font-medium uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer select-none group";

  const variants = {
    primary: "bg-[#9e7138] hover:bg-[#88602c] active:bg-[#745023] text-white text-xs px-6 py-3 rounded-full border border-[#d8b075]/40 shadow-[0_4px_16px_rgba(158,113,56,0.3)] hover:shadow-[0_6px_22px_rgba(158,113,56,0.45)] hover:-translate-y-0.5",
    secondary: "bg-[#1a1a1a] hover:bg-[#2a2a2a] active:bg-black text-[#F8F7F4] text-xs px-6 py-3 rounded-full shadow-sm hover:shadow hover:-translate-y-0.5",
    outline: "bg-transparent hover:bg-[#9e7138]/10 text-[#9e7138] hover:text-[#745023] border border-[#9e7138]/50 hover:border-[#9e7138] text-xs px-5 py-2.5 rounded-full hover:-translate-y-0.5",
    compact: "bg-[#9e7138] hover:bg-[#88602c] text-white text-[11px] tracking-[0.16em] px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(158,113,56,0.25)] hover:shadow-[0_4px_14px_rgba(158,113,56,0.4)] hover:-translate-y-0.5",
    light: "bg-white/90 hover:bg-white text-[#1f1f1f] hover:text-[#9e7138] text-xs px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 border border-white/60"
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      aria-label={`${text}${villa ? ` about ${villa}` : ''}`}
    >
      <span>{text}</span>
      <span className="ml-1.5 text-[13px] leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </button>
  );
}

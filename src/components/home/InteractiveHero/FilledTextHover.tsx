import React from 'react';
import { vedaContent } from '../../../content/vedaContent';

export default function FilledTextHover({ scrollProgress }: { scrollProgress: number }) {
  // Formatting the text specifically for this block
  const quoteText = "“WE BELIEVE GOOD LAND IS FOUND.\nGREAT OPPORTUNITIES ARE CREATED.”";

  return (
    <div 
      className="relative w-full mx-auto flex flex-col items-center justify-center py-16 gap-8 md:gap-12 z-50 pointer-events-auto cursor-default mt-12 md:mt-24"
    >

      <div className="relative flex flex-col gap-8 md:gap-12 w-full items-center text-center pt-12 md:pt-0">
        <div className="relative max-w-5xl mx-auto px-4">
          <TextBlock text={quoteText} />
        </div>
      </div>


      {/* Support copy below hero */}
      <div 
        className="w-full flex flex-col items-center justify-center pointer-events-auto mt-4 px-6"
        style={{ opacity: scrollProgress > 0.5 ? 0 : 1, transition: 'opacity 0.5s' }}
      >
        <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto text-white/70 leading-relaxed mb-6">
          {vedaContent.hero.body}
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] md:text-xs uppercase tracking-widest text-[#C7A34A]">
          {vedaContent.hero.phrases.map((phrase, i) => (
            <span key={i}>{phrase}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-8 flex flex-col items-center gap-4 text-[#F0EBDD]/60 animate-pulse">
        <span className="text-[10px] md:text-xs uppercase tracking-widest">Scroll to Enter</span>
        <span className="text-sm md:text-lg">↓</span>
      </div>

    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <div className="relative font-body font-light tracking-widest text-base md:text-xl lg:text-3xl xl:text-4xl uppercase leading-[1.6] md:leading-[1.5] text-[#F0EBDD]/90 md:whitespace-nowrap">
      {text.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}<br/>
        </React.Fragment>
      ))}
    </div>
  );
}

import { useEffect } from 'react';

export default function FAQ() {
  useEffect(() => {
    // Dynamically load the external JS for FAQ if needed
    const script = document.createElement('script');
    script.src = '/assets/js/new-section.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full font-sans">
      <section className="bg-[#fcfbf9] py-16 md:py-24" id="faq">
        <div className="container mx-auto px-[5%] max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-[#b89a6b] font-medium tracking-widest uppercase text-sm mb-4 block">FAQs</span>
            <h2 className="text-3xl md:text-5xl font-normal text-[#1a1a1a] mb-6">Questions, <em className="italic text-[#b89a6b]">Answered</em></h2>
            <p className="text-base md:text-lg text-[#555] max-w-2xl mx-auto">200 answers on land, legal process, and construction — organized so you can find yours in seconds.</p>
          </div>
       
          <div className="border-b border-[#e5e5e5] mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
            <div className="flex gap-6 min-w-max mx-auto justify-center" id="vfqGroupTabs" role="tablist"></div>
          </div>
       
          <div className="flex flex-col md:flex-row gap-10">
            <aside className="w-full md:w-1/4 sticky top-24 h-max" id="vfqSidebar"></aside>
            <div className="w-full md:w-3/4">
              <p className="text-sm text-[#888] font-medium mb-6 uppercase tracking-wider" id="vfqResultsMeta"></p>
              <div className="flex flex-col gap-4" id="vfqList"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

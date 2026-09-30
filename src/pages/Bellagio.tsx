import { useState, useEffect } from 'react';

export default function Bellagio() {
  const [activeSection, setActiveSection] = useState('');
  const [showSubnav, setShowSubnav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowSubnav(scrollTop > 100);

      const sections = ['about', 'amenities', 'location', 'plans', 'prices', 'gallery'];
      let current = '';
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full font-sans">
      <section className="relative w-full h-screen">
        <div 
          className="absolute inset-0 w-full h-full -scale-x-100 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('/assets/images/bellagio/img268.jpg')" }}
        ></div>
      </section>

      <div className={`fixed top-[63px] w-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] z-[1001] border-b border-[#e0d6c8] transition-transform duration-300 ${showSubnav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-center items-center gap-7 py-3 px-[5%] flex-wrap max-w-[1300px] mx-auto">
          {['about', 'amenities', 'location', 'plans', 'prices', 'gallery'].map(item => (
            <button 
              key={item}
              onClick={() => scrollTo(item)} 
              className={`text-[12px] font-semibold uppercase tracking-[0.5px] transition-colors relative py-1 cursor-pointer
                ${activeSection === item ? 'text-[#b89a6b]' : 'text-[#0f365e] hover:text-[#b89a6b]'}
              `}
            >
              {item}
              {activeSection === item && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b89a6b]"></span>}
            </button>
          ))}
          <a href="https://api.whatsapp.com/send?phone=919619394620" target="_blank" rel="noreferrer" className="bg-[#f0ede8] text-[#0f365e] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 text-[12px] font-semibold">
            <i className="far fa-comment-dots text-[#b89a6b]"></i> CHAT
          </a>
          <button className="bg-[#b89a6b] text-white px-4 py-1.5 rounded text-[12px] font-semibold hover:bg-[#926228] transition-colors">
            ENQUIRE
          </button>
        </div>
      </div>

      <section id="about" className="pt-20 pb-10">
        <div className="container mx-auto px-[5%] text-center">
          <h5 className="text-sm uppercase tracking-widest text-[#b89a6b] mb-4">Codename</h5>
          <img src="/assets/images/bellagio/codenamelogo.PNG" alt="Bellagio" className="mx-auto max-w-full h-auto mb-6" />
          <p className="text-[#555] max-w-2xl mx-auto text-lg">
            Begin your journey to owning a piece of paradise in Alibaug. Limited plots available.
          </p>
        </div>
      </section>

      <section className="py-16 px-[5%] flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          <img src="/assets/images/bellagio/about-1.PNG" alt="Modern Architecture" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl text-[#b89a6b] font-normal mb-6 leading-tight">Alibaug is where life slows down on weekends.</h2>
          <div className="text-[#555] flex flex-col gap-4 text-lg">
            <p>Once a quiet coastal escape, Alibaug has evolved into the preferred retreat for Mumbai's discerning few. Lush landscapes, serene beaches, peaceful surroundings, and effortless access make it a clear favourite.</p>
            <p>The Horizon Bellagio offers you the opportunity to own a piece of this paradise. Where nature meets luxury, and every weekend feels like a celebration.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-[5%] flex flex-col-reverse md:flex-row items-center gap-10 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl text-[#b89a6b] font-normal mb-6 leading-tight">Build Your Legacy</h2>
          <div className="text-[#555] flex flex-col gap-4 text-lg mb-8">
            <p>Invest in premium villa plots that offer more than just land they offer a canvas for your dreams. Design and build your perfect retreat at your own pace, with the freedom to create a home that reflects your vision.</p>
            <p>With excellent appreciation potential and strategic location advantages, these plots are not just an investment in property, but an investment in your family's future.</p>
          </div>
          
          <div className="flex gap-8 border-t border-[#e5e5e5] pt-6">
            <div>
              <div className="text-4xl text-[#b89a6b] mb-1 font-semibold">100%</div>
              <div className="text-sm uppercase tracking-wider text-[#888]">Clear Titles</div>
            </div>
            <div>
              <div className="text-4xl text-[#b89a6b] mb-1 font-semibold">20+</div>
              <div className="text-sm uppercase tracking-wider text-[#888]">Years of Excellence</div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/assets/images/bellagio/about-2.jpg" alt="Build Your Legacy" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      <section id="amenities" className="py-20 bg-[#f9f8f6]">
        <div className="container mx-auto px-[5%] text-center">
          <h2 className="text-3xl md:text-5xl text-[#b89a6b] font-normal mb-6">Build your dream <br/> villa by the sea.</h2>
          <p className="text-[#555] text-lg max-w-2xl mx-auto mb-12">Begin your journey to owning a piece of paradise in Alibaug. Limited plots available.</p>
          <img src="/assets/images/bellagio/amenities.png" alt="Amenities" className="w-full max-w-5xl mx-auto rounded-lg" />
        </div>
      </section>

      <section id="location" className="py-20"><div className="text-center text-2xl text-gray-400">Location Section Pending</div></section>
      <section id="plans" className="py-20 bg-[#f9f8f6]"><div className="text-center text-2xl text-gray-400">Plans Section Pending</div></section>
      <section id="prices" className="py-20"><div className="text-center text-2xl text-gray-400">Prices Section Pending</div></section>
      <section id="gallery" className="py-20 bg-[#f9f8f6]"><div className="text-center text-2xl text-gray-400">Gallery Section Pending</div></section>

    </div>
  );
}

import { motion } from 'framer-motion';

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="w-full bg-[#030604] text-[#F4F1E8] font-sans overflow-x-hidden selection:bg-[#F4F1E8] selection:text-[#030604]">
      
      {/* 1. Opening */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.4em] text-[#b89a6b] mb-12"
          >
            About Veda
          </motion.div>
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-[clamp(2.5rem,5vw,5.5rem)] leading-[1.1] font-light tracking-wide uppercase max-w-5xl"
          >
            <span className="block mb-2">We Believe Good Land is Found.</span>
            <span className="block text-[#F4F1E8]/60 font-serif italic lowercase tracking-normal">Great opportunities are created.</span>
          </motion.h1>
        </div>
      </section>

      {/* 2. Short Introduction */}
      <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 border-t border-[#F4F1E8]/5">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest leading-tight">
              We Find Land<br/>Worth Owning.
            </h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-6 lg:col-start-7 flex flex-col justify-between"
          >
            <p className="text-lg md:text-xl font-light text-[#F4F1E8]/70 leading-relaxed max-w-xl">
              We identify promising markets, carefully select land, and develop thoughtfully planned plotted communities focused on clarity, quality and long-term value.
            </p>
            <div className="mt-16 text-[10px] uppercase tracking-[0.3em] text-[#F4F1E8]/40">
              Scroll To Explore ↓
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Three Principles */}
      <section className="relative w-full py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            {/* Principle 01 */}
            <motion.div variants={fadeInUp} className="flex flex-col border-t border-[#F4F1E8]/10 pt-8">
              <span className="text-[#b89a6b] text-xs uppercase tracking-[0.4em] mb-8">01</span>
              <h3 className="text-3xl font-light uppercase tracking-widest mb-4">Research</h3>
              <p className="text-[#F4F1E8]/60 font-light">Study markets.</p>
            </motion.div>

            {/* Principle 02 */}
            <motion.div variants={fadeInUp} className="flex flex-col border-t border-[#F4F1E8]/10 pt-8 md:mt-16">
              <span className="text-[#b89a6b] text-xs uppercase tracking-[0.4em] mb-8">02</span>
              <h3 className="text-3xl font-light uppercase tracking-widest mb-4">Choose</h3>
              <p className="text-[#F4F1E8]/60 font-light">Choose the land.</p>
            </motion.div>

            {/* Principle 03 */}
            <motion.div variants={fadeInUp} className="flex flex-col border-t border-[#F4F1E8]/10 pt-8 md:mt-32">
              <span className="text-[#b89a6b] text-xs uppercase tracking-[0.4em] mb-8">03</span>
              <h3 className="text-3xl font-light uppercase tracking-widest mb-4">Develop</h3>
              <p className="text-[#F4F1E8]/60 font-light">Develop the opportunity.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Clarity Statement */}
      <section className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#050A07]">
        {/* Very subtle light texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(22,45,28,0.5)_0%,transparent_70%)]" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto w-full text-center flex flex-col items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-[clamp(2rem,4vw,4.5rem)] leading-[1.1] font-light tracking-wide uppercase mb-12"
          >
            <span className="block text-[#F4F1E8]/70">We Find The Opportunity.</span>
            <span className="block">We Give You The Clarity.</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-xs md:text-sm font-medium tracking-[0.3em] text-[#b89a6b] uppercase"
          >
            Title &middot; Legal &middot; Location &middot; Connectivity &middot; Planning &middot; Development
          </motion.div>
        </div>
      </section>

      {/* 5. Why Veda */}
      <section className="relative w-full py-32 px-6 md:px-12 lg:px-24 border-t border-[#F4F1E8]/5">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-5"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-[#b89a6b]">
                Why Veda
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-7"
            >
              <p className="text-xl md:text-2xl font-light text-[#F4F1E8]/80 leading-relaxed">
                Veda began in Alibaug, where the need for clear ownership, thoughtful planning and long-term potential shaped the company's approach.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mt-12"
          >
            <h2 className="text-[clamp(4rem,10vw,12rem)] leading-none font-light uppercase tracking-widest text-[#F4F1E8] mb-6">
              Alibaug
            </h2>
            <div className="text-sm md:text-base font-serif italic text-[#F4F1E8]/50">
              Where Veda Began
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. End Philosophy */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-32 px-6 md:px-12 lg:px-24 bg-[#020403]">
        <div className="max-w-[1400px] mx-auto w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 text-[clamp(1.5rem,3.5vw,3.5rem)] leading-[1.2] font-light tracking-wide uppercase"
          >
            <span className="text-[#F4F1E8]/50 block">We don't develop land first and then create demand.</span>
            <span className="text-[#F4F1E8] block">We identify demand first and then create opportunities.</span>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

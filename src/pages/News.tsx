import { motion } from 'framer-motion';

export default function News() {
  const newsItems = [
    {
      title: "Veda Life Spaces Enters Alibaug's Billionaires' Row With Curated Villa Plot Community",
      category: "Times of India · Business",
      date: "May 2025",
      desc: "Veda Life Spaces marks a landmark entry into one of India's most exclusive coastal addresses — Alibaug's Billionaires' Row — with a thoughtfully curated villa plot community.",
      img: "/assets/images/times-of-india-news-th.jpeg",
      link: "https://timesofindia.indiatimes.com/business/india-business/veda-life-spaces-enters-alibaugs-billionaires-row-with-curated-villa-plot-community/articleshow/130001514.cms",
      tag: "Times of India"
    },
    {
      title: "Veda Life Spaces Enters Alibaug's Billionaire's Row With Curated Villa Plot Community",
      category: "Hindustan Times · Real Estate",
      date: "May 2025",
      desc: "Hindustan Times covers Veda Life Spaces' debut in Alibaug's most coveted coastal corridor, highlighting the brand's disciplined approach to plot development.",
      img: "/assets/images/hindustan-times-th.jpeg",
      link: "https://www.hindustantimes.com/genesis/veda-life-spaces-enters-alibaug-s-billionaire-s-row-with-curated-villa-plot-community-101773827900902.html",
      tag: "Hindustan Times"
    },
    {
      title: "More Media Features Coming Soon",
      category: "Press Coverage",
      date: "Coming Soon",
      desc: "As Veda Life Spaces continues to grow, new press features and media recognition will be added here.",
      img: "/assets/images/mchi-news.jpeg",
      link: "#",
      tag: "MCHI"
    }
  ];

  return (
    <div className="w-full bg-[#FAFAFA] text-[#0a0a0a] font-sans min-h-screen">
      <section className="py-32 md:py-48 px-[5%] max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10 border-b border-black/10 pb-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#b89a6b] text-xs md:text-sm uppercase tracking-[0.3em] font-medium mb-6 block"
            >
              Media & Recognition
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light uppercase tracking-widest text-[#121212] leading-none"
            >
              News & <span className="font-serif italic text-black/40 lowercase tracking-normal">Rewards</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block w-32 h-[1px] bg-[#b89a6b]"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsItems.map((item, index) => (
            <motion.a 
              key={index}
              href={item.link}
              target={item.link !== '#' ? "_blank" : undefined}
              rel={item.link !== '#' ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group block relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6 bg-[#f0f0f0]">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src={item.img} 
                    alt={item.tag} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                  />
                </motion.div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-black/5 text-[#121212] text-[0.65rem] uppercase font-bold tracking-widest px-4 py-2 rounded-sm shadow-sm">
                  {item.tag}
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-3 text-[0.7rem] text-black/50 uppercase tracking-widest mb-4 font-medium">
                  <span>{item.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#b89a6b]" />
                  <span>{item.date}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl text-[#121212] font-medium leading-snug mb-4 group-hover:text-[#b89a6b] transition-colors duration-500">
                  {item.title}
                </h3>
                
                <p className="text-sm text-black/60 leading-relaxed mb-8 line-clamp-3">
                  {item.desc}
                </p>
                
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-3 text-xs font-semibold text-[#121212] uppercase tracking-[0.2em] group-hover:text-[#b89a6b] transition-colors duration-500">
                    Read Article 
                    <span className="w-8 h-[1px] bg-[#121212] group-hover:bg-[#b89a6b] transition-colors duration-500" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}

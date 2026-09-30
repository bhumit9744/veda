import { motion } from 'framer-motion';

export default function OurTeam() {
  const teamMembers = [
    {
      name: "Deepak Gupta",
      title: "Managing Director & CEO",
      linkedin: "https://www.linkedin.com/in/deepak-gupta-59925748",
      image: "/assets/images/deeepak-gupta.png"
    },
    {
      name: "Anil Rathod",
      title: "Head Of Sales",
      linkedin: "https://www.linkedin.com/in/rathodanil",
      image: "/assets/images/anil-rathod.png"
    },
    {
      name: "Pournima Bhor",
      title: "Assistant Vice President, Marketing Strategy",
      linkedin: "https://www.linkedin.com/in/pournimabhor",
      image: "/assets/images/pournima-bhor.png"
    },
    {
      name: "Nehal Sharma",
      title: "Legal Manager",
      linkedin: "https://www.linkedin.com/in/nehal-sharma-871538398",
      image: "/assets/images/nehal-sharma.jpg"
    },
    {
      name: "Shobnit Godhwani",
      title: "AVP Sales",
      linkedin: "https://www.linkedin.com/in/shobnit-godhwani22",
      image: "/assets/images/Shobnit-pic.jpg"
    },
    {
      name: "Trupti Mishra",
      title: "Deputy Manager",
      linkedin: "https://www.linkedin.com/in/mishratrupti/",
      image: "/assets/images/Trupti-pic.jpg"
    },
    {
      name: "Ansh Nagda",
      title: "Sales Associate",
      linkedin: "https://www.linkedin.com/in/ansh-nagda-129760307/",
      image: "/assets/images/Ansh-Pic.jpg"
    },
    {
      name: "Anshika Pandey",
      title: "Assistant Manager - Sales",
      linkedin: "#",
      image: "/assets/images/anshika-pandey.png"
    },
    {
      name: "Abhimanyu Singh",
      title: "Deputy Manager - CRM",
      linkedin: "#",
      image: "/assets/images/abhimanyu-singh.png"
    }
  ];

  return (
    <div className="w-full bg-[#f6f6f6] text-[#222] font-sans min-h-screen">
      <section className="py-32 md:py-48 px-[5%] max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center pb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#b89a6b] text-xs md:text-sm uppercase tracking-[0.3em] font-medium mb-6 block"
          >
            Leaders Who Lead By Example
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-widest text-[#111] leading-none"
          >
            Our <span className="font-serif italic text-[#b89a6b] lowercase tracking-normal">Team</span>
          </motion.h1>
        </div>

        {/* Grid (Using Flex Wrap for perfect centering of bottom row) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 4) * 0.15 }}
              className="group flex flex-col w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2.5rem)] max-w-[320px]"
            >
              <div className="relative aspect-[3/3.6] w-full overflow-hidden mb-6 bg-white rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                {/* Image container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top" 
                  />
                </motion.div>
                
                {/* LinkedIn Overlay on hover */}
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 bg-white/90 backdrop-blur-md border border-[#eee] rounded-full flex items-center justify-center text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Text info */}
              <div className="text-center">
                <h3 className="text-xl text-[#222] font-medium mb-1 group-hover:text-[#b89a6b] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-[0.65rem] text-[#666] uppercase tracking-[0.2em] font-semibold leading-relaxed">
                  {member.title}
                </p>
                <div className="w-8 h-[2px] bg-[#b89a6b] mx-auto mt-4 group-hover:w-16 transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

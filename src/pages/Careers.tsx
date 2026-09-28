import { useState } from 'react';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (
    <div className="w-full font-sans bg-[#faf9f7] text-[#2c2c2c]">
      <section className="py-[10%] px-[20px] text-center mt-24 md:mt-0">
        <div className="max-w-[1200px] mx-auto px-4 md:px-0">
          <h2 className="font-sans text-[24px] md:text-[2.2rem] text-[#b89a5c] mb-[10px]">Join Our Journey</h2>
          <p className="text-[14px] md:text-base max-w-[700px] mx-auto mb-[25px] md:mb-[40px] leading-[1.6]">
            At Veda Life Spaces, we build more than living spaces — we build legacies.  
            Be part of a team that values vision, ethics, and authenticity.
          </p>
          <h2 className="font-sans text-[24px] md:text-[2.2rem] text-[#b89a5c] mb-[10px]">We Are Hiring</h2>
          <p className="text-[14px] md:text-base max-w-[700px] mx-auto mb-[25px] md:mb-[40px] leading-[1.6]">
          </p>

          <div className="flex flex-col items-center gap-[30px]">
            {/* Job 1 */}
            <div className="bg-white rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] w-full max-w-[800px] p-[25px_20px] text-left hover:-translate-y-1 transition-transform">
              <h3 className="font-sans text-[21px] md:text-[1.5rem] text-[#333] mb-3">Senior Sales Manager</h3>
              <p className="text-[0.95rem] text-[#555] my-[15px]">Lead sales strategies and drive project success.</p>
              
              <div className="flex gap-[10px] mt-[15px]">
                <button 
                  className="bg-transparent border border-[#b89a5c] text-[#b89a5c] px-[12px] py-[7px] md:px-[18px] md:py-[10px] rounded-[5px] text-[12px] md:text-[14px] hover:bg-[#b89a5c] hover:text-white transition-colors"
                  onClick={() => setSelectedJob('Senior Sales Manager Desc')}
                >
                  View Description
                </button>
                <button 
                  className="bg-[#b89a5c] text-white px-[18px] py-[10px] rounded-[5px] text-[12px] md:text-[14px] hover:bg-[#a2854f] transition-colors border-none"
                  onClick={() => setSelectedJob('Senior Sales Manager')}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Job 2 */}
            <div className="bg-white rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] w-full max-w-[800px] p-[25px_20px] text-left hover:-translate-y-1 transition-transform">
              <h3 className="font-sans text-[21px] md:text-[1.5rem] text-[#333] mb-3">Post Sales / CRM Manager</h3>
              <p className="text-[0.95rem] text-[#555] my-[15px]">Ensure smooth customer experience and post-sales communication.</p>
              
              <div className="flex gap-[10px] mt-[15px]">
                <button 
                  className="bg-transparent border border-[#b89a5c] text-[#b89a5c] px-[12px] py-[7px] md:px-[18px] md:py-[10px] rounded-[5px] text-[12px] md:text-[14px] hover:bg-[#b89a5c] hover:text-white transition-colors"
                  onClick={() => setSelectedJob('Post Sales Desc')}
                >
                  View Description
                </button>
                <button 
                  className="bg-[#b89a5c] text-white px-[18px] py-[10px] rounded-[5px] text-[12px] md:text-[14px] hover:bg-[#a2854f] transition-colors border-none"
                  onClick={() => setSelectedJob('Post Sales / CRM Manager')}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Form Popup */}
      {selectedJob && !selectedJob.includes('Desc') && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex justify-center items-center">
          <div className="bg-white p-[30px] rounded-[12px] w-[90%] max-w-[400px] relative shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <span className="absolute top-[10px] right-[15px] text-[24px] text-[#555] cursor-pointer" onClick={() => setSelectedJob(null)}>&times;</span>
            <h3 className="text-[18px] md:text-[20px] mb-4">Apply for <span className="font-semibold">{selectedJob}</span></h3>
            <form className="text-left" onSubmit={(e) => { e.preventDefault(); alert('Application Submitted'); setSelectedJob(null); }}>
              <label className="block mt-[15px] text-[0.9rem] text-[#444]">Full Name</label>
              <input type="text" name="name" placeholder="Enter your name" required className="w-full p-2 mt-1.5 rounded-[5px] border border-[#ccc]" />
              <label className="block mt-[15px] text-[0.9rem] text-[#444]">Email ID</label>
              <input type="email" name="email" placeholder="Enter your email" required className="w-full p-2 mt-1.5 rounded-[5px] border border-[#ccc]" />
              <label className="block mt-[15px] text-[0.9rem] text-[#444]">Contact Number</label>
              <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required className="w-full p-2 mt-1.5 rounded-[5px] border border-[#ccc]" />
              <label className="block mt-[15px] text-[0.9rem] text-[#444]">Attach Resume</label>
              <input type="file" name="resume" accept=".pdf,.doc,.docx" required className="w-full p-2 mt-1.5 rounded-[5px] border border-[#ccc]" />
              <button type="submit" className="mt-5 w-full md:w-[60%] p-2.5 bg-[#b89a5c] text-white rounded-[5px] text-[12px] md:text-[1rem] hover:bg-[#a2854f] mx-auto block">Submit Application</button>
            </form>
          </div>
        </div>
      )}

      {/* Description Popup */}
      {selectedJob && selectedJob.includes('Desc') && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex justify-center items-center">
          <div className="bg-white p-[30px] rounded-[12px] w-[90%] max-w-[400px] relative shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <span className="absolute top-[10px] right-[15px] text-[24px] text-[#555] cursor-pointer" onClick={() => setSelectedJob(null)}>&times;</span>
            <h3 className="text-[18px] md:text-[20px] mb-4 font-bold">{selectedJob.replace('Desc', '')}</h3>
            <div className="text-left mt-[15px] leading-[1.6]">
              <strong className="block mt-2.5 text-[#333]">Responsibilities:</strong>
              <ul className="list-disc pl-[18px] my-2">
                <li>Develop and execute sales strategies</li>
                <li>Manage client relationships</li>
                <li>Drive revenue growth</li>
              </ul>
              <strong className="block mt-2.5 text-[#333]">Requirements:</strong>
              <ul className="list-disc pl-[18px] my-2">
                <li>3+ years experience in real estate sales</li>
                <li>Strong communication skills</li>
                <li>Leadership qualities</li>
              </ul>
              <strong className="block mt-2.5 text-[#333]">Location:</strong> Mumbai
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

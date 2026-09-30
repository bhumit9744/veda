import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Disclaimer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0EBDD] selection:bg-[#C7A34A]/30">
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-editorial tracking-wide mb-6 text-[#C7A34A]">Disclaimer</h1>
          <p className="text-[#F0EBDD]/60 tracking-[0.2em] uppercase text-sm font-sans mb-12">
            Important Legal Information & Compliance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-p:text-[#F0EBDD]/80 prose-p:leading-relaxed prose-headings:text-[#C7A34A] prose-headings:font-editorial prose-headings:font-normal prose-li:text-[#F0EBDD]/80 max-w-none space-y-12"
        >
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">Notice on Fraudulent Activity</h2>
            <p>
              It has come to our attention that unauthorized individuals are falsely claiming association with Veda Life Spaces through counterfeit materials and platforms. Please be advised that the company does not endorse any investment programs or third-party earning platforms. Any engagement with such unauthorized entities is at the viewer’s own risk; Veda Life Spaces shall not be held liable for any resulting losses. For verified updates, please refer only to our official channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl mb-6">Information & Compliance</h2>
            <p className="mb-6">
              The content displayed on this website is solely for informational purposes. Veda has taken enough care to ensure that information in the website are up to date, accurate and correct, the readers/ users are requested to make an independent enquiry with Veda before relying upon the same. Nothing on the website should be misconstrued or deemed to have been construed as advertising, marketing, booking, selling or an offer for sale or invitation to purchase a unit in any project by Veda.
            </p>
            
            <ul className="space-y-6 list-none pl-0">
              <li className="flex flex-col gap-2">
                <strong className="text-xl text-[#F0EBDD] font-editorial">1. RERA Status</strong>
                <span className="text-[#F0EBDD]/80">
                  In accordance with regulatory guidelines, the project is currently in the pre-registration phase. No formal bookings or allotments will be initiated until the RERA registration is officially obtained and displayed.
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="text-xl text-[#F0EBDD] font-editorial">2. Visualizations</strong>
                <span className="text-[#F0EBDD]/80">
                  All renderings, layouts, specifications, plans, images, designs, locations, facilities, dimensions and other details are artist's impressions provided for conceptual representation remain subject to regulatory approvals from time to time and the company reserves the right to amend, alter or delete any of such contents without any notice in the interest of project compliance.
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <strong className="text-xl text-[#F0EBDD] font-editorial">3. Liability</strong>
                <span className="text-[#F0EBDD]/80">
                  Veda Life Spaces, its management, and employees disclaim all liability for actions taken based on this preliminary information without explicit written verification from our authorized departments. Veda reserves the right to terminate, revoke, modify, alter, add and delete any one or more of the terms and conditions of the website. The Company shall be under no obligation to notify the visitor of the amendment to the terms and conditions, and the visitor shall be bound by such amended terms and conditions. Veda shall not be responsible for the consequences of any action taken by the viewer relying on such material/ information on this website without independently verifying with Veda.
                </span>
              </li>
            </ul>
          </section>
        </motion.div>
      </main>

    </div>
  );
}

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0EBDD] pt-32 pb-24 px-6 md:px-12 selection:bg-[#C7A34A]/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-editorial tracking-wide mb-6">Privacy Policy</h1>
          <p className="text-[#C7A34A] tracking-[0.2em] uppercase text-sm font-sans mb-12">
            Last Updated: 13th March 2026
          </p>
          <p className="text-[#F0EBDD]/80 leading-relaxed font-body">
            Welcome to Veda Life Spaces (“Company”, “we”, “our”, or “us”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://vedalifespaces.in/ or interact with us through the website. By using the website, you agree to the terms of this Privacy Policy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-p:text-[#F0EBDD]/80 prose-p:leading-relaxed prose-headings:text-[#C7A34A] prose-headings:font-editorial prose-headings:font-normal prose-li:text-[#F0EBDD]/80 max-w-none space-y-12"
        >
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">1. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            
            <h3 className="text-xl mb-4 text-[#F0EBDD]">1.1 Personal Information</h3>
            <p className="mb-4">When you fill out forms on the website (for example contact forms, enquiry forms, or booking forms), we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-[#F0EBDD]/80">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Location / city</li>
              <li>Property preferences</li>
              <li>Any other information you provide voluntarily</li>
            </ul>

            <h3 className="text-xl mb-4 text-[#F0EBDD]">1.2 Automatically Collected Information</h3>
            <p className="mb-4">When you browse our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-[#F0EBDD]/80">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Pages visited</li>
              <li>Date and time of visits</li>
              <li>Referral URLs</li>
            </ul>

            <h3 className="text-xl mb-4 text-[#F0EBDD]">1.3 Cookies & Tracking Technologies</h3>
            <p className="mb-4">We may use cookies or similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-[#F0EBDD]/80">
              <li>Improve user experience</li>
              <li>Understand user behaviour</li>
              <li>Analyze website performance</li>
              <li>Deliver relevant marketing content</li>
            </ul>
            <p className="text-[#F0EBDD]/80">You can disable cookies through your browser settings.</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">2. How We Use Your Information</h2>
            <p className="mb-4">We may use the collected information for purposes such as:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#F0EBDD]/80">
              <li>Responding to your enquiries</li>
              <li>Providing details about our real estate projects or services</li>
              <li>Contacting you regarding site visits or bookings</li>
              <li>Sending promotional updates or offers</li>
              <li>Improving our website and services</li>
              <li>Ensuring website security and fraud prevention</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">3. Sharing of Information</h2>
            <p className="mb-4">We do not sell your personal data. However, we may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-[#F0EBDD]/80">
              <li>Internal team members and authorized employees</li>
              <li>Channel partners, brokers, or sales representatives</li>
              <li>Marketing and CRM service providers</li>
              <li>IT service providers for website operations</li>
              <li>Government authorities when required by law</li>
            </ul>
            <p className="text-[#F0EBDD]/80">All third parties are required to protect your data.</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">4. Data Storage and Security</h2>
            <p className="mb-4">We implement reasonable security measures to protect your information, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-[#F0EBDD]/80">
              <li>Secure servers</li>
              <li>Access restrictions</li>
              <li>Data encryption where applicable</li>
            </ul>
            <p className="text-[#F0EBDD]/80">However, no method of transmission over the internet is 100% secure.</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">5. Third-Party Links</h2>
            <p className="mb-4 text-[#F0EBDD]/80">Our website may contain links to third-party websites (such as property portals, social media platforms, or partner sites). We are not responsible for the privacy practices of these websites. Users are advised to review their privacy policies separately.</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">6. Your Rights</h2>
            <p className="mb-4 text-[#F0EBDD]/80">You may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-[#F0EBDD]/80">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data (where applicable)</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-[#F0EBDD]/80">To exercise these rights, contact us using the details below.</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">7. Children’s Privacy</h2>
            <p className="text-[#F0EBDD]/80">Our website is not intended for individuals under the age of 18. We do not knowingly collect personal data from minors.</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">8. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-[#F0EBDD]/80">We may update this Privacy Policy from time to time. When we do, the “Last Updated” date will be revised. We encourage users to review this page periodically.</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl md:text-3xl mb-6">9. Contact Us</h2>
            <p className="mb-4 text-[#F0EBDD]/80">If you have any questions about this Privacy Policy, you can contact us:</p>
            <div className="space-y-2 text-[#F0EBDD]/80">
              <p><strong>Veda Life Spaces</strong></p>
              <p>Website: <a href="https://vedalifespaces.in/" className="text-[#C7A34A] hover:underline" target="_blank" rel="noreferrer">https://vedalifespaces.in/</a></p>
              <p>Email: <a href="mailto:info@vedalifespaces.com" className="text-[#C7A34A] hover:underline">info@vedalifespaces.com</a></p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

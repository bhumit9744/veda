import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import OurTeam from './pages/OurTeam';
import News from './pages/News';
import Careers from './pages/Careers';
import FAQ from './pages/FAQ';
import Bellagio from './pages/Bellagio';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ScrollEnquiryPopup from './components/common/ScrollEnquiryPopup';
import { EnquiryModalProvider, useEnquiryModal } from './context/EnquiryModalContext';
import EnquiryModal from './components/projects/EnquiryModal';
import FloatingEnquireButton from './components/common/FloatingEnquireButton';
import MahaReraDisclaimerSection from './components/common/MahaReraDisclaimerSection';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  const isProjectSection = location.pathname.startsWith('/projects') || location.pathname.startsWith('/codename-bellagio') || location.pathname.startsWith('/veda-monteza');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-transparent">
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {!isProjectSection && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.php" element={<Home />} />
            <Route path="/aboutus.php" element={<About />} />
            <Route path="/contact-us.php" element={<Contact />} />
            <Route path="/our-team.php" element={<OurTeam />} />
            <Route path="/news.php" element={<News />} />
            <Route path="/carrers.php" element={<Careers />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/codename-bellagio.php" element={<Bellagio />} />
            <Route path="/codename-bellagio-v2.php" element={<Bellagio />} />
            <Route path="/veda-monteza" element={<Projects />} />
            <Route path="/veda-monteza.php" element={<Projects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects.php" element={<Projects />} />
            <Route path="/thank-you.php" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center pt-24 text-white"><h1 className="text-3xl">404 Not Found</h1></div>} />
          </Routes>
        </main>
        <MahaReraDisclaimerSection />
        <Footer />
        <ScrollEnquiryPopup />
      </div>
    </div>
  );
}

function GlobalEnquiryModal() {
  const { isOpen, closeModal, selectedVilla, selectedPlotSize } = useEnquiryModal();
  return (
    <EnquiryModal
      isOpen={isOpen}
      onClose={closeModal}
      preselectedVilla={selectedVilla}
      preselectedPlotSize={selectedPlotSize || selectedVilla}
    />
  );
}

function App() {
  return (
    <Router>
      <EnquiryModalProvider>
        <AppContent />
        <GlobalEnquiryModal />
        <FloatingEnquireButton />
      </EnquiryModalProvider>
    </Router>
  );
}

export default App;

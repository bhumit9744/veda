import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Legacy component removed

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import CinematicHome from './components/home/Cinematic/CinematicHome';
import SectionOurDevelopmentsCards from './components/home/SectionOurDevelopmentsCards';
import Section06BeyondSale from './components/home/Section06BeyondSale';
import Section07Difference from './components/home/Section07Difference';
import Section08Investment from './components/home/Section08Investment';
import Section09FindOwnBuild from './components/home/Section09FindOwnBuild';
import Section10BeyondLiving from './components/home/Section10BeyondLiving';
import Section11FinalCTA from './components/home/Section11FinalCTA';

import VedaExperience from './components/VedaExperience';

function Home() {
  return (
    <div className="w-full font-sans bg-[#050505]">
      <VedaExperience />
    </div>
  );
}

import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/index.php';

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* Conditionally render navbar if needed, or maybe it should be transparent on home. */}
      {!isHome && <Navbar />}
      {isHome && <Navbar className="absolute top-0 w-full z-50 bg-transparent mix-blend-difference" />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.php" element={<Home />} />
          <Route path="/aboutus.php" element={<About />} />
          <Route path="/contact-us.php" element={<Contact />} />
          <Route path="/our-team.php" element={<OurTeam />} />
          <Route path="/news.php" element={<News />} />
          <Route path="/carrers.php" element={<Careers />} />
          <Route path="/faq.php" element={<FAQ />} />
          <Route path="/codename-bellagio.php" element={<Bellagio />} />
          <Route path="/codename-bellagio-v2.php" element={<Bellagio />} />
          <Route path="/thank-you.php" element={<ThankYou />} />
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center pt-24 text-white"><h1 className="text-3xl">404 Not Found</h1></div>} />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Spaces from './components/Spaces';
import Experiences from './components/Experiences';
import Corporate from './components/Corporate';
import Gallery from './components/Gallery';
import Accommodations from './components/Accommodations';
import Journal from './components/Journal';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import PricingBreakdownPage from './pages/PricingBreakdownPage';

export default function App() {
  const isPricingDomain = typeof window !== 'undefined' && (() => {
    const host = window.location.hostname.toLowerCase();
    const isLocalDev = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
    const isTargetDomain = 
      host.includes('pricing-breakdown') || 
      host.includes('pricing') || 
      host.includes('price');

    // In local development, allow previewing via hash or query param
    if (isLocalDev) {
      const hash = window.location.hash;
      const search = window.location.search;
      return (
        host.includes('pricing') ||
        host.includes('price') ||
        hash === '#/pricing-breakdown' || 
        hash === '#pricing-breakdown' || 
        hash === '#/pricing' || 
        hash === '#pricing' || 
        search.includes('mode=pricing') ||
        search.includes('mode=breakdown')
      );
    }

    // In production (e.g. pricing-breakdown.vercel.app), strictly trigger if domain is pricing breakdown subdomain
    return isTargetDomain;
  })();

  if (isPricingDomain) {
    return <PricingBreakdownPage />;
  }
  
  const lenisRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      return path === '/pricing' || hash === '#pricing' ? 'pricing' : 'home';
    }
    return 'home';
  });

  const navigateToPricing = () => {
    setCurrentPage('pricing');
    window.history.pushState(null, '', '/pricing');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (hash = '#home') => {
    setCurrentPage('home');
    window.history.pushState(null, '', '/' + (hash.startsWith('#') ? hash : ''));
    if (hash && hash !== '#home') {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/pricing' || hash === '#pricing') {
        setCurrentPage('pricing');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPage === 'pricing') return;

    // Initialize Lenis smooth scroll momentum for home page
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"], a[href^="/"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      if (href === '/pricing' || href === '#pricing') {
        e.preventDefault();
        navigateToPricing();
        return;
      }

      if (href.startsWith('#') && href !== '#') {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, [currentPage]);

  if (currentPage === 'pricing') {
    return <PricingBreakdownPage />;
  }

  return (
    <div className="app-container">
      <Navbar currentPage="home" onNavigatePricing={navigateToPricing} />
      <main>
        <Hero />
        <About />
        <Spaces />
        <Experiences />
        <Corporate />
        <Gallery />
        <Accommodations />
        <Journal />
        <Testimonials />
        <Location />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}

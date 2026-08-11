import { useEffect, useRef } from 'react';
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

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll momentum
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easeOut
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

    // Global listener to ensure all # anchor links trigger smooth scroll on the VERY FIRST click
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

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
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
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

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import Logo from './Logo';
import siteData from '../data/site.json';

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'SPACES', href: '#spaces' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'BLOG', href: '#blog' },
  { label: 'CORPORATE', href: '#corporate' },
  { label: 'LOCATE', href: '#location' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('HOME');
  const { scrollY } = useScroll();
  const navRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // Close mobile navbar menu when clicking anywhere outside of it
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <motion.header
      ref={navRef}
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-premium ${
        scrolled
          ? 'bg-forest-dark/85 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5 sm:gap-3" aria-label="Orabella Banquet Home">
          <Logo className="h-9 w-9 sm:h-11 sm:w-11 text-gold transition-transform duration-500 ease-premium group-hover:scale-105" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-medium tracking-wide text-white sm:text-lg">{siteData.name || 'Orabella Banquet'}</span>
            <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-gold/90 sm:text-[10px]">Luxury Event Venue</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActive(link.label)}
                className="group relative font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 ease-premium ${
                    active === link.label ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="group hidden items-center gap-2 rounded-sm bg-forest px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-cream shadow-[0_8px_30px_rgba(20,57,43,0.45)] ring-1 ring-inset ring-white/10 transition-all duration-500 ease-premium hover:bg-forest-light active:scale-[0.98] sm:flex"
          >
            {siteData.bookButtonLabel || 'Book Now'}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-inset ring-white/20 transition-colors duration-300 hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden lg:hidden"
      >
        <ul className="flex flex-col gap-1 bg-forest-dark/95 px-6 py-5 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMenuOpen(false);
                }}
                className="block py-2.5 font-sans text-sm uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="block rounded-sm bg-forest px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-cream ring-1 ring-inset ring-white/10"
            >
              {siteData.bookButtonLabel || 'Book Now'}
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Mobile Backdrop overlay for instant outside click dismissal */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 -z-10 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}
    </motion.header>
  );
}

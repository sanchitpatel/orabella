import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkle, CaretDown, ChatCircleDots, ArrowRight } from '@phosphor-icons/react';
import heroData from '../data/hero.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);

  // Signal hero video is ready for sequential testimonial preloading
  const handleCanPlay = () => {
    if (!window.__HERO_VIDEO_READY__) {
      window.__HERO_VIDEO_READY__ = true;
      window.dispatchEvent(new CustomEvent('hero-video-ready'));
    }
  };

  // 1. IntersectionObserver to pause Hero Video when out of viewport
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Staggered reveal orchestration for the hero stack
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.35 },
    },
  };
  const rise = {
    hidden: reduceMotion ? {} : { y: 26, opacity: 0, filter: 'blur(6px)' },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: EASE },
    },
  };

  const whatsappUrl = `https://wa.me/${siteData.whatsappPhone || '919319812500'}`;

  return (
    <section id="home" className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-forest-dark">
      {/* Background video */}
      <video
        ref={videoRef}
        src="/hero_video.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onPlaying={handleCanPlay}
      />

      {/* Cinematic overlays for legibility */}
      <div className="absolute inset-0 bg-forest-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50" />

      {/* Hero content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 text-center sm:px-8"
      >
        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-serif leading-[1.06] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
        >
          <span className="block text-[2.35rem] font-light text-white/90 sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            {heroData.headlineLine1}
          </span>
          <span className="block text-[2.75rem] font-medium text-white mt-1 sm:mt-2 sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {heroData.headlineLine2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={rise}
          className="mt-6 max-w-xl font-sans text-lg font-light leading-relaxed text-white/85 sm:text-xl md:text-2xl"
        >
          {heroData.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={rise} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#book"
            className="group flex w-full items-center justify-center gap-3 rounded-sm bg-gold px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-forest-dark shadow-[0_12px_40px_rgba(198,161,91,0.35)] transition-all duration-500 ease-premium hover:bg-gold-light active:scale-[0.98] sm:w-auto"
          >
            {heroData.ctaPrimaryLabel || 'Plan Your Event'}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-dark/15 transition-transform duration-500 ease-premium group-hover:translate-x-1">
              <ArrowRight size={14} weight="bold" />
            </span>
          </a>
          <a
            href="#spaces"
            className="group flex w-full items-center justify-center gap-3 rounded-sm border border-white/35 bg-white/10 px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-500 ease-premium hover:bg-white/20 active:scale-[0.98] sm:w-auto"
          >
            {heroData.ctaSecondaryLabel || 'Explore Spaces'}
          </a>
        </motion.div>

        {/* Wedding venue badge pill */}
        <motion.div
          variants={rise}
          className="mt-12 flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-5 py-2.5 backdrop-blur-md"
        >
          <Sparkle size={18} weight="fill" className="shrink-0 text-gold" />
          <p className="font-sans text-[12px] font-light leading-snug text-white/85 sm:text-sm">
            {heroData.badgePrefix}{' '}
            <span className="font-serif italic text-gold">{heroData.badgeText}</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <CaretDown size={26} weight="thin" className="animate-scroll-bob" />
      </motion.a>

      {/* Floating WhatsApp chat button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
        aria-label="Contact us on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-forest-dark shadow-[0_10px_35px_rgba(198,161,91,0.5)] ring-1 ring-inset ring-white/20 transition-all duration-500 ease-premium hover:bg-gold-light active:scale-95"
      >
        <ChatCircleDots size={26} weight="fill" className="transition-transform duration-500 ease-premium group-hover:scale-110" />
      </motion.a>
    </section>
  );
}

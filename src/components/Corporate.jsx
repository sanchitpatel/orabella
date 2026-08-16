import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin } from '@phosphor-icons/react';
import corpData from '../data/corporate.json';

const EASE = [0.16, 1, 0.3, 1];

const FALLBACK =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80';

export default function Corporate() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const stats = corpData.stats || [];

  return (
    <section id="corporate" className="relative w-full overflow-hidden bg-forest-dark">
      {/* Background Photography */}
      <img
        src={corpData.bgImage || '/corporate/corporate-event.png'}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Cinematic Dark Forest Green Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(13,39,29,0.94) 0%, rgba(20,57,43,0.82) 42%, rgba(20,57,43,0.55) 72%, rgba(13,39,29,0.35) 100%)'
        }}
      />

      {/* Top-Left Floral Layer (Transparent PNG) */}
      <img
        src="/decor/Floral-left.png"
        alt=""
        aria-hidden="true"
        onError={(e) => {
          if (!e.currentTarget.src.endsWith('/decor/floral-left.png')) {
            e.currentTarget.src = '/decor/floral-left.png';
          }
        }}
        className="pointer-events-none absolute -top-4 -left-4 z-20 w-[180px] sm:w-[260px] md:w-[340px] lg:w-[420px] max-w-none select-none opacity-95 filter drop-shadow-xl"
      />

      {/* Bottom-Right Floral Layer (Transparent PNG) */}
      <img
        src="/decor/Floral-right.png"
        alt=""
        aria-hidden="true"
        onError={(e) => {
          if (!e.currentTarget.src.endsWith('/decor/floral-right.png')) {
            e.currentTarget.src = '/decor/floral-right.png';
          }
        }}
        className="pointer-events-none absolute -bottom-4 -right-4 z-20 w-[200px] sm:w-[280px] md:w-[380px] lg:w-[460px] max-w-none select-none opacity-95 filter drop-shadow-xl"
      />

      {/* Content Layer */}
      <div className="relative z-30 mx-auto flex min-h-[88vh] max-w-[1400px] items-center px-5 py-24 sm:px-8 md:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-xl"
        >
          {/* Eyebrow Label */}
          <motion.span
            variants={rise}
            className="inline-block font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4A15B]"
          >
            {corpData.badge || 'CORPORATE EVENTS'}
          </motion.span>

          {/* Editorial Serif Heading */}
          <motion.h2
            variants={rise}
            className="mt-4 font-serif text-4xl font-normal leading-[1.08] text-[#F3ECE3] sm:text-5xl md:text-[3.5rem] lg:text-[4rem]"
          >
            {corpData.titleLine1 ? (
              <>
                <span className="block">{corpData.titleLine1}</span>
                <span className="block">{corpData.titleLine2}</span>
              </>
            ) : (
              corpData.title || 'Where Business Meets Serenity'
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={rise}
            className="mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-[#DED3C8] sm:text-base"
          >
            {corpData.subtitle}
          </motion.p>

          {/* Key Services Stats */}
          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            {stats.map((stat, idx) => (
              <div key={stat.label || idx} className="relative">
                <div className="font-serif text-2xl font-normal text-[#D4A15B] sm:text-[1.75rem]">{stat.value}</div>
                <div className="mt-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#F3ECE3]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Luxury CTAs */}
          <motion.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Primary Gold CTA */}
            <a
              href="#book"
              className="group flex items-center justify-center gap-3 rounded-[3px] border border-[#E0B978]/55 bg-[#D4A15B] px-8 py-4 font-sans text-[11.5px] font-bold uppercase tracking-[0.16em] text-forest-dark shadow-[0_8px_30px_rgba(212,161,91,0.20)] transition-all duration-300 ease-premium hover:bg-[#E0B978] active:scale-[0.98]"
            >
              {corpData.ctaPrimaryLabel || 'Plan Your Offsite'}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-dark/15 transition-transform duration-300 ease-premium group-hover:translate-x-1">
                <ArrowRight size={13} weight="bold" />
              </span>
            </a>

            {/* Secondary Outline CTA */}
            <a
              href="#location"
              className="group flex items-center justify-center gap-2.5 rounded-[3px] border border-[#D4A15B]/50 bg-transparent px-8 py-4 font-sans text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#F3ECE3] transition-all duration-300 ease-premium hover:border-[#D4A15B] hover:bg-[#D4A15B]/10 active:scale-[0.98]"
            >
              <MapPin size={18} weight="fill" className="text-[#D4A15B] transition-transform duration-300 group-hover:scale-110" />
              {corpData.ctaSecondaryLabel || 'Locate Us'}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
      {/* Background image */}
      <img
        src={corpData.bgImage || '/corporate/corporate-event.png'}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark forest tint for legibility */}
      <div className="absolute inset-0 bg-forest-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/70 to-forest-dark/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-[1400px] items-center px-5 py-24 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-xl"
        >
          <motion.span
            variants={rise}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold"
          >
            {corpData.badge}
          </motion.span>

          <motion.h2
            variants={rise}
            className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-white sm:text-5xl md:text-[3.5rem]"
          >
            {corpData.titleLine1 ? (
              <>
                <span className="block">{corpData.titleLine1}</span>
                <span className="block">{corpData.titleLine2}</span>
              </>
            ) : (
              corpData.title
            )}
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-white/80"
          >
            {corpData.subtitle}
          </motion.p>

          {/* Stats */}
          <motion.div variants={rise} className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-2xl text-gold sm:text-[1.75rem]">{stat.value}</div>
                <div className="mt-1 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#book"
              className="group flex items-center justify-center gap-3 rounded-sm bg-gold px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-dark shadow-[0_12px_40px_rgba(198,161,91,0.3)] transition-all duration-500 ease-premium hover:bg-gold-light active:scale-[0.98]"
            >
              {corpData.ctaPrimaryLabel || 'Plan Your Offsite'}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-dark/15 transition-transform duration-500 ease-premium group-hover:translate-x-1">
                <ArrowRight size={14} weight="bold" />
              </span>
            </a>
            <a
              href="#location"
              className="group flex items-center justify-center gap-2.5 rounded-sm border border-white/35 bg-white/5 px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-500 ease-premium hover:bg-white/15 active:scale-[0.98]"
            >
              <MapPin size={18} weight="fill" className="text-gold transition-transform duration-300 group-hover:scale-110" />
              {corpData.ctaSecondaryLabel || 'Locate Us'}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

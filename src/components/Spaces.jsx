import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import spacesData from '../data/spaces.json';

const EASE = [0.16, 1, 0.3, 1];

const FALLBACK =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';

function SpaceCard({ space, featured }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl ring-1 ring-black/5 ${
        featured ? 'h-72 sm:h-80 lg:h-[22rem]' : 'h-56 sm:h-60'
      }`}
    >
      <img
        src={space.img}
        alt={space.name}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.06]"
      />
      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/85" />

      {/* Content */}
      <div className={`absolute inset-x-0 bottom-0 flex flex-col ${featured ? 'p-6' : 'p-5'}`}>
        <h3
          className={`font-serif font-medium text-white ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {space.name}
        </h3>
        {space.desc && (
          <p className="mt-1 max-w-md font-sans text-[13px] font-light leading-snug text-white/80">
            {space.desc}
          </p>
        )}
        <span className="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-gold-light">
          {space.stats}
        </span>
      </div>

      {/* Gold hairline reveal on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
    </div>
  );
}

export default function Spaces() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const featuredSpaces = spacesData.featured || [];
  const secondarySpaces = spacesData.secondary || [];

  return (
    <section id="spaces" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={rise}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark"
          >
            {spacesData.badge}
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-4 font-serif text-4xl font-medium leading-tight text-forest-dark sm:text-5xl md:text-[3.25rem]"
          >
            {spacesData.title}
          </motion.h2>
          <motion.p
            variants={rise}
            className="mx-auto mt-5 max-w-xl font-sans text-base font-light leading-relaxed text-forest/70"
          >
            {spacesData.subtitle}
          </motion.p>
        </motion.div>

        {/* Featured row */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {featuredSpaces.map((space) => (
            <motion.div key={space.name} variants={rise}>
              <SpaceCard space={space} featured />
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary row */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {secondarySpaces.map((space) => (
            <motion.div key={space.name} variants={rise}>
              <SpaceCard space={space} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#book"
            className="group inline-flex items-center gap-3 rounded-sm bg-forest px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-cream shadow-[0_12px_40px_-12px_rgba(20,57,43,0.6)] ring-1 ring-inset ring-white/10 transition-all duration-500 ease-premium hover:bg-forest-light active:scale-[0.98]"
          >
            {spacesData.ctaLabel || 'Plan Your Event'}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-premium group-hover:translate-x-1">
              <ArrowRight size={14} weight="bold" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

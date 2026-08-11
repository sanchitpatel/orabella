import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import journalData from '../data/journal.json';

const EASE = [0.16, 1, 0.3, 1];

const fallback = (seed) => `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80`;

export default function Journal() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const rise = {
    hidden: reduceMotion ? {} : { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const posts = journalData.posts || [];

  // Auto-scroll on mobile screens
  useEffect(() => {
    if (isInteracting || !posts.length) return undefined;
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      if (el.scrollWidth > el.clientWidth) {
        const next = (activeIndex + 1) % posts.length;
        const itemWidth = el.scrollWidth / posts.length;
        el.scrollTo({
          left: itemWidth * next,
          behavior: 'smooth',
        });
        setActiveIndex(next);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [activeIndex, isInteracting, posts.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    if (el.scrollWidth > el.clientWidth) {
      const itemWidth = el.scrollWidth / posts.length;
      const current = Math.round(el.scrollLeft / itemWidth);
      if (current !== activeIndex && current >= 0 && current < posts.length) {
        setActiveIndex(current);
      }
    }
  };

  return (
    <section id="blog" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center"
        >
          <motion.span
            variants={rise}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark"
          >
            {journalData.badge}
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-3 font-serif text-4xl font-medium text-forest-dark sm:text-5xl md:text-[3.25rem]"
          >
            {journalData.title}
          </motion.h2>
          <motion.a
            variants={rise}
            href="#blog"
            className="mt-4 inline-block font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark transition-colors duration-300 hover:text-gold"
          >
            {journalData.viewAllLabel || 'View All Stories'}
          </motion.a>
        </motion.div>

        {/* Cards - Mobile auto-scrollable carousel & Desktop 3-col grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setTimeout(() => setIsInteracting(false), 5000)}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          className="mt-14 flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 no-scrollbar md:grid md:grid-cols-3 md:gap-7 md:overflow-visible md:pb-0"
        >
          {posts.map((post, idx) => (
            <motion.article
              key={post.title || idx}
              variants={rise}
              className="group flex w-[85vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_18px_50px_-35px_rgba(20,57,43,0.5)] transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-40px_rgba(20,57,43,0.6)] md:w-auto md:max-w-none md:shrink md:snap-align-none"
            >
              <div className="overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => {
                    const fb = fallback(post.seed);
                    if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                  }}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1.3s] ease-premium group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold-dark">
                  {post.date}
                </span>
                <h3 className="mt-3 font-serif text-xl leading-snug text-forest-dark transition-colors duration-300 group-hover:text-forest">
                  {post.title}
                </h3>
                <p className="mt-3 font-sans text-[14px] font-light leading-relaxed text-forest/60 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Mobile Pagination Dots */}
        {posts.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {posts.map((post, i) => (
              <button
                key={post.title || i}
                type="button"
                onClick={() => {
                  if (scrollRef.current) {
                    const el = scrollRef.current;
                    const itemWidth = el.scrollWidth / posts.length;
                    el.scrollTo({ left: itemWidth * i, behavior: 'smooth' });
                    setActiveIndex(i);
                  }
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-forest' : 'w-2 bg-forest/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

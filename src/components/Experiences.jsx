import { motion, useReducedMotion } from 'framer-motion';
import expData from '../data/experiences.json';

const EASE = [0.16, 1, 0.3, 1];

const FALLBACK =
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80';

function CollageImg({ src, alt, className }) {
  return (
    <div className={`overflow-hidden rounded-xl ring-1 ring-black/5 ${className}`}>
      <img
        src={src}
        alt={alt || 'Experience photo'}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        }}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-premium hover:scale-[1.05]"
      />
    </div>
  );
}

export default function Experiences() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 26, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const offerings = expData.offerings || [];
  const rawImages = expData.images || [];

  // Normalize images to array format
  const imageList = Array.isArray(rawImages)
    ? rawImages
    : [
        { img: rawImages.decor || '/experiences/exp-decor.jpg', alt: 'Floral wedding mandap' },
        { img: rawImages.dining || '/experiences/exp-dining.jpg', alt: 'Poolside patio dining setup' },
        { img: rawImages.dance || '/experiences/exp-dance.jpg', alt: 'Classical dance performance' },
        { img: rawImages.reception || '/experiences/exp-reception.jpg', alt: 'Reception hall decor' },
      ];

  // Split images into two halves so the sequence (1 & 2 in Col 1, 3 & 4 in Col 2) matches original layout
  const half = Math.ceil(imageList.length / 2);
  const col1Images = imageList.slice(0, half);
  const col2Images = imageList.slice(half);

  return (
    <section id="experiences" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Left: content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={rise}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark"
          >
            {expData.badge}
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-4 font-serif text-4xl font-medium leading-tight text-forest-dark sm:text-5xl md:text-[3.25rem]"
          >
            {expData.title}
          </motion.h2>
          <motion.p
            variants={rise}
            className="mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-forest/70"
          >
            {expData.subtitle}
          </motion.p>

          {/* Numbered offerings */}
          <div className="mt-10 flex flex-col divide-y divide-forest/10">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                variants={rise}
                className="group flex items-start gap-5 py-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold-dark transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-forest-dark">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-forest-dark">{item.title}</h3>
                  <p className="mt-1 max-w-md font-sans text-[14px] font-light leading-relaxed text-forest/65">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={rise} className="mt-10">
            <a
              href="#about"
              className="inline-flex items-center rounded-sm border border-forest/40 px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-dark transition-all duration-500 ease-premium hover:border-forest hover:bg-forest hover:text-cream active:scale-[0.98]"
            >
              {expData.ctaLabel || 'Learn More'}
            </a>
          </motion.div>
        </motion.div>

        {/* Right: staggered collage */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: EASE }}
          className="grid grid-cols-2 gap-4 sm:gap-5"
        >
          <div className="flex flex-col gap-4 sm:gap-5">
            {col1Images.map((item, idx) => (
              <CollageImg
                key={item.img || idx}
                src={item.img}
                alt={item.alt}
                className={idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
              />
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:gap-5">
            {col2Images.map((item, idx) => (
              <CollageImg
                key={item.img || idx}
                src={item.img}
                alt={item.alt}
                className={idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, NavigationArrow, Car } from '@phosphor-icons/react';
import Logo from './Logo';
import locData from '../data/location.json';

const EASE = [0.16, 1, 0.3, 1];

const MAP = {
  lat: 28.6967,
  lng: 77.0864,
  link: 'https://maps.google.com/?q=Orabella+Banquet+E-2+Udhyog+nagar+Main+Rohtak+Rd+Peera+Garhi+Sector+8+Delhi+110041',
};
const MAP_EMBED =
  'https://maps.google.com/maps?q=E-2%20Udhyog%20nagar%2C%20Main%20Rohtak%20Rd%2C%20Peera%20Garhi%2C%20Sector%208%2C%20Delhi%2C%20110041&t=&z=15&ie=UTF8&iwloc=&output=embed';

const VENUE = {
  name: 'Orabella Banquet',
  address: 'E-2 Udhyog nagar, Main Rohtak Rd, Peera Garhi, Sector 8, Delhi, 110041',
};

const QR_CONFIG = {
  mode: 'generated',
  data: MAP.link,
  imageSrc: '/qr/location-qr.png',
  showLogo: true,
};

function QrCode() {
  const src =
    QR_CONFIG.mode === 'image'
      ? QR_CONFIG.imageSrc
      : `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&ecc=H&data=${encodeURIComponent(
          QR_CONFIG.data
        )}`;

  return (
    <a
      href={MAP.link}
      target="_blank"
      rel="noreferrer"
      aria-label="Open location in Google Maps"
      className="group relative inline-block h-40 w-40 shrink-0 rounded-xl bg-white p-3 ring-1 ring-black/10 shadow-sm transition-transform duration-500 ease-premium hover:scale-[1.03]"
    >
      <img
        src={src}
        alt="Scan to open the venue location"
        loading="lazy"
        className="h-full w-full object-contain"
        onError={(e) => {
          const gen = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&ecc=H&data=${encodeURIComponent(
            QR_CONFIG.data
          )}`;
          if (e.currentTarget.src !== gen) e.currentTarget.src = gen;
        }}
      />
      {QR_CONFIG.showLogo && (
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-forest-dark ring-2 ring-white">
          <Logo className="h-6 w-6 text-gold" />
        </span>
      )}
    </a>
  );
}

const DEFAULT_DISTANCES = [
  'Conveniently located at E-2 Udhyog nagar, Main Rohtak Rd, Peera Garhi, Delhi',
  'Easily accessible via Peera Garhi Metro Station & Main Rohtak Road',
  'Well-connected to West Delhi, Outer Ring Road & major arterial routes',
];

function Block({ icon: Icon, label, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
        <Icon size={16} weight="fill" />
        {label}
      </div>
      <div className="mt-3 space-y-1.5">{children}</div>
    </div>
  );
}

export default function Location() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const distanceList =
    locData.distances && locData.distances.length > 0
      ? locData.distances.map((d) => (typeof d === 'string' ? d : d.text || d))
      : DEFAULT_DISTANCES;

  return (
    <section id="location" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
        {/* Left: info card */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl border border-forest/10 bg-white/70 p-8 md:p-10"
        >
          <h2 className="font-serif text-3xl font-medium leading-tight text-forest-dark sm:text-4xl">
            {locData.titleLine1 || 'Conveniently Connected'}
            <br />
            {locData.titleLine2 || 'Naturally Secluded'}
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:gap-6">
            <div className="space-y-8">
              <Block icon={MapPin} label="Distance">
                {distanceList.map((d) => (
                  <p key={d} className="font-sans text-[14px] font-light leading-relaxed text-forest/70">
                    {d}
                  </p>
                ))}
                <p className="pt-1 font-sans text-[12px] font-light italic text-forest/45">
                  {locData.travelTimeDisclaimer || 'Travel times are estimates and vary with traffic.'}
                </p>
              </Block>
            </div>

            {/* QR */}
            <div className="flex md:justify-end">
              <QrCode />
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <Block icon={Car} label="Parking">
              <p className="font-sans text-[14px] font-light text-forest/70">
                {locData.parkingText || '500 car spaces available'}
              </p>
            </Block>
            <Block icon={NavigationArrow} label="Directions">
              <p className="font-sans text-[14px] font-light leading-relaxed text-forest/70">
                {locData.address || VENUE.address}
              </p>
              <div className="pt-3">
                <a
                  href={MAP.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-sm bg-forest px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-cream shadow-md transition-all duration-300 ease-premium hover:bg-forest-light active:scale-[0.98]"
                >
                  <NavigationArrow size={14} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                  {locData.directionsButtonLabel || 'Get Directions'}
                </a>
              </div>
            </Block>
          </div>
        </motion.div>

        {/* Right: map */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative min-h-[420px] overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-[0_30px_80px_-40px_rgba(20,57,43,0.4)]"
        >
          <iframe
            title={`Map showing ${locData.venueName || VENUE.name}`}
            src={MAP_EMBED}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}

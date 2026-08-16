import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CurrencyInr,
  CheckCircle,
  XCircle,
  Warning,
  ArrowRight,
  ShieldCheck,
  Lightning,
  Sparkle,
  Globe,
  FileText,
  LockKey,
  Images,
  PhoneCall,
  Buildings,
  Receipt,
  DownloadSimple,
  CaretRight,
  CaretDown,
  CaretUp,
  Database,
  PaperPlaneTilt,
  Table,
  Video,
  DeviceMobile,
  SlidersHorizontal,
  Cpu,
  Browsers,
  TrendUp,
  Play,
  Pause,
  SpeakerHigh,
  Microphone,
  Quotes,
  ShoppingCart,
  Trash,
  Plus,
  X,
  Gift
} from '@phosphor-icons/react';

// Boilerplate sub-component for Voice Recording Audits & Direct Price Comparisons (5-step Architecture)
function VoiceAuditCard({
  recordingNumber = 1,
  agencyName = "Agency Quote #1",
  quotedPrice = "₹2.5L - ₹4.0L",
  audioTitle = "Voice Recording Audio Breakdown",
  imageSrc = "",
  imageAlt = "Agency Quotation / Proposal Screenshot",
  audioSrc = "",
  summaryBullets = [],
  comparisonRows = [
    { metric: "Total Quoted Cost", agency: "₹3,50,000 + GST", amritaara: "₹60,000 (One-Time)", highlight: true },
    { metric: "Core Stack", agency: "WordPress + Elementor Theme", amritaara: "Bespoke React 18 + Serverless Engine" },
    { metric: "Delivery Timeline", agency: "60 – 90 Days", amritaara: "Ready & Live in 7 Days" },
    { metric: "Ongoing Maintenance", agency: "₹10,000 / month mandatory retainer", amritaara: "₹0 / month mandatory fee" },
    { metric: "Patient Appointment Engine", agency: "Not Included (Paid Third-Party SaaS)", amritaara: "Healthcare & Direct Booking Sync Built-In" },
    { metric: "Mobile Load Speed", agency: "3.8s – 5.5s (Fails Google Vitals)", amritaara: "< 0.6s Instant Load (95+ Score)" }
  ]
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
      {/* 1. HEADING */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black text-sm shrink-0">
            <Microphone size={20} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Audit #{recordingNumber}
              </span>
              <span className="text-xs font-bold text-slate-500">{agencyName}</span>
            </div>
            <h3 className="text-sm sm:text-lg font-black text-slate-900 mt-0.5 tracking-tight">
              {audioTitle}
            </h3>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-extrabold text-xs text-center shrink-0 self-start xs:self-auto">
          Quoted Price: <span className="text-rose-700 font-black">{quotedPrice}</span>
        </div>
      </div>

      {/* 2. IMAGE TO BE ATTACHED */}
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-3 overflow-hidden relative">
        {imageSrc ? (
          <div
            onClick={() => setIsFullView(true)}
            className="rounded-lg sm:rounded-xl overflow-hidden border border-slate-200 bg-white max-h-[350px] sm:max-h-[500px] flex items-center justify-center cursor-zoom-in relative group"
            title="Click to view full size image & zoom"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-contain max-h-[350px] sm:max-h-[500px]"
            />
          </div>
        ) : (
          <div className="py-5 sm:py-7 px-3 sm:px-4 text-center border-2 border-dashed border-slate-300 rounded-xl bg-white/80 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
              <Images size={22} weight="duotone" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-800">
              Agency Proposal / WhatsApp Quotation Screenshot Attached Here
            </div>
            <p className="text-[11px] text-slate-500 font-medium max-w-md mx-auto">
              Place screenshot image in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600">/public/audio/proposal_{recordingNumber}.png</code> to display automatically.
            </p>
          </div>
        )}
      </div>

      {/* PURE IMAGE FULLSCREEN VIEWER - ZERO FANCY UI */}
      <AnimatePresence>
        {isFullView && imageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-2 sm:p-4 select-none cursor-pointer"
            onClick={() => { setIsFullView(false); setIsZoomed(false); }}
          >
            {/* Top right quick actions: Open in new tab & close */}
            <div
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2 sm:gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] sm:text-xs border border-white/20 transition-colors backdrop-blur-md"
              >
                Open Original Image ↗
              </a>
              <button
                onClick={() => { setIsFullView(false); setIsZoomed(false); }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-black transition-colors backdrop-blur-md text-sm"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Pure image with zoom toggle on click */}
            <div
              className="w-full h-full flex items-center justify-center overflow-auto p-2 sm:p-4"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className={`transition-all duration-300 ${isZoomed
                  ? 'max-w-none w-auto h-auto cursor-zoom-out'
                  : 'max-w-full max-h-[92vh] object-contain cursor-zoom-in'
                  }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. RECORDING JUST BENEATH THE IMAGE */}
      {audioSrc ? (
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 space-y-2 sm:space-y-2.5 shadow-sm">
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={handleTimeUpdate}
          />
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={togglePlay}
              type="button"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-all shrink-0 font-black shadow-md cursor-pointer"
              title={isPlaying ? "Pause Recording" : "Play Recording"}
            >
              {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" className="ml-0.5" />}
            </button>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600 font-mono">
                <span className="font-bold text-slate-700">{formatTime(currentTime)}</span>
                <span className="text-slate-500 font-semibold">{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Number(e.target.value);
                    setCurrentTime(Number(e.target.value));
                  }
                }}
                style={{
                  background: `linear-gradient(to right, #059669 0%, #059669 ${progressPercent}%, #cbd5e1 ${progressPercent}%, #cbd5e1 100%)`
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-700 shadow-inner transition-all"
              />
            </div>
            <SpeakerHigh size={18} className="text-slate-500 shrink-0" />
          </div>
        </div>
      ) : null}

      {/* 4. BRIEF SUMMARY (PERMANENT) */}
      <div className="space-y-2 sm:space-y-2.5">
        <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 sm:gap-2">
          <Quotes size={16} weight="fill" className="text-slate-600" />
          Brief Summary
        </h4>
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/90">
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
            {summaryBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-slate-500 font-black leading-none mt-0.5">•</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. DETAILED COMPARISON BETWEEN US AND THEM IN TABLE FORMAT */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="flex items-center gap-2">
          <Table size={18} weight="bold" className="text-emerald-700" />
          <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-900">
            {agencyName} vs. Our Offerings
          </h4>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[500px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider">
                  <th className="py-2.5 px-3 sm:py-3 sm:px-4 w-1/3">Feature / Parameter</th>
                  <th className="py-2.5 px-3 sm:py-3 sm:px-4 w-1/3 text-rose-700 bg-rose-50/60">{agencyName}</th>
                  <th className="py-2.5 px-3 sm:py-3 sm:px-4 w-1/3 text-emerald-800 bg-emerald-50/70">Our Offerings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={row.highlight ? "bg-slate-50/80 font-bold" : "hover:bg-slate-50/40 transition-colors"}>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 font-semibold text-slate-900 leading-snug">{row.metric}</td>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-700 bg-rose-50/20 font-medium leading-snug">
                      {row.agency}
                    </td>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-emerald-950 bg-emerald-50/30 font-extrabold leading-snug">
                      {row.ourOfferings || row.amritaara}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const PARENT_CHILD_MAP = {
  c1_1: [
    { id: 'c1_1_sub1', title: 'Home Page Engine (Primary Sitemap & SEO Hub)', price: 3299, formattedPrice: '₹3,299' },
    { id: 'c1_1_sub2_p1', title: 'About Us Standalone Page', price: 999, formattedPrice: '₹999' },
    { id: 'c1_1_sub2_p2', title: 'Treatments & Services Standalone Page', price: 999, formattedPrice: '₹999' },
    { id: 'c1_1_sub2_p3', title: 'Clinic Gallery Standalone Page', price: 999, formattedPrice: '₹999' },
    { id: 'c1_1_sub2_p4', title: 'Dental Blog Standalone Page', price: 999, formattedPrice: '₹999' },
    { id: 'c1_1_sub2_p5', title: 'Doctor Profiles Standalone Page', price: 999, formattedPrice: '₹999' },
    { id: 'c1_1_sub2_p6', title: 'Appointment Booking Standalone Page', price: 999, formattedPrice: '₹999' },
    { id: 'c1_1_sub3_p1', title: 'Terms & Conditions Page', price: 399, formattedPrice: '₹399' },
    { id: 'c1_1_sub3_p2', title: 'Privacy Policy Page', price: 399, formattedPrice: '₹399' },
    { id: 'c1_1_sub3_p3', title: 'Custom Branded 404 Error Page', price: 399, formattedPrice: '₹399' },
    { id: 'c1_1_sub4_m1', title: 'Dental Blog Article Popup Modal', price: 399, formattedPrice: '₹399' },
    { id: 'c1_1_sub4_m2', title: 'Treatment Details Overlay Modal', price: 399, formattedPrice: '₹399' },
    { id: 'c1_1_sub4_m3', title: 'Quick Appointment Booking Modal', price: 399, formattedPrice: '₹399' },
  ],
  c1_2: [
    { id: 'c1_2_sub1', title: 'Home Page CMS Build & Integration', price: 1999, formattedPrice: '₹1,999' },
    { id: 'c1_2_sub2_p1', title: 'About Us CMS Integration', price: 799, formattedPrice: '₹799' },
    { id: 'c1_2_sub2_p2', title: 'Treatments & Services CMS Integration', price: 799, formattedPrice: '₹799' },
    { id: 'c1_2_sub2_p3', title: 'Clinic Gallery CMS Integration', price: 799, formattedPrice: '₹799' },
    { id: 'c1_2_sub2_p4', title: 'Dental Blog CMS Integration', price: 799, formattedPrice: '₹799' },
    { id: 'c1_2_sub2_p5', title: 'Doctor Profiles CMS Integration', price: 799, formattedPrice: '₹799' },
    { id: 'c1_2_sub2_p6', title: 'Appointment Booking CMS Integration', price: 799, formattedPrice: '₹799' },
    { id: 'c1_2_sub3_p1', title: 'Terms & Conditions CMS Integration', price: 199, formattedPrice: '₹199' },
    { id: 'c1_2_sub3_p2', title: 'Privacy Policy CMS Integration', price: 199, formattedPrice: '₹199' },
    { id: 'c1_2_sub4_m1', title: 'Blog Article Modal CMS Integration', price: 199, formattedPrice: '₹199' },
    { id: 'c1_2_sub4_m2', title: 'Treatment Details Modal CMS Integration', price: 199, formattedPrice: '₹199' },
    { id: 'c1_2_sub4_m3', title: 'Appointment Booking Modal CMS Integration', price: 199, formattedPrice: '₹199' },
  ],
  c1_6: [
    { id: 'c1_6_sub1', title: 'Cloudflare Workers Implementation (Serverless API Gateways)', price: 1799, formattedPrice: '₹1,799' },
    { id: 'c1_6_sub2', title: 'Global Edge CDN & Cloudflare R2 Storage Implementation', price: 1199, formattedPrice: '₹1,199' },
  ],
  c1_7: [
    { id: 'c1_7_sub1', title: 'Cloudflare Turnstile (CAPTCHA-Free Anti-Bot Guard)', price: 1199, formattedPrice: '₹1,199' },
    { id: 'c1_7_sub2', title: 'Enterprise WAF, Rate Limiting & Edge Caching', price: 1499, formattedPrice: '₹1,499' },
  ],
};

const CHILD_TO_PARENT = {};
Object.entries(PARENT_CHILD_MAP).forEach(([parentId, children]) => {
  children.forEach(child => {
    CHILD_TO_PARENT[child.id] = parentId;
  });
});

export default function PricingBreakdownPage() {
  const [activeTab, setActiveTab] = useState('pricing');
  const [openItems, setOpenItems] = useState({ roi_math: true });
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const prevAllAddedRef = useRef(false);

  const isPricingActive = activeTab === 'pricing';
  const isCartActive = activeTab === 'cart';

  const [cartItems, setCartItems] = useState([]);

  const triggerCelebrationConfetti = () => {
    // Stage 1: Central Birthday Boom Poppers
    confetti({
      particleCount: 130,
      spread: 110,
      origin: { y: 0.55 },
      colors: ['#3b82f6', '#10b981', '#fbbf24', '#ec4899', '#06b6d4', '#8b5cf6'],
      disableForReducedMotion: true,
    });

    // Stage 2: Left & Right Corner Fireworks Cannons
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 80,
        origin: { x: 0.05, y: 0.65 },
        colors: ['#3b82f6', '#10b981', '#fbbf24', '#f43f5e']
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 80,
        origin: { x: 0.95, y: 0.65 },
        colors: ['#3b82f6', '#10b981', '#fbbf24', '#f43f5e']
      });
    }, 220);

    // Stage 3: Glittering Golden Star Rain
    setTimeout(() => {
      confetti({
        particleCount: 65,
        spread: 160,
        origin: { y: 0.35 },
        shapes: ['star'],
        colors: ['#fbbf24', '#38bdf8', '#34d399', '#f472b6'],
        scalar: 1.3
      });
    }, 450);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const isItemInCart = (id) => {
    if (PARENT_CHILD_MAP[id]) {
      const children = PARENT_CHILD_MAP[id];
      if (cartItems.some(i => i.id === id)) return true;
      return children.every(child => cartItems.some(i => i.id === child.id));
    }
    const parentId = CHILD_TO_PARENT[id];
    if (parentId) {
      if (cartItems.some(i => i.id === parentId)) return true;
      return cartItems.some(i => i.id === id);
    }
    return cartItems.some(i => i.id === id);
  };

  // Watch cart state to trigger Birthday Boom celebration when all 7 sections are added to cart
  useEffect(() => {
    const ALL_SECTION_IDS = ['c1_1', 'c1_2', 'c1_3', 'c1_4', 'c1_5', 'c1_6', 'c1_7'];
    const allAdded = ALL_SECTION_IDS.every(id => isItemInCart(id));

    if (allAdded && !prevAllAddedRef.current) {
      triggerCelebrationConfetti();
      setShowCelebrationModal(true);
    }
    prevAllAddedRef.current = allAdded;
  }, [cartItems]);

  const toggleCartItem = (item) => {
    setCartItems(prev => {
      const itemId = item.id;
      let next = [];

      // PARENT OPTION (e.g. c1_1, c1_2, c1_6, c1_7)
      if (PARENT_CHILD_MAP[itemId]) {
        const children = PARENT_CHILD_MAP[itemId];
        const childIds = children.map(c => c.id);
        const parentInCart = prev.some(i => i.id === itemId);
        const allChildrenInCart = children.every(c => prev.some(i => i.id === c.id));

        if (parentInCart || allChildrenInCart) {
          // Remove parent and all of its sub-options
          next = prev.filter(i => i.id !== itemId && !childIds.includes(i.id));
        } else {
          // Add all sub-options of this parent option
          const filtered = prev.filter(i => i.id !== itemId && !childIds.includes(i.id));
          next = [...filtered, ...children];
        }
      } else {
        // SUB-OPTION (e.g. c1_1_sub1, c1_7_sub1)
        const parentId = CHILD_TO_PARENT[itemId];
        if (parentId) {
          const siblings = PARENT_CHILD_MAP[parentId];
          const parentInCart = prev.some(i => i.id === parentId);

          if (parentInCart) {
            const remainingSiblings = siblings.filter(s => s.id !== itemId);
            const filtered = prev.filter(i => i.id !== parentId && i.id !== itemId);
            next = [...filtered, ...remainingSiblings];
          } else {
            const childInCart = prev.some(i => i.id === itemId);
            if (childInCart) {
              next = prev.filter(i => i.id !== itemId);
            } else {
              next = [...prev, item];
            }
          }
        } else {
          // STANDALONE ITEM (e.g. c1_3, c1_4, c1_5)
          const exists = prev.some(i => i.id === itemId);
          if (exists) {
            next = prev.filter(i => i.id !== itemId);
          } else {
            next = [...prev, item];
          }
        }
      }

      // --- AUTOMATIC DEPENDENCY & SECURITY LOGIC ---
      const INTEGRATION_IDS = ['c1_3', 'c1_4', 'c1_5'];
      const c1_7_children = PARENT_CHILD_MAP['c1_7'] || [];
      const c1_7_child_ids = c1_7_children.map(c => c.id);

      const isC17InCart = (cartList) => {
        if (cartList.some(i => i.id === 'c1_7')) return true;
        return c1_7_children.every(c => cartList.some(i => i.id === c.id));
      };

      const wasC17InCart = isC17InCart(prev);
      const isC17NowInCart = isC17InCart(next);

      const wasAnyIntegrationAdded = INTEGRATION_IDS.some(id =>
        !prev.some(i => i.id === id) && next.some(i => i.id === id)
      );

      const isAnyIntegrationCurrentlyInNext = INTEGRATION_IDS.some(id =>
        next.some(i => i.id === id)
      );

      // RULE A: Adding Telegram, Google Sheets, or Two-Way Lead Sync automatically includes Cloudflare Anti-Bot Guard
      if (wasAnyIntegrationAdded && !isC17NowInCart) {
        const filteredNext = next.filter(i => i.id !== 'c1_7' && !c1_7_child_ids.includes(i.id));
        next = [...filteredNext, ...c1_7_children];
        setTimeout(() => {
          showToast("Cloudflare Anti-Bot Guard was automatically added to protect your live notification & lead sync integrations.");
        }, 0);
      }
      // RULE B: Removing Cloudflare Anti-Bot Guard automatically removes Telegram, Google Sheets & Two-Way Lead Sync
      else if (wasC17InCart && !isC17NowInCart && isAnyIntegrationCurrentlyInNext) {
        next = next.filter(i => !INTEGRATION_IDS.includes(i.id));
        setTimeout(() => {
          showToast("Removing Anti-Bot Guard automatically removed notification & lead sync options as live endpoints require bot security.");
        }, 0);
      }

      return next;
    });
  };

  const ALL_SECTION_IDS = ['c1_1', 'c1_2', 'c1_3', 'c1_4', 'c1_5', 'c1_6', 'c1_7'];
  const isFullBundleInCart = ALL_SECTION_IDS.every(id => isItemInCart(id));
  const rawCartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const cartTotal = isFullBundleInCart ? 24999 : rawCartTotal;

  const toggleItem = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSequenceRow = (row) => {
    if (row === 1) {
      const newState = !openItems['seq_1'];
      setOpenItems(prev => ({ ...prev, seq_1: newState, seq_2: newState }));
    } else if (row === 2) {
      const newState = !openItems['seq_3'];
      setOpenItems(prev => ({ ...prev, seq_3: newState, seq_4: newState }));
    }
  };



  const tabs = [
    { id: 'pricing', label: 'Pricing Breakdown', targetId: 'section-1' },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, targetId: 'cart-section' }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    const element = document.getElementById(tab.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-16 sm:pb-24">
      {/* Floating Centered Navbar */}
      <header className="sticky top-2 sm:top-5 z-50 flex justify-center px-2 sm:px-4">
        <nav className="w-full max-w-[380px] sm:max-w-[480px] flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-transparent backdrop-blur-xl p-1.5 sm:p-2 shadow-xl sm:shadow-2xl shadow-slate-900/10 font-black transform-gpu [backface-visibility:hidden] [transform:translateZ(0)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`relative z-10 flex-1 rounded-full py-2.5 sm:py-3.5 px-3 sm:px-5 text-center transition-colors duration-200 cursor-pointer select-none font-black tracking-tight sm:tracking-wide text-sm sm:text-base leading-tight flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[52px] transform-gpu [backface-visibility:hidden] ${isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProposalTab"
                    className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-md shadow-blue-500/30 transform-gpu"
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                  />
                )}
                {Icon && <Icon size={22} weight="bold" className="shrink-0" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 pt-4 sm:pt-14">
        {/* SUBSECTION 1: PRICING BREAKDOWN */}
        {(activeTab === 'pricing' || activeTab === 'cart') && (
          <div className="space-y-10 animate-fade-in">
            {/* VISUAL FLOWCHART 1: CAPITAL ALLOCATION TREE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col items-center justify-center text-center border-b border-slate-100">
                <span className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-4 py-1.5 text-xs shadow-2xs">
                  <span className="font-black uppercase tracking-wider text-blue-700 text-sm">Transparent Price Breakdown</span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-slate-800 font-bold text-sm">Complete Dental Clinic Platform</span>
                </span>
              </div>

              {/* Flowchart Diagram Canvas */}
              <div className="relative  pb-2 space-y-6">
                {/* Central Root Box */}
                <div className="mx-auto max-w-xl rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 p-4 sm:p-6 text-white text-center shadow-lg shadow-blue-500/20 space-y-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight">₹28,568 Breakdown</h3>
                  </div>

                  {/* Professional Notice Banner */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black shrink-0 shadow-xs">
                        <Sparkle size={18} weight="fill" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base sm:text-base font-extrabold text-white leading-tight">
                          Unlock discounted price!
                        </p>
                        <p className="text-[14px] sm:text-sm font-semibold text-white mt-0.5">
                          Get the complete suite for <strong className="text-amber-200 font-black text-base">₹24,999</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const ALL_SECTIONS = [
                          { id: 'c1_1', title: 'Multi-page static & Mobile first Responsive Dental Website', price: 11687, formattedPrice: '₹11,687' },
                          { id: 'c1_2', title: 'Content Management System (CMS)', price: 7788, formattedPrice: '₹7,788' },
                          { id: 'c1_3', title: 'Automated Google Sheets Patient Lead Ledger', price: 899, formattedPrice: '₹899' },
                          { id: 'c1_4', title: 'Telegram & WhatsApp Instant Notifications', price: 1199, formattedPrice: '₹1,199' },
                          { id: 'c1_5', title: 'Two-Way Telegram ↔ Ledger Sync Engine', price: 1299, formattedPrice: '₹1,299' },
                          { id: 'c1_6', title: 'Cloudflare Workers & R2 Storage deployment', price: 2998, formattedPrice: '₹2,998' },
                          { id: 'c1_7', title: 'Cloudflare Anti-Bot Guard & Enterprise WAF Infrastructure', price: 2698, formattedPrice: '₹2,698' },
                        ];
                        setCartItems(ALL_SECTIONS);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 shrink-0 border border-amber-300/60"
                    >
                      <ShoppingCart size={18} weight="bold" />
                      <span>Add All to Cart</span>
                    </button>
                  </div>
                </div>

                {/* Simple Lightweight SVG Flowchart Arrows */}
                <div className="hidden md:block my-2">
                  <svg className="w-full h-10 fill-none stroke-slate-300" viewBox="0 0 600 40" preserveAspectRatio="none">
                    {/* Stem down from root */}
                    <line x1="300" y1="0" x2="300" y2="18" strokeWidth="1.5" />
                    {/* Horizontal distribution line */}
                    <line x1="150" y1="18" x2="450" y2="18" strokeWidth="1.5" />
                    {/* Left drop line */}
                    <line x1="150" y1="18" x2="150" y2="36" strokeWidth="1.5" />
                    {/* Right drop line */}
                    <line x1="450" y1="18" x2="450" y2="36" strokeWidth="1.5" />
                    {/* Lightweight Arrowhead Left */}
                    <path d="M 145 30 L 150 37 L 155 30" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Lightweight Arrowhead Right */}
                    <path d="M 445 30 L 450 37 L 455 30" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* 2 Primary Level Branches: Website UI vs Appointment Engine */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* BRANCH A: WEBSITE UI & FRONTEND ARCHITECTURE (₹28,568) */}
                  <div
                    id="section-1"
                    className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-mt-20 sm:scroll-mt-24 transition-all duration-300 ${isPricingActive
                      ? 'bg-blue-50/50 ring-4 ring-blue-500/20 shadow-xl shadow-blue-500/10 md:scale-[1.015] z-10'
                      : 'bg-blue-50/20 md:opacity-75 hover:md:opacity-100'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-blue-200/60 pb-3 sm:pb-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-black text-slate-900">Website UI & Patient Lead Management Architecture</h4>
                      </div>
                      <span className={`text-base sm:text-xl font-black px-3 sm:px-3.5 py-1 rounded-xl sm:rounded-2xl border transition-all duration-300 shrink-0 pt-0.5 ${isPricingActive
                        ? 'text-blue-800 bg-blue-100 border-blue-300 shadow-2xs'
                        : 'text-blue-700 bg-blue-100/60 border-blue-200'
                        }`}>
                        ₹28,568
                      </span>
                    </div>

                    {/* Sub-itemized Technical Deliverables with Interactive Collapsible Toggle Bars */}
                    <div className="space-y-3.5">
                      {/* Item 1 */}
                      <div className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs overflow-hidden ${openItems['c1_1'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-100 hover:border-blue-300 hover:shadow-sm'}`}>
                        <div
                          onClick={() => toggleItem('c1_1')}
                          className="p-3.5 sm:p-4 space-y-2.5 cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 shrink-0 text-blue-700">
                                <Browsers size={20} weight="bold" />
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug break-words flex-1 min-w-0">
                                Multi-page static & Mobile first Responsive Dental Website
                              </h5>
                            </div>
                            <motion.div animate={{ rotate: openItems['c1_1'] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 p-1">
                              <CaretDown size={16} className="text-slate-400" weight="bold" />
                            </motion.div>
                          </div>
                          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-blue-100/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCartItem({ id: 'c1_1', title: 'Multi-page static & Mobile first Responsive Dental Website', price: 11687, formattedPrice: '₹11,687' });
                              }}
                              title={isItemInCart('c1_1') ? "Remove Entire Package" : "Include All Sub-Options"}
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${isItemInCart('c1_1')
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-emerald-950 hover:text-white border-emerald-400/80 hover:border-emerald-700 shadow-2xs hover:shadow-md'
                                }`}
                            >
                              {isItemInCart('c1_1') ? (
                                <>
                                  <CheckCircle size={18} weight="bold" />
                                  <span className="font-extrabold text-xs sm:text-sm">Added</span>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-0.5 text-current">
                                    <Plus size={13} weight="bold" />
                                    <ShoppingCart size={16} weight="bold" />
                                  </div>
                                  <span className="font-extrabold text-xs sm:text-sm text-current">Include All</span>
                                </>
                              )}
                            </button>
                            <span className="font-black text-xs sm:text-sm text-blue-800 bg-blue-100 px-3 py-1.5 rounded-lg sm:rounded-xl border border-blue-300 shadow-2xs">₹11,687</span>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openItems['c1_1'] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 space-y-3 bg-blue-50/20"
                            >
                              {/* Overview Subtitle */}
                              <p className="leading-relaxed font-medium text-slate-700 bg-white p-3 sm:p-3.5 rounded-xl border border-blue-100/80 shadow-2xs text-xs sm:text-sm">
                                Build a beautiful, Ultra-smooth static dental website compatible & responsive across both laptop and mobile screen sizes — featuring smooth Lenis scroll physics, patient-friendly UI, and ultra-optimized video & media assets.
                              </p>

                              {/* Granular Line-Item Breakdown */}
                              <div className="space-y-2.5 pt-1">
                                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block">Cost & Feature Breakdown</span>

                                {/* Home Page Engine */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-2 shadow-2xs">
                                  <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">1. Home Page Engine (Primary Sitemap & SEO Hub)</h6>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCartItem({ id: 'c1_1_sub1', title: 'Home Page Engine (Primary Sitemap & SEO Hub)', price: 3299, formattedPrice: '₹3,299' });
                                      }}
                                      title={isItemInCart('c1_1_sub1') ? "Remove from Cart" : "Add to Cart"}
                                      className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart('c1_1_sub1')
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                        : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                        }`}
                                    >
                                      {isItemInCart('c1_1_sub1') ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                    </button>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs">₹3,299</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-start gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Decides the entire website sitemap and search engine SEO framework. Includes custom patient appointment form, clinic location mapping (with QR integration), section routing, plus optimized media assets.
                                    </p>
                                  </div>
                                </div>

                                {/* Dedicated Standalone Pages */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-3 shadow-2xs">
                                  <div className="flex items-center justify-between gap-2 border-b border-blue-100/60 pb-2">
                                    <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">2. Dedicated Standalone Pages</h6>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs shrink-0">₹999 / page</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-2.5">
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Select individual tailored pages designed for specific patient journeys:
                                    </p>
                                    <ul className="space-y-2">
                                      {[
                                        { id: 'c1_1_sub2_p1', title: 'About Us Standalone Page', name: 'About Us Page', desc: 'Clinic story, mission, values & credentials', price: 999, formattedPrice: '₹999' },
                                        { id: 'c1_1_sub2_p2', title: 'Treatments & Services Standalone Page', name: 'Treatments & Services Page', desc: 'Comprehensive list of procedures & care info', price: 999, formattedPrice: '₹999' },
                                        { id: 'c1_1_sub2_p3', title: 'Clinic Gallery Standalone Page', name: 'Clinic Gallery Page', desc: 'Photos of clinic, tech & before/after results', price: 999, formattedPrice: '₹999' },
                                        { id: 'c1_1_sub2_p4', title: 'Dental Blog Standalone Page', name: 'Dental Blog Page', desc: 'Educational dental articles & patient guides', price: 999, formattedPrice: '₹999' },
                                        { id: 'c1_1_sub2_p5', title: 'Doctor Profiles Standalone Page', name: 'Doctor Profiles Page', desc: 'Dentist bios, qualifications & achievements', price: 999, formattedPrice: '₹999' },
                                        { id: 'c1_1_sub2_p6', title: 'Appointment Booking Standalone Page', name: 'Appointment Booking Page', desc: 'Dedicated booking page with calendar & form sync', price: 999, formattedPrice: '₹999' },
                                      ].map((page) => (
                                        <li key={page.id} className="p-2 sm:p-2.5 rounded-xl bg-white border border-blue-100/90 flex items-center justify-between gap-2.5 shadow-2xs hover:border-blue-200 transition-all">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">{page.name}</h6>
                                              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{page.desc}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCartItem({ id: page.id, title: page.title, price: page.price, formattedPrice: page.formattedPrice });
                                              }}
                                              title={isItemInCart(page.id) ? "Remove from Cart" : "Add to Cart"}
                                              className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart(page.id)
                                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                                : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                                }`}
                                            >
                                              {isItemInCart(page.id) ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                            </button>
                                            <span className="font-black text-blue-800 text-[11px] sm:text-xs bg-blue-100/90 px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">{page.formattedPrice}</span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Policy & Legal Pages */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-3 shadow-2xs">
                                  <div className="flex items-center justify-between gap-2 border-b border-blue-100/60 pb-2">
                                    <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">3. Policy, Legal & Custom 404 Pages</h6>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs shrink-0">₹399 / page</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-2.5">
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Select compliance & maintenance framework pages:
                                    </p>
                                    <ul className="space-y-2">
                                      {[
                                        { id: 'c1_1_sub3_p1', title: 'Terms & Conditions Page', name: 'Terms & Conditions Page', desc: 'Legal terms of service & clinic patient agreement', price: 399, formattedPrice: '₹399' },
                                        { id: 'c1_1_sub3_p2', title: 'Privacy Policy Page', name: 'Privacy Policy Page', desc: 'Patient data privacy & health info protection policy', price: 399, formattedPrice: '₹399' },
                                        { id: 'c1_1_sub3_p3', title: 'Custom Branded 404 Error Page', name: 'Custom Branded 404 Page', desc: 'Custom error page with search & quick redirection', price: 399, formattedPrice: '₹399' },
                                      ].map((page) => (
                                        <li key={page.id} className="p-2 sm:p-2.5 rounded-xl bg-white border border-blue-100/90 flex items-center justify-between gap-2.5 shadow-2xs hover:border-blue-200 transition-all">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">{page.name}</h6>
                                              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{page.desc}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCartItem({ id: page.id, title: page.title, price: page.price, formattedPrice: page.formattedPrice });
                                              }}
                                              title={isItemInCart(page.id) ? "Remove from Cart" : "Add to Cart"}
                                              className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart(page.id)
                                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                                : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                                }`}
                                            >
                                              {isItemInCart(page.id) ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                            </button>
                                            <span className="font-black text-blue-800 text-[11px] sm:text-xs bg-blue-100/90 px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">{page.formattedPrice}</span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Interactive Sub-Page Popups */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-3 shadow-2xs">
                                  <div className="flex items-center justify-between gap-2 border-b border-blue-100/60 pb-2">
                                    <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">4. Interactive Sub-Page Popups & Modals</h6>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs shrink-0">₹399 / modal</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-2.5">
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Select interactive overlay modals for detailed sub-content views:
                                    </p>
                                    <ul className="space-y-2">
                                      {[
                                        { id: 'c1_1_sub4_m1', title: 'Dental Blog Article Popup Modal', name: 'Dental Blog Article Modal', desc: 'Read full dental articles without page reloads', price: 399, formattedPrice: '₹399' },
                                        { id: 'c1_1_sub4_m2', title: 'Treatment Details Overlay Modal', name: 'Treatment Details Overlay Modal', desc: 'In-depth treatment info, pre-op steps & pricing popup', price: 399, formattedPrice: '₹399' },
                                        { id: 'c1_1_sub4_m3', title: 'Quick Appointment Booking Modal', name: 'Quick Appointment Booking Modal', desc: 'Instant appointment booking popup accessible site-wide', price: 399, formattedPrice: '₹399' },
                                      ].map((modal) => (
                                        <li key={modal.id} className="p-2 sm:p-2.5 rounded-xl bg-white border border-blue-100/90 flex items-center justify-between gap-2.5 shadow-2xs hover:border-blue-200 transition-all">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">{modal.name}</h6>
                                              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{modal.desc}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCartItem({ id: modal.id, title: modal.title, price: modal.price, formattedPrice: modal.formattedPrice });
                                              }}
                                              title={isItemInCart(modal.id) ? "Remove from Cart" : "Add to Cart"}
                                              className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart(modal.id)
                                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                                : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                                }`}
                                            >
                                              {isItemInCart(modal.id) ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                            </button>
                                            <span className="font-black text-blue-800 text-[11px] sm:text-xs bg-blue-100/90 px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">{modal.formattedPrice}</span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Item 2 */}
                      <div className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs overflow-hidden ${openItems['c1_2'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-100 hover:border-blue-300 hover:shadow-sm'}`}>
                        <div
                          onClick={() => toggleItem('c1_2')}
                          className="p-3.5 sm:p-4 space-y-2.5 cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 shrink-0 text-blue-700">
                                <FileText size={20} weight="bold" />
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug break-words flex-1 min-w-0">
                                Content Management System
                              </h5>
                            </div>
                            <motion.div animate={{ rotate: openItems['c1_2'] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 p-1">
                              <CaretDown size={16} className="text-slate-400" weight="bold" />
                            </motion.div>
                          </div>
                          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-blue-100/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCartItem({ id: 'c1_2', title: 'Content Management System', price: 7788, formattedPrice: '₹7,788' });
                              }}
                              title={isItemInCart('c1_2') ? "Remove Entire Package" : "Include All Sub-Options"}
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${isItemInCart('c1_2')
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-emerald-950 hover:text-white border-emerald-400/80 hover:border-emerald-700 shadow-2xs hover:shadow-md'
                                }`}
                            >
                              {isItemInCart('c1_2') ? (
                                <>
                                  <CheckCircle size={18} weight="bold" />
                                  <span className="font-extrabold text-xs sm:text-sm">Added</span>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-0.5 text-current">
                                    <Plus size={13} weight="bold" />
                                    <ShoppingCart size={16} weight="bold" />
                                  </div>
                                  <span className="font-extrabold text-xs sm:text-sm text-current">Include All</span>
                                </>
                              )}
                            </button>
                            <span className="font-black text-xs sm:text-sm text-blue-800 bg-blue-100 px-3 py-1.5 rounded-lg sm:rounded-xl border border-blue-300 shadow-2xs">₹7,788</span>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openItems['c1_2'] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 space-y-3 bg-blue-50/20"
                            >
                              {/* Overview Subtitle */}
                              <p className="leading-relaxed font-medium text-slate-700 bg-white p-3 sm:p-3.5 rounded-xl border border-blue-100/80 shadow-2xs text-xs sm:text-sm">
                                Built a headless, self-serve JSON content management architecture enabling the clinic owner / dentist to update treatment prices, consultation fees, doctor profiles, media galleries, and dental blog entries in real-time without requiring developer assistance — <strong className="text-slate-900 font-bold">hence making the site completely dynamic</strong>.
                              </p>

                              {/* Granular Line-Item Breakdown */}
                              <div className="space-y-2.5 pt-1">
                                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block">Cost & Feature Breakdown</span>

                                {/* Home Page CMS */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-2 shadow-2xs">
                                  <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">1. Home Page CMS Build & Integration</h6>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCartItem({ id: 'c1_2_sub1', title: 'Home Page CMS Build & Integration', price: 1999, formattedPrice: '₹1,999' });
                                      }}
                                      title={isItemInCart('c1_2_sub1') ? "Remove from Cart" : "Add to Cart"}
                                      className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart('c1_2_sub1')
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                        : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                        }`}
                                    >
                                      {isItemInCart('c1_2_sub1') ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                    </button>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs">₹1,999</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-start gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Dynamic JSON schema mapping for hero banners, footer, patient appointment form and all content on the homepage&apos;s different sections enabling clinic to edit effortlessly.
                                    </p>
                                  </div>
                                </div>

                                {/* Per Page Standalone CMS */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-3 shadow-2xs">
                                  <div className="flex items-center justify-between gap-2 border-b border-blue-100/60 pb-2">
                                    <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">2. Standalone Pages CMS Integration</h6>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs shrink-0">₹799 / page</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-2.5">
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Select CMS wiring for individual standalone pages:
                                    </p>
                                    <ul className="space-y-2">
                                      {[
                                        { id: 'c1_2_sub2_p1', title: 'About Us CMS Integration', name: 'About Us CMS', desc: 'Dynamic CMS management for clinic info & story', price: 799, formattedPrice: '₹799' },
                                        { id: 'c1_2_sub2_p2', title: 'Treatments & Services CMS Integration', name: 'Treatments & Services CMS', desc: 'CMS control to add & edit dental procedures', price: 799, formattedPrice: '₹799' },
                                        { id: 'c1_2_sub2_p3', title: 'Clinic Gallery CMS Integration', name: 'Clinic Gallery CMS', desc: 'Upload & manage clinic photos & before/after cases', price: 799, formattedPrice: '₹799' },
                                        { id: 'c1_2_sub2_p4', title: 'Dental Blog CMS Integration', name: 'Dental Blog CMS', desc: 'Publish & edit blog posts with rich text editor', price: 799, formattedPrice: '₹799' },
                                        { id: 'c1_2_sub2_p5', title: 'Doctor Profiles CMS Integration', name: 'Doctor Profiles CMS', desc: 'Manage doctor profiles, specialties & schedules', price: 799, formattedPrice: '₹799' },
                                        { id: 'c1_2_sub2_p6', title: 'Appointment Booking CMS Integration', name: 'Appointment Booking CMS', desc: 'Configure booking settings, slots & patient alerts', price: 799, formattedPrice: '₹799' },
                                      ].map((page) => (
                                        <li key={page.id} className="p-2 sm:p-2.5 rounded-xl bg-white border border-blue-100/90 flex items-center justify-between gap-2.5 shadow-2xs hover:border-blue-200 transition-all">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">{page.name}</h6>
                                              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{page.desc}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCartItem({ id: page.id, title: page.title, price: page.price, formattedPrice: page.formattedPrice });
                                              }}
                                              title={isItemInCart(page.id) ? "Remove from Cart" : "Add to Cart"}
                                              className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart(page.id)
                                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                                : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                                }`}
                                            >
                                              {isItemInCart(page.id) ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                            </button>
                                            <span className="font-black text-blue-800 text-[11px] sm:text-xs bg-blue-100/90 px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">{page.formattedPrice}</span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Terms & Privacy CMS */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-3 shadow-2xs">
                                  <div className="flex items-center justify-between gap-2 border-b border-blue-100/60 pb-2">
                                    <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">3. Terms & Privacy Policy CMS</h6>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs shrink-0">₹199 / page</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-2.5">
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Select legal & privacy policy CMS controls:
                                    </p>
                                    <ul className="space-y-2">
                                      {[
                                        { id: 'c1_2_sub3_p1', title: 'Terms & Conditions CMS Integration', name: 'Terms & Conditions CMS', desc: 'CMS control to update clinic terms & patient agreement text', price: 199, formattedPrice: '₹199' },
                                        { id: 'c1_2_sub3_p2', title: 'Privacy Policy CMS Integration', name: 'Privacy Policy CMS', desc: 'CMS control to update privacy policy & data protection terms', price: 199, formattedPrice: '₹199' },
                                      ].map((page) => (
                                        <li key={page.id} className="p-2 sm:p-2.5 rounded-xl bg-white border border-blue-100/90 flex items-center justify-between gap-2.5 shadow-2xs hover:border-blue-200 transition-all">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">{page.name}</h6>
                                              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{page.desc}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCartItem({ id: page.id, title: page.title, price: page.price, formattedPrice: page.formattedPrice });
                                              }}
                                              title={isItemInCart(page.id) ? "Remove from Cart" : "Add to Cart"}
                                              className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart(page.id)
                                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                                : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                                }`}
                                            >
                                              {isItemInCart(page.id) ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                            </button>
                                            <span className="font-black text-blue-800 text-[11px] sm:text-xs bg-blue-100/90 px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">{page.formattedPrice}</span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Pop-up Sub-pages CMS */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-3 shadow-2xs">
                                  <div className="flex items-center justify-between gap-2 border-b border-blue-100/60 pb-2">
                                    <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">4. Pop-up Sub-pages CMS Integration</h6>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs shrink-0">₹199 / modal</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-2.5">
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Select CMS wiring for interactive popup modals:
                                    </p>
                                    <ul className="space-y-2">
                                      {[
                                        { id: 'c1_2_sub4_m1', title: 'Blog Article Modal CMS Integration', name: 'Blog Article Modal CMS', desc: 'Manage blog modal content & media attachments dynamically', price: 199, formattedPrice: '₹199' },
                                        { id: 'c1_2_sub4_m2', title: 'Treatment Details Modal CMS Integration', name: 'Treatment Details Modal CMS', desc: 'Update treatment modal FAQs, pricing & care notes', price: 199, formattedPrice: '₹199' },
                                        { id: 'c1_2_sub4_m3', title: 'Appointment Booking Modal CMS Integration', name: 'Appointment Booking Modal CMS', desc: 'Configure quick booking modal fields & timing slots', price: 199, formattedPrice: '₹199' },
                                      ].map((modal) => (
                                        <li key={modal.id} className="p-2 sm:p-2.5 rounded-xl bg-white border border-blue-100/90 flex items-center justify-between gap-2.5 shadow-2xs hover:border-blue-200 transition-all">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">{modal.name}</h6>
                                              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{modal.desc}</p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCartItem({ id: modal.id, title: modal.title, price: modal.price, formattedPrice: modal.formattedPrice });
                                              }}
                                              title={isItemInCart(modal.id) ? "Remove from Cart" : "Add to Cart"}
                                              className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart(modal.id)
                                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                                : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                                }`}
                                            >
                                              {isItemInCart(modal.id) ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                            </button>
                                            <span className="font-black text-blue-800 text-[11px] sm:text-xs bg-blue-100/90 px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">{modal.formattedPrice}</span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Item 3 */}
                      <div className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs overflow-hidden ${openItems['c1_3'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-100 hover:border-blue-300 hover:shadow-sm'}`}>
                        <div
                          onClick={() => toggleItem('c1_3')}
                          className="p-3.5 sm:p-4 space-y-2.5 cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 shrink-0 text-blue-700">
                                <PaperPlaneTilt size={20} weight="bold" />
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug break-words flex-1 min-w-0">
                                Telegram & WhatsApp Instant Notifications
                              </h5>
                            </div>
                            <motion.div animate={{ rotate: openItems['c1_3'] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 p-1">
                              <CaretDown size={16} className="text-slate-400" weight="bold" />
                            </motion.div>
                          </div>
                          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-blue-100/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCartItem({ id: 'c1_3', title: 'Telegram & WhatsApp Instant Notifications', price: 1199, formattedPrice: '₹1,199' });
                              }}
                              title={isItemInCart('c1_3') ? "Remove Section" : "Add Section to Cart"}
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${isItemInCart('c1_3')
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-emerald-950 hover:text-white border-emerald-400/80 hover:border-emerald-700 shadow-2xs hover:shadow-md'
                                }`}
                            >
                              {isItemInCart('c1_3') ? (
                                <>
                                  <CheckCircle size={18} weight="bold" />
                                  <span className="font-extrabold text-xs sm:text-sm">Added</span>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-0.5 text-current">
                                    <Plus size={13} weight="bold" />
                                    <ShoppingCart size={16} weight="bold" />
                                  </div>
                                  <span className="font-extrabold text-xs sm:text-sm text-current">Add Section</span>
                                </>
                              )}
                            </button>
                            <span className="font-black text-xs sm:text-sm text-blue-800 bg-blue-100 px-3 py-1.5 rounded-lg sm:rounded-xl border border-blue-300 shadow-2xs">₹1,199</span>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openItems['c1_3'] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 space-y-1.5 bg-blue-50/30"
                            >
                              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-blue-100/80 flex items-start gap-2 shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                  Multi-channel webhook notification system dispatching instant patient appointment & consultation inquiry alerts directly to Telegram clinic staff channels & WhatsApp Business response templates.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Item 4 */}
                      <div className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs overflow-hidden ${openItems['c1_4'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-100 hover:border-blue-300 hover:shadow-sm'}`}>
                        <div
                          onClick={() => toggleItem('c1_4')}
                          className="p-3.5 sm:p-4 space-y-2.5 cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 shrink-0 text-blue-700">
                                <Table size={20} weight="bold" />
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug break-words flex-1 min-w-0">
                                Automated Google Sheets Patient Lead Ledger
                              </h5>
                            </div>
                            <motion.div animate={{ rotate: openItems['c1_4'] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 p-1">
                              <CaretDown size={16} className="text-slate-400" weight="bold" />
                            </motion.div>
                          </div>
                          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-blue-100/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCartItem({ id: 'c1_4', title: 'Automated Google Sheets Patient Lead Ledger', price: 899, formattedPrice: '₹899' });
                              }}
                              title={isItemInCart('c1_4') ? "Remove Section" : "Add Section to Cart"}
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${isItemInCart('c1_4')
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-emerald-950 hover:text-white border-emerald-400/80 hover:border-emerald-700 shadow-2xs hover:shadow-md'
                                }`}
                            >
                              {isItemInCart('c1_4') ? (
                                <>
                                  <CheckCircle size={18} weight="bold" />
                                  <span className="font-extrabold text-xs sm:text-sm">Added</span>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-0.5 text-current">
                                    <Plus size={13} weight="bold" />
                                    <ShoppingCart size={16} weight="bold" />
                                  </div>
                                  <span className="font-extrabold text-xs sm:text-sm text-current">Add Section</span>
                                </>
                              )}
                            </button>
                            <span className="font-black text-xs sm:text-sm text-blue-800 bg-blue-100 px-3 py-1.5 rounded-lg sm:rounded-xl border border-blue-300 shadow-2xs">₹899</span>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openItems['c1_4'] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 space-y-1.5 bg-blue-50/30"
                            >
                              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-blue-100/80 flex items-start gap-2 shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                  Automated database pipeline storing every patient inquiry into a structured Google Sheets clinic CRM with zero manual data entry required.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Item 5 */}
                      <div className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs overflow-hidden ${openItems['c1_5'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-100 hover:border-blue-300 hover:shadow-sm'}`}>
                        <div
                          onClick={() => toggleItem('c1_5')}
                          className="p-3.5 sm:p-4 space-y-2.5 cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 shrink-0 text-blue-700">
                                <SlidersHorizontal size={20} weight="bold" />
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug break-words flex-1 min-w-0">
                                Two-Way Telegram ↔ Ledger Sync Engine
                              </h5>
                            </div>
                            <motion.div animate={{ rotate: openItems['c1_5'] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 p-1">
                              <CaretDown size={16} className="text-slate-400" weight="bold" />
                            </motion.div>
                          </div>
                          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-blue-100/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCartItem({ id: 'c1_5', title: 'Two-Way Telegram ↔ Ledger Sync Engine', price: 1299, formattedPrice: '₹1,299' });
                              }}
                              title={isItemInCart('c1_5') ? "Remove Section" : "Add Section to Cart"}
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${isItemInCart('c1_5')
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-emerald-950 hover:text-white border-emerald-400/80 hover:border-emerald-700 shadow-2xs hover:shadow-md'
                                }`}
                            >
                              {isItemInCart('c1_5') ? (
                                <>
                                  <CheckCircle size={18} weight="bold" />
                                  <span className="font-extrabold text-xs sm:text-sm">Added</span>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-0.5 text-current">
                                    <Plus size={13} weight="bold" />
                                    <ShoppingCart size={16} weight="bold" />
                                  </div>
                                  <span className="font-extrabold text-xs sm:text-sm text-current">Add Section</span>
                                </>
                              )}
                            </button>
                            <span className="font-black text-xs sm:text-sm text-blue-800 bg-blue-100 px-3 py-1.5 rounded-lg sm:rounded-xl border border-blue-300 shadow-2xs">₹1,299</span>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openItems['c1_5'] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 space-y-1.5 bg-blue-50/30"
                            >
                              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-blue-100/80 flex items-start gap-2 shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                  Bi-directional webhook sync keeping lead status updated in real-time between Google Sheets ledger and Telegram alerts to prevent management confusion.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Item 6: Cloudflare Workers & R2 */}
                      <div className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs overflow-hidden ${openItems['c1_6'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-100 hover:border-blue-300 hover:shadow-sm'}`}>
                        <div
                          onClick={() => toggleItem('c1_6')}
                          className="p-3.5 sm:p-4 space-y-2.5 cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 shrink-0 text-blue-700">
                                <Video size={20} weight="bold" />
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug break-words flex-1 min-w-0">
                                Cloudflare Workers & R2 Storage deployment
                              </h5>
                            </div>
                            <motion.div animate={{ rotate: openItems['c1_6'] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 p-1">
                              <CaretDown size={16} className="text-slate-400" weight="bold" />
                            </motion.div>
                          </div>
                          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-blue-100/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCartItem({ id: 'c1_6', title: 'Cloudflare Workers & R2 Storage deployment', price: 2998, formattedPrice: '₹2,998' });
                              }}
                              title={isItemInCart('c1_6') ? "Remove Entire Package" : "Include All Sub-Options"}
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${isItemInCart('c1_6')
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-emerald-950 hover:text-white border-emerald-400/80 hover:border-emerald-700 shadow-2xs hover:shadow-md'
                                }`}
                            >
                              {isItemInCart('c1_6') ? (
                                <>
                                  <CheckCircle size={18} weight="bold" />
                                  <span className="font-extrabold text-xs sm:text-sm">Added</span>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-0.5 text-current">
                                    <Plus size={13} weight="bold" />
                                    <ShoppingCart size={16} weight="bold" />
                                  </div>
                                  <span className="font-extrabold text-xs sm:text-sm text-current">Include All</span>
                                </>
                              )}
                            </button>
                            <span className="font-black text-xs sm:text-sm text-blue-800 bg-blue-100 px-3 py-1.5 rounded-lg sm:rounded-xl border border-blue-300 shadow-2xs">₹2,998</span>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openItems['c1_6'] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 space-y-3 bg-blue-50/20"
                            >
                              {/* Granular Architecture Deliverables */}
                              <div className="space-y-2.5 pt-1">
                                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block">Architecture Deliverables</span>

                                {/* Sub-heading 1: Cloudflare Workers */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-2 shadow-2xs">
                                  <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">1. Cloudflare Workers Implementation (Serverless API Gateways with Security & Credential Shield)</h6>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCartItem({ id: 'c1_6_sub1', title: 'Cloudflare Workers Implementation (Serverless API Gateways)', price: 1799, formattedPrice: '₹1,799' });
                                      }}
                                      title={isItemInCart('c1_6_sub1') ? "Remove from Cart" : "Add to Cart"}
                                      className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart('c1_6_sub1')
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                        : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                        }`}
                                    >
                                      {isItemInCart('c1_6_sub1') ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                    </button>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs">₹1,799</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-start gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Serverless edge proxy execution, protecting sensitive credentials like API keys, webhook secrets, and Telegram bot tokens from client-side inspection and unauthorized access.
                                    </p>
                                  </div>
                                </div>

                                {/* Sub-heading 2: Cloudflare R2 Storage */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-2 shadow-2xs">
                                  <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">2. Global Edge CDN, Cloudflare R2 storage implementation, Asset Optimization & Caching Strategy</h6>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCartItem({ id: 'c1_6_sub2', title: 'Global Edge CDN & Cloudflare R2 Storage Implementation', price: 1199, formattedPrice: '₹1,199' });
                                      }}
                                      title={isItemInCart('c1_6_sub2') ? "Remove from Cart" : "Add to Cart"}
                                      className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart('c1_6_sub2')
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                        : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                        }`}
                                    >
                                      {isItemInCart('c1_6_sub2') ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                    </button>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs">₹1,199</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-start gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      High-throughput S3-compatible Cloudflare R2 object storage integration for streaming 4K hero background videos at 0ms cold start & zero egress cost.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Item 7: Cloudflare Anti-Bot & WAF */}
                      <div className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs overflow-hidden ${openItems['c1_7'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-100 hover:border-blue-300 hover:shadow-sm'}`}>
                        <div
                          onClick={() => toggleItem('c1_7')}
                          className="p-3.5 sm:p-4 space-y-2.5 cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 shrink-0 text-blue-700">
                                <ShieldCheck size={20} weight="bold" />
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug break-words flex-1 min-w-0">
                                Cloudflare Anti-Bot Guard & Enterprise WAF Infrastructure , Turnstile & edge caching
                              </h5>
                            </div>
                            <motion.div animate={{ rotate: openItems['c1_7'] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 p-1">
                              <CaretDown size={16} className="text-slate-400" weight="bold" />
                            </motion.div>
                          </div>
                          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-blue-100/60">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCartItem({ id: 'c1_7', title: 'Cloudflare Anti-Bot Guard & Enterprise WAF Infrastructure', price: 2698, formattedPrice: '₹2,698' });
                              }}
                              title={isItemInCart('c1_7') ? "Remove Entire Package" : "Include All Sub-Options"}
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${isItemInCart('c1_7')
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-emerald-950 hover:text-white border-emerald-400/80 hover:border-emerald-700 shadow-2xs hover:shadow-md'
                                }`}
                            >
                              {isItemInCart('c1_7') ? (
                                <>
                                  <CheckCircle size={18} weight="bold" />
                                  <span className="font-extrabold text-xs sm:text-sm">Added</span>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-0.5 text-current">
                                    <Plus size={13} weight="bold" />
                                    <ShoppingCart size={16} weight="bold" />
                                  </div>
                                  <span className="font-extrabold text-xs sm:text-sm text-current">Include All</span>
                                </>
                              )}
                            </button>
                            <span className="font-black text-xs sm:text-sm text-blue-800 bg-blue-100 px-3 py-1.5 rounded-lg sm:rounded-xl border border-blue-300 shadow-2xs">₹2,698</span>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openItems['c1_7'] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 space-y-3 bg-blue-50/20"
                            >
                              {/* Granular Security & Defense Deliverables */}
                              <div className="space-y-2.5 pt-1">
                                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block">Security & Defense Deliverables</span>
                                {/* Sub-heading 1: Cloudflare Turnstile */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-2 shadow-2xs">
                                  <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">1. Cloudflare Turnstile (CAPTCHA-Free Anti-Bot Guard)</h6>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCartItem({ id: 'c1_7_sub1', title: 'Cloudflare Turnstile (CAPTCHA-Free Anti-Bot Guard)', price: 1199, formattedPrice: '₹1,199' });
                                      }}
                                      title={isItemInCart('c1_7_sub1') ? "Remove from Cart" : "Add to Cart"}
                                      className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart('c1_7_sub1')
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                        : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                        }`}
                                    >
                                      {isItemInCart('c1_7_sub1') ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                    </button>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs">₹1,199</span>
                                  </div>
                                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-start gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                      Privacy-first, frictionless bot verification --- (blocking automated form spam, fake/spam appointment inquiries, preventing random webhook triggering, data scraping etc.) without frustrating real patients with visual puzzles.
                                    </p>
                                  </div>
                                </div>

                                {/* Sub-heading 2: Cloudflare WAF & Edge Caching */}
                                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-blue-100/80 space-y-2.5 shadow-2xs">
                                  <h6 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">2. Enterprise WAF, Rate Limiting & Edge Caching</h6>
                                  <div className="flex items-center justify-end gap-1.5 border-b border-blue-100/60 pb-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCartItem({ id: 'c1_7_sub2', title: 'Enterprise WAF, Rate Limiting & Edge Caching', price: 1499, formattedPrice: '₹1,499' });
                                      }}
                                      title={isItemInCart('c1_7_sub2') ? "Remove from Cart" : "Add to Cart"}
                                      className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0 ${isItemInCart('c1_7_sub2')
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                        : 'bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 border-emerald-200 hover:border-emerald-700 shadow-2xs'
                                        }`}
                                    >
                                      {isItemInCart('c1_7_sub2') ? <CheckCircle size={14} weight="bold" /> : <div className="flex items-center gap-0.5"><Plus size={11} weight="bold" /><ShoppingCart size={13} weight="bold" /></div>}
                                    </button>
                                    <span className="font-black text-blue-800 text-[11px] sm:text-sm bg-blue-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200 shadow-2xs">₹1,499</span>
                                  </div>

                                  <div className="space-y-2 pt-0.5">
                                    {/* Point A */}
                                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Edge Web Application Firewall (WAF)</h6>
                                      </div>
                                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-4">
                                        Inspects HTTP/S traffic directly at the Cloudflare edge to protect the website and APIs from Layer 7 attacks like SQL injection, cross-site scripting (XSS), and bot abuse.
                                      </p>
                                    </div>

                                    {/* Point B */}
                                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Rate Limiting & Global Edge Caching</h6>
                                      </div>
                                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-4">
                                        Enforces strict IP rate-limiting rules and global CDN edge caching to prevent server bandwidth abuse, mitigate DDoS floods, and ensure ultra-fast load speed.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* BRANCH B: CUSTOM PROPOSAL CART SHOWCASE */}
                  <div
                    id="cart-section"
                    className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 flex flex-col justify-between scroll-mt-20 sm:scroll-mt-24 transition-all duration-300 ${isCartActive
                      ? 'bg-emerald-50/50 ring-4 ring-emerald-500/20 shadow-xl shadow-emerald-500/10 md:scale-[1.015] z-10'
                      : 'bg-emerald-50/20 md:opacity-75 hover:md:opacity-100'
                      }`}
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3 sm:pb-4">
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-slate-900">Overall Price for Custom cart</h4>
                        </div>
                        <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-xl border transition-all duration-300 self-start sm:self-auto shrink-0 ${isCartActive
                          ? 'text-emerald-800 bg-emerald-100 border-emerald-300 shadow-2xs'
                          : 'text-emerald-700 bg-emerald-100/60 border-emerald-200'
                          }`}>
                          {cartItems.length > 0 ? `${cartItems.length} Selected` : 'Cart Options'}
                        </span>
                      </div>

                      {cartItems.length === 0 ? (
                        <div className="mt-4 p-8 sm:p-12 rounded-2xl bg-white border border-dashed border-emerald-200 flex flex-col items-center justify-center text-center space-y-3 shadow-2xs">
                          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
                            <ShoppingCart size={36} weight="bold" />
                          </div>
                          <div className="space-y-1 max-w-xs">
                            <h5 className="font-extrabold text-slate-900 text-base sm:text-lg">Blank Cart Showcase</h5>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                              Click the <strong className="text-emerald-700 font-bold">+ 🛒 icon</strong> next to any pricing deliverable item to add it to your custom cart.
                            </p>
                          </div>

                        </div>
                      ) : (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2.5 max-h-[440px] lg:max-h-[860px] overflow-y-auto pr-1">
                            {cartItems.map((item) => (
                              <div key={item.id} className="p-3.5 rounded-xl bg-white border border-emerald-200/80 shadow-2xs space-y-2.5 animate-fade-in">
                                <div className="flex items-start gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                                  <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug break-words flex-1 min-w-0">
                                    {item.title}
                                  </h6>
                                </div>
                                <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-100/60">
                                  <button
                                    type="button"
                                    onClick={() => toggleCartItem(item)}
                                    title="Remove Item"
                                    className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all duration-200 cursor-pointer active:scale-90 flex items-center justify-center shrink-0"
                                  >
                                    <Trash size={14} weight="bold" />
                                  </button>
                                  <span className="font-black text-emerald-800 text-[11px] sm:text-sm bg-emerald-100/90 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-emerald-200 shadow-2xs">
                                    {item.formattedPrice || `₹${item.price.toLocaleString()}`}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Dynamic Cart Total Card */}
                          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/20 space-y-2">
                            <div className="hidden sm:flex items-center justify-between text-xs sm:text-sm font-medium text-white">
                              <span>Selected Items:</span>
                              <span className="font-extrabold text-white">{cartItems.length} Deliverable{cartItems.length > 1 ? 's' : ''}</span>
                            </div>

                            {isFullBundleInCart && (
                              <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 text-slate-950 font-extrabold flex items-center justify-between shadow-md">
                                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-950">
                                  <Gift size={18} weight="fill" className="text-amber-800 shrink-0" />
                                  <span>Full Platform Discount Applied</span>
                                </span>
                                <span className="bg-white/40 text-slate-950 px-2.5 py-0.5 rounded-lg text-[11px] uppercase font-black tracking-wide shrink-0">
                                  Saved ₹3,569
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-0 sm:pt-1 border-t-0 sm:border-t border-emerald-500/60">
                              <span className="font-black text-sm sm:text-base">Custom Cart Total:</span>
                              <div className="flex items-center gap-2">
                                {isFullBundleInCart && (
                                  <span className="text-xs sm:text-base font-bold text-red-100/80 line-through">
                                    ₹{rawCartTotal.toLocaleString()}
                                  </span>
                                )}
                                <span className="font-black text-xl sm:text-2xl tracking-tight text-white">
                                  ₹{cartTotal.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCartItems([])}
                              className="w-full mt-2.5 py-2 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 active:scale-[0.98] text-rose-700 font-black text-xs sm:text-sm transition-all cursor-pointer border border-rose-200 shadow-xs flex items-center justify-center gap-2"
                            >
                              <Trash size={20} weight="bold" className="text-rose-600" />
                              <span className="cursor-pointer text-base">Clear Cart</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Section Breaker Line */}
            <div className="relative my-10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-slate-300" />
              </div>
              <div className="relative bg-white px-4 sm:px-5 py-2 rounded-full border border-slate-300 shadow-xs flex items-center justify-center gap-2.5 text-[11px] sm:text-xs font-black uppercase tracking-widest text-slate-900 text-center">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
                <span className="text-center">Project Execution & Milestone Payment Flow</span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
              </div>
            </div>

            {/* VISUAL FLOWCHART 2: PAYMENT & MILESTONE TIMELINE FLOW */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-10 shadow-sm space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/60 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">
                    Execution Sequence
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 sm:mt-2">
                    Transparent Payment & Milestone Timeline
                  </h2>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold text-emerald-800 self-start sm:self-auto">
                  Pay-As-You-Go (Total: ₹24,999)
                </div>
              </div>

              {/* 2x2 Interactive Milestone Accordion Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {/* Step 1 */}
                <div
                  className={`rounded-2xl sm:rounded-3xl bg-white border transition-all duration-200 shadow-sm overflow-hidden flex flex-col justify-between ${openItems['seq_1'] ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' : 'border-blue-200/80 hover:border-blue-300'
                    }`}
                >
                  <div className="p-4 sm:p-7 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-200 text-blue-700">
                        <CurrencyInr size={22} weight="bold" className="sm:hidden" />
                        <CurrencyInr size={26} weight="bold" className="hidden sm:block" />
                      </div>
                      <span className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-blue-200">
                        Step 01
                      </span>
                    </div>

                    <div
                      onClick={() => toggleSequenceRow(1)}
                      className="cursor-pointer select-none space-y-1 group"
                    >
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-blue-600">25% Security Advance</span>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-xl leading-snug group-hover:text-blue-600 transition-colors flex items-center justify-between">
                        <span>Client Onboarding & Project Kickoff</span>
                      </h4>
                    </div>

                    <AnimatePresence>
                      {openItems['seq_1'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden pt-1 sm:pt-2"
                        >
                          <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium pt-2.5 sm:pt-3 border-t border-slate-100">
                            <li className="flex items-start gap-2.5">
                              <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                              <span><strong className="text-slate-900 font-extrabold">25% Security Advance (₹6,250 of ₹24,999):</strong> Mandatory upfront deposit to lock project commitment.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                              <span><strong className="text-slate-900 font-extrabold">80%+ Core Development Completed:</strong> Over 80% of core development and architecture will be done prior to showcasing the live interactive demo.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                              <span><strong className="text-slate-900 font-extrabold">Live Domain Deployment & Revisions:</strong> Upon advance receipt, the project is deployed live onto the client's official domain for real-time review and custom revisions.</span>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle Footer Bar */}
                  <div
                    onClick={() => toggleSequenceRow(1)}
                    className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between cursor-pointer select-none hover:bg-blue-50/40 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold text-slate-700">
                      <span className="text-blue-600">
                        {openItems['seq_1'] ? <CaretDown size={16} weight="bold" /> : <CaretRight size={16} weight="bold" />}
                      </span>
                      <span>{openItems['seq_1'] ? 'Hide Details' : 'View Details & Terms'}</span>
                    </div>
                    <span className="font-black text-xs sm:text-base text-blue-700 bg-blue-100/90 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-blue-200 shadow-2xs">
                      ₹6,250
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`rounded-2xl sm:rounded-3xl bg-white border transition-all duration-200 shadow-sm overflow-hidden flex flex-col justify-between ${openItems['seq_2'] ? 'border-indigo-300 ring-2 ring-indigo-500/10 shadow-md' : 'border-indigo-200/80 hover:border-indigo-300'
                    }`}
                >
                  <div className="p-4 sm:p-7 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700">
                        <Browsers size={22} weight="bold" className="sm:hidden" />
                        <Browsers size={26} weight="bold" className="hidden sm:block" />
                      </div>
                      <span className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-indigo-200">
                        Step 02
                      </span>
                    </div>

                    <div
                      onClick={() => toggleSequenceRow(1)}
                      className="cursor-pointer select-none space-y-1 group"
                    >
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-indigo-600">UI & Security Handover</span>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-xl leading-snug group-hover:text-indigo-600 transition-colors">
                        Website & Cloudflare Protection Handover
                      </h4>
                    </div>

                    <AnimatePresence>
                      {openItems['seq_2'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden pt-1 sm:pt-2"
                        >
                          <div className="space-y-2.5 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-slate-100">
                            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
                              Payment released upon final handover of Website <strong className="text-slate-900 font-extrabold">(Dynamic website pages, CMS, Telegram group lead handling & Google Sheets sync)</strong> together with completed <strong className="text-slate-900 font-extrabold">Cloudflare Security Infrastructure (Edge Workers, Turnstile, Enterprise WAF & Edge CDN)</strong>.
                            </p>

                            <ul className="space-y-2 pt-2 border-t border-indigo-100/80">
                              <li className="flex items-start gap-2 text-xs sm:text-sm text-indigo-900 font-bold bg-indigo-50/90 p-2.5 sm:p-3 rounded-xl border border-indigo-200/80">
                                <span className="text-indigo-600 font-black text-base leading-none">•</span>
                                <span><strong>Amount to be released:</strong> All payments for work completed must be released as per above breakdown</span>
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle Footer Bar */}
                  <div
                    onClick={() => toggleSequenceRow(1)}
                    className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between cursor-pointer select-none hover:bg-indigo-50/40 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold text-slate-700">
                      <span className="text-indigo-600">
                        {openItems['seq_2'] ? <CaretDown size={16} weight="bold" /> : <CaretRight size={16} weight="bold" />}
                      </span>
                      <span>{openItems['seq_2'] ? 'Hide Details' : 'View Details & Terms'}</span>
                    </div>
                    <span className="font-black text-xs sm:text-base text-indigo-700 bg-indigo-100/90 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-indigo-200 shadow-2xs">
                      ₹18,750
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Celebration Discount Unlocked Modal */}
      <AnimatePresence>
        {showCelebrationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-blue-200 text-center space-y-5 overflow-hidden"
            >
              {/* Decorative Background Ambient Glows */}
              <div className="absolute -top-12 -left-12 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center space-y-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-blue-500 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                  <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center text-3xl sm:text-4xl">
                    🎉
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
                  <Gift size={18} weight="fill" className="text-pink-500" />
                  Full Package Discount Unlocked!
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Full Platform Bundle Unlocked!
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  By including all website & lead architecture sections, you qualified for the complete bundled package price:
                </p>

                {/* Pricing Highlight Box */}
                <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-teal-50 border border-blue-200/90 flex flex-col items-center justify-center text-center space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500">
                    <span>Itemized Total:</span>
                    <span className="text-red-500/80 line-through">₹28,568</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight text-center my-0.5">
                    ₹24,999
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-emerald-800 flex items-center justify-center gap-1">
                    <Sparkle size={15} weight="fill" className="text-amber-500" />
                    You saved ₹3,569 on the complete platform suite!
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCelebrationModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-base shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Awesome! 
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCelebrationModal(false);
                    handleTabClick(tabs[1]);
                  }}
                  className="py-3 px-4 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-base border border-slate-200 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingCart size={18} weight="bold" />
                  View Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification for Security Dependencies */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 z-50 w-[92vw] max-w-lg p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-50 via-blue-50 to-teal-50 text-slate-800 backdrop-blur-xl border border-blue-200/90 shadow-xl shadow-blue-500/15 flex items-center gap-3.5"
          >
            <div className="p-2.5 rounded-xl bg-blue-100/90 text-blue-700 shrink-0 border border-blue-200 shadow-2xs">
              <ShieldCheck size={22} weight="bold" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                {toastMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-blue-100/60 transition-colors shrink-0 cursor-pointer"
              title="Close notification"
            >
              <X size={16} weight="bold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

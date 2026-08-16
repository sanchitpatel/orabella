import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  ShieldCheck,
  Lightning,
  Coins,
  Database,
  Code,
  Info,
  ArrowRight,
  Sparkle,
  LockKey,
  Check,
  X,
  PaperPlaneTilt,
  ThumbsUp,
  Flame,
  ChatCircleText,
  TrendUp
} from '@phosphor-icons/react';

const EASE = [0.16, 1, 0.3, 1];

export default function PricingProposal() {
  const reduceMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState('dynamic'); // 'dynamic' (A: 9999) | 'enterprise' (B: 12999)
  const [includeSecurityAddon, setIncludeSecurityAddon] = useState(true); // +2499
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'breakdown' | 'audit'

  const dynamicFinal = 9999;
  const enterpriseFinal = 12999;
  const currentTotal = (selectedPackage === 'dynamic' ? dynamicFinal : enterpriseFinal) + (includeSecurityAddon ? 2499 : 0);

  const dynamicBreakdown = [
    { label: 'Custom Base Home Page Architecture', cost: 3899, detail: 'Responsive grid, luxury font hierarchy, custom styling system' },
    { label: 'Dynamic State Engine Upgrade', cost: 1999, detail: 'Reactive UI state management, live filtering, dynamic seed handling' },
    { label: 'Static Sub-Pages (Spaces & Gallery)', cost: 1938, detail: '2 dedicated pages @ ₹969 per page' },
    { label: 'Dynamic Sub-Pages Interactive Upgrade', cost: 1998, detail: '2 dynamic sub-pages @ ₹999 per page' },
    { label: 'Interactive Pop-Up Interface Modals', cost: 648, detail: 'Quick inquiry lightbox, audio player, location modal (@ ₹349 + ₹299)' },
  ];

  const enterpriseBreakdown = [
    { label: 'Custom Base Home Page Architecture', cost: 3899, detail: 'Luxury responsive layout & cinematic section components' },
    { label: 'Multi-Page Ecosystem (6 Pages)', cost: 5814, detail: '6 dedicated sub-pages @ ₹969 per page' },
    { label: 'Interactive Pop-Up Pages (3 Modals)', cost: 1047, detail: '3 quick action dialogs @ ₹349 per page' },
    { label: 'Lead Ledger & Instant Notification System', cost: 1599, detail: 'Automatic database ledger recording & real-time lead capture' },
    { label: 'Negotiation Safety Buffer', cost: 640, detail: 'Client negotiation cushion' },
  ];

  return (
    <section id="pricing" className="relative w-full overflow-hidden bg-[#FAFAFC] py-20 text-slate-900 sm:py-28">
      {/* Light Grid Dots Matrix Canvas Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Soft Ambient Radial Glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[600px] w-[600px] rounded-full bg-emerald-100/60 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[600px] w-[600px] rounded-full bg-purple-100/60 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-8">
        
        {/* DIAGRAMA LIGHT HERO TITLE & HIGHLIGHT BADGES */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm mb-4">
            <Sparkle size={14} weight="fill" className="text-amber-500" /> INTERACTIVE ENGINEERING CANVAS
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            Interactive{' '}
            <span className="relative inline-block bg-[#10B981] text-white font-sans font-bold px-3.5 py-1 rounded-xl transform -rotate-1 shadow-md mx-1">
              Web Pricing
            </span>{' '}
            & Value{' '}
            <span className="relative inline-block bg-[#8B5CF6] text-white font-sans font-bold px-3.5 py-1 rounded-xl transform rotate-1 shadow-md mx-1">
              Flowchart
            </span>
          </h2>

          <p className="mt-5 font-sans text-base font-normal text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Click decision nodes on the interactive canvas below to customize your engineering package and audit local agency traps.
          </p>

          {/* Navigation View Switcher Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'canvas'
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <Code size={16} weight="bold" /> Flowchart Canvas
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'breakdown'
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <Coins size={16} weight="bold" /> Cost Breakdown
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'audit'
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <Info size={16} weight="bold" /> Agency Trap Audit
            </button>
          </div>
        </div>

        {/* TAB 1: DIAGRAMA LIGHT CANVAS */}
        {activeTab === 'canvas' && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            {/* Main Canvas Box */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl">
              
              {/* Canvas Header & Reactions */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Live Decision Canvas Engine
                  </span>
                </div>

                {/* Floating Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 font-sans text-[11px] text-amber-800 font-semibold shadow-xs">
                    <Flame size={14} className="text-amber-500" /> Best Conversion
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-sans text-[11px] text-emerald-800 font-semibold shadow-xs">
                    <ThumbsUp size={14} className="text-emerald-500" /> 100% Client Owned
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-3 py-1 font-sans text-[11px] text-purple-800 font-semibold shadow-xs">
                    <Lightning size={14} className="text-purple-500" /> 0 Monthly Fees
                  </span>
                </div>
              </div>

              {/* FLOWCHART TREE CANVAS */}
              <div className="relative space-y-12">
                
                {/* START NODE */}
                <div className="flex justify-center">
                  <div className="relative group flex items-center gap-4 rounded-2xl border-2 border-slate-900 bg-white px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold shadow-md">
                      <PaperPlaneTilt size={24} weight="fill" />
                    </div>
                    <div>
                      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-emerald-600">START HERE</span>
                      <h4 className="font-serif text-xl font-bold text-slate-900">Orabella Banquet Web Project</h4>
                    </div>
                    {/* Floating Comment Badge */}
                    <span className="hidden sm:inline-flex absolute -top-3 -right-4 items-center gap-1 rounded-full bg-pink-500 px-2.5 py-0.5 font-sans text-[10px] font-bold text-white shadow-md transform rotate-3">
                      Perfect! 🥳
                    </span>
                  </div>
                </div>

                {/* DECISION NODE 1 (TURQUOISE DIAMOND - JUST LIKE INSPIRATION IMAGE) */}
                <div className="flex justify-center my-8">
                  <div className="relative flex flex-col items-center">
                    {/* Connector Line */}
                    <div className="h-8 w-0.5 bg-gradient-to-b from-slate-900 via-emerald-500 to-purple-500" />
                    
                    {/* Diamond Node */}
                    <div className="relative flex items-center justify-center w-48 h-24 my-2">
                      <div className="absolute inset-0 bg-[#10B981] transform rotate-45 rounded-xl shadow-[0_10px_25px_rgba(16,185,129,0.3)]" />
                      <div className="relative z-10 text-center px-3 text-white">
                        <span className="font-sans text-[9px] font-bold uppercase tracking-widest opacity-90">DECISION NODE</span>
                        <p className="font-serif text-sm font-bold mt-0.5">Need Multi-Page & Lead Database?</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BRANCHING PACKAGE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative pt-4">
                  
                  {/* BRANCH A: PACKAGE A (DYNAMIC WEB APP) */}
                  <div
                    onClick={() => setSelectedPackage('dynamic')}
                    className={`relative rounded-2xl border-2 p-6 sm:p-8 cursor-pointer transition-all duration-500 ${
                      selectedPackage === 'dynamic'
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-[0_15px_35px_rgba(16,185,129,0.15)] ring-2 ring-emerald-400/40'
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 border border-blue-200 px-3 py-1 font-sans text-xs font-bold text-blue-700">
                        <X size={14} weight="bold" /> Standard Path
                      </span>
                      <span className="font-serif text-3xl font-bold text-slate-900">₹9,999</span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-slate-900">Package A: Dynamic Custom Web App</h4>
                    <p className="mt-2 font-sans text-xs text-slate-600 leading-relaxed">
                      Custom reactive state engine, dynamic section lightboxes, ultra-fast performance.
                    </p>

                    <div className="mt-4 space-y-2 font-sans text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" /> Base Custom Architecture (₹3,899)
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" /> Dynamic State Engine Upgrade (₹1,999)
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" /> 2 Static + 2 Dynamic Sub-Pages
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4">
                      <span className="font-sans text-xs font-bold text-slate-500">
                        {selectedPackage === 'dynamic' ? 'ACTIVE NODE' : 'CLICK TO SELECT'}
                      </span>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${selectedPackage === 'dynamic' ? 'bg-emerald-500 text-white' : 'border border-slate-300'}`}>
                        {selectedPackage === 'dynamic' && <Check size={14} weight="bold" />}
                      </div>
                    </div>

                    <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-0.5 font-sans text-[10px] font-bold text-white shadow-md">
                      Best Value 👍
                    </span>
                  </div>

                  {/* BRANCH B: PACKAGE B (MULTI-PAGE LEDGER) */}
                  <div
                    onClick={() => setSelectedPackage('enterprise')}
                    className={`relative rounded-2xl border-2 p-6 sm:p-8 cursor-pointer transition-all duration-500 ${
                      selectedPackage === 'enterprise'
                        ? 'border-purple-500 bg-purple-50/40 shadow-[0_15px_35px_rgba(139,92,246,0.15)] ring-2 ring-purple-400/40'
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 border border-purple-200 px-3 py-1 font-sans text-xs font-bold text-purple-700">
                        <Check size={14} weight="bold" /> Enterprise Path
                      </span>
                      <span className="font-serif text-3xl font-bold text-slate-900">₹12,999</span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-slate-900">Package B: Multi-Page + Lead Ledger System</h4>
                    <p className="mt-2 font-sans text-xs text-slate-600 leading-relaxed">
                      6 dedicated multi-page verticals, automatic lead ledger database recording & real-time notification engine.
                    </p>

                    <div className="mt-4 space-y-2 font-sans text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle size={16} className="text-purple-600 shrink-0" weight="fill" /> 6 Dedicated Sub-Pages Ecosystem (₹5,814)
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle size={16} className="text-purple-600 shrink-0" weight="fill" /> Real Lead Ledger Database (₹1,599)
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle size={16} className="text-purple-600 shrink-0" weight="fill" /> 3 Interactive Pop-Up Dialog Modals
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4">
                      <span className="font-sans text-xs font-bold text-slate-500">
                        {selectedPackage === 'enterprise' ? 'ACTIVE NODE' : 'CLICK TO SELECT'}
                      </span>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${selectedPackage === 'enterprise' ? 'bg-purple-600 text-white' : 'border border-slate-300'}`}>
                        {selectedPackage === 'enterprise' && <Check size={14} weight="bold" />}
                      </div>
                    </div>

                    <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-purple-600 px-3 py-0.5 font-sans text-[10px] font-bold text-white shadow-md">
                      POPULAR 🔥
                    </span>
                  </div>
                </div>

                {/* NODE 3: SECURITY ADD-ON */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8 relative">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
                        <ShieldCheck size={28} weight="fill" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg font-bold text-slate-900">Node 3: Anti-Bot & Theft Security Suite</h4>
                          <span className="rounded bg-emerald-200 border border-emerald-300 px-2 py-0.5 font-sans text-[10px] font-bold text-emerald-900">
                            + ₹2,499
                          </span>
                        </div>
                        <p className="mt-1 font-sans text-xs text-slate-600 max-w-xl">
                          Cloudflare Turnstile CAPTCHA-free bot defense + serverless API rate limiting + Cloudflare Worker credential vaulting.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIncludeSecurityAddon(!includeSecurityAddon)}
                      className={`shrink-0 rounded-xl px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider transition-all ${
                        includeSecurityAddon
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {includeSecurityAddon ? 'Security Enabled ✓' : 'Add Security Node (+₹2,499)'}
                    </button>
                  </div>
                </div>

                {/* AGENCY TRAP WARNING CARD */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6 relative">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white shadow-md">
                        <XCircle size={24} weight="fill" />
                      </div>
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-rose-700">WARNING AUDIT</span>
                        <h5 className="font-serif text-base font-bold text-slate-900">Local Agency Trap (e.g. LM Softech / Rajwara Site ₹12,000)</h5>
                        <p className="font-sans text-xs text-slate-600">Fake multi-page copy-pasting, dummy booking buttons & mandatory ₹499/mo maintenance traps.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('audit')}
                      className="shrink-0 rounded-lg border border-rose-300 bg-white px-4 py-2 font-sans text-xs font-bold text-rose-700 hover:bg-rose-100 shadow-xs"
                    >
                      View Reality Audit →
                    </button>
                  </div>
                </div>

                {/* LIVE CALCULATED OUTPUT CARD (DARK FOREST HIGH CONTRAST ANCHOR) */}
                <div className="rounded-2xl border-2 border-slate-900 bg-[#0D271D] text-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <span className="font-sans text-xs font-bold uppercase tracking-widest text-emerald-400">FLOWCHART TOTAL OUTPUT</span>
                      <div className="mt-1 font-serif text-3xl sm:text-5xl font-bold text-white">
                        ₹{currentTotal.toLocaleString('en-IN')}{' '}
                        <span className="font-sans text-xs font-normal text-white/60">(Zero Monthly Fees)</span>
                      </div>
                      <p className="mt-1 font-sans text-xs text-white/80">
                        Selected: <strong className="text-amber-400">{selectedPackage === 'dynamic' ? 'Package A (₹9,999)' : 'Package B (₹12,999)'}</strong>
                        {includeSecurityAddon ? ' + Anti-Bot Protection (₹2,499)' : ''}
                      </p>
                    </div>

                    <a
                      href="#contact"
                      className="group flex items-center justify-center gap-3 rounded-xl bg-amber-400 px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-slate-900 shadow-lg transition-all hover:bg-amber-300"
                    >
                      Approve Proposal <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: COST BREAKDOWN */}
        {activeTab === 'breakdown' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-12 space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div
                onClick={() => setSelectedPackage('dynamic')}
                className={`rounded-2xl border p-6 sm:p-8 cursor-pointer transition-all bg-white shadow-sm ${
                  selectedPackage === 'dynamic' ? 'border-emerald-500 ring-2 ring-emerald-400/40' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-700">PACKAGE A</span>
                  <span className="rounded bg-emerald-100 px-2.5 py-1 font-sans text-[11px] font-bold text-emerald-800">Preferred</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-bold text-slate-900">Dynamic Custom Web App</h3>
                <div className="mt-4 font-serif text-4xl font-bold text-slate-900">₹9,999</div>

                <ul className="mt-6 space-y-3 font-sans text-xs border-t border-slate-100 pt-4">
                  {dynamicBreakdown.map((item, i) => (
                    <li key={i} className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-700">{item.label}</span>
                      <span className="font-bold text-slate-900">₹{item.cost.toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                onClick={() => setSelectedPackage('enterprise')}
                className={`rounded-2xl border p-6 sm:p-8 cursor-pointer transition-all bg-white shadow-sm ${
                  selectedPackage === 'enterprise' ? 'border-purple-500 ring-2 ring-purple-400/40' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-purple-700">PACKAGE B</span>
                  <span className="rounded bg-purple-100 px-2.5 py-1 font-sans text-[11px] font-bold text-purple-800">Full Ecosystem</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-bold text-slate-900">Multi-Page + Lead Ledger</h3>
                <div className="mt-4 font-serif text-4xl font-bold text-slate-900">₹12,999</div>

                <ul className="mt-6 space-y-3 font-sans text-xs border-t border-slate-100 pt-4">
                  {enterpriseBreakdown.map((item, i) => (
                    <li key={i} className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-700">{item.label}</span>
                      <span className="font-bold text-slate-900">₹{item.cost.toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: AGENCY AUDIT */}
        {activeTab === 'audit' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-12 space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-bold text-rose-900">Local Agency Trap (LM Softech)</h3>
                <p className="mt-2 font-sans text-xs text-rose-800">Duplicate home page sections on sub-routes, dummy booking buttons, and domain hostage traps.</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-bold text-emerald-900">Our Production Standard</h3>
                <p className="mt-2 font-sans text-xs text-emerald-800">Genuine reactive React state, real lead database ledger recording, and 100% direct domain ownership.</p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

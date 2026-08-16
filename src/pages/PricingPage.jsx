import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, CheckCircle, Question, PhoneCall, Sparkle } from '@phosphor-icons/react';
import Navbar from '../components/Navbar';
import PricingProposal from '../components/PricingProposal';
import Footer from '../components/Footer';

export default function PricingPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const faqs = [
    {
      q: 'Why do local agencies charge ₹8,000 to ₹12,000 for "multi-page" sites?',
      a: 'Local agencies like LM Softech duplicate the homepage section code across separate route files without engineering new layouts or custom dynamic state. They market static duplicates as "multi-page apps" while delivering minimum effort templates.',
    },
    {
      q: 'Are there any hidden monthly hosting or maintenance fees?',
      a: 'Zero. Modern static web hosting (Vercel/Cloudflare) is free at source. You retain 100% direct ownership of your domain registrar and hosting accounts with NO mandatory ₹499 monthly maintenance lock-in.',
    },
    {
      q: 'What is included in the ₹2,499 Anti-Bot & Theft Protection add-on?',
      a: 'It integrates Cloudflare Turnstile (invisible CAPTCHA-free bot defense), serverless API rate-limiting to prevent form spam, and Cloudflare Worker edge credential vaulting so your API keys and client inquiry data are protected from web scrapers.',
    },
    {
      q: 'Who owns the domain and website source code?',
      a: 'You own 100% of the domain registered under your credentials, as well as full rights to the custom React source code repository upon deployment.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900">
      <Navbar currentPage="pricing" onNavigateHome={onNavigateHome} />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20 border-b border-slate-200/80 bg-white">
        {/* Subtle Grid Dots Matrix Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -left-32 top-10 h-[450px] w-[450px] rounded-full bg-emerald-100/50 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[450px] w-[450px] rounded-full bg-purple-100/50 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Back to Home CTA */}
            <a
              href="/"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-900 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-slate-800 shadow-sm mb-8"
            >
              <ArrowLeft size={16} /> Back to Orabella Banquet
            </a>

            <span className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
              DEDICATED CLIENT PRICING & ENGINEERING PROPOSAL
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-slate-900 sm:text-6xl md:text-7xl">
              Web Investment <span className="italic text-emerald-600">&</span> Value Audit
            </h1>
            <p className="mt-5 max-w-3xl font-sans text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
              Transparent mathematical itemization, architectural comparison against generic local agency practices (e.g., LM Softech / Rajwara site), and complete zero-hidden-fee financial clarity.
            </p>

            {/* Feature Highlights Pill Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs">
                <CheckCircle size={16} className="text-emerald-600" weight="fill" /> Custom Reactive State Engine
              </span>
              <span className="flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs">
                <ShieldCheck size={16} className="text-emerald-600" weight="fill" /> 100% Client Domain Ownership
              </span>
              <span className="flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs">
                <CheckCircle size={16} className="text-emerald-600" weight="fill" /> Real Lead Ledger System
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Pricing Proposal Breakdown Component */}
      <main>
        <PricingProposal />

        {/* Dedicated Pricing FAQ Section */}
        <section className="relative overflow-hidden bg-slate-50 py-20 border-t border-slate-200/80">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="text-center">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">Pricing & Engineering Clarifications</h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Question size={24} className="mt-1 shrink-0 text-emerald-600" weight="fill" />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">{faq.q}</h3>
                      <p className="mt-2 font-sans text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner (High-Contrast Forest Green Anchor) */}
        <section className="relative overflow-hidden bg-[#0D271D] text-white py-16 border-t border-slate-900">
          <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-8">
            <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">Ready to Launch Orabella Banquet's Digital Venue?</h2>
            <p className="mt-3 font-sans text-sm text-white/80 max-w-xl mx-auto">
              Select Package A (₹9,999) or Package B (₹12,999) and secure high-converting luxury web presence today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/#contact"
                onClick={(e) => {
                  if (onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                    setTimeout(() => {
                      const el = document.querySelector('#contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-slate-900 shadow-xl transition-all hover:bg-amber-300"
              >
                <PhoneCall size={16} weight="bold" /> Contact Engineering Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

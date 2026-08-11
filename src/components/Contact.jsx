import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle } from '@phosphor-icons/react';
import contactData from '../data/contact.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

const FIELD =
  'w-full rounded-sm border border-forest/15 bg-white px-4 py-3 font-sans text-[15px] text-forest-dark placeholder:text-forest/30 outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/20';
const LABEL = 'font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark';

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  // Sanitized input handlers to enforce desired values only
  const handleNameChange = (e) => {
    // Only allow letters (a-z, A-Z) and single spaces, max 50 chars
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ');
    if (val.length <= 50) {
      setForm((f) => ({ ...f, name: val }));
      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    setForm((f) => ({ ...f, email: val }));
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handlePhoneChange = (e) => {
    // Strictly allow digits only, max 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, phone: digitsOnly }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleMessageChange = (e) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setForm((f) => ({ ...f, message: val }));
      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validate Name: Must be at least 2 alphabetic characters
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Full Name is required.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Please enter a valid name (at least 2 letters).';
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // Validate Phone Number: Exactly 10 digits
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (digitsOnly.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    // Validate Message
    if (!form.message.trim()) {
      newErrors.message = 'Please include a message or inquiry detail.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSent(true);

      const targetPhone = (siteData.whatsappPhone || '919319812500').replace(/\D/g, '');
      const formattedMessage = `Hello ${siteData.name || 'Orabella Banquet'} Team,\n\nI would like to inquire about booking/hosting an event at your venue.\n\n*Name:* ${form.name.trim()}\n*Email:* ${form.email.trim()}\n*Phone:* ${form.phone.trim()}\n*Message:* ${form.message.trim()}`;

      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section id="contact" className="relative w-full bg-cream py-24 md:py-32">
      <div id="book" className="mx-auto max-w-[760px] px-5 sm:px-8">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl border border-forest/10 bg-white/80 p-8 shadow-[0_30px_80px_-45px_rgba(20,57,43,0.4)] sm:p-10 md:p-12"
        >
          {/* Header */}
          <div className="text-center">
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark">
              {contactData.badge}
            </span>
            <h2 className="mt-3 font-serif text-3xl font-medium text-forest-dark sm:text-4xl md:text-[2.75rem]">
              {contactData.title}
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-[15px] font-light leading-relaxed text-forest/60">
              {contactData.subtitle}
            </p>
          </div>

          {sent ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-10 flex flex-col items-center rounded-xl bg-forest/5 px-6 py-12 text-center"
            >
              <CheckCircle size={44} weight="fill" className="text-gold" />
              <h3 className="mt-4 font-serif text-2xl text-forest-dark">{contactData.thankYouTitle || 'Thank you!'}, {form.name || 'friend'}!</h3>
              <p className="mt-2 max-w-sm font-sans text-[15px] font-light text-forest/60">
                {contactData.thankYouMessage}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', phone: '', message: '' });
                  setErrors({});
                }}
                className="mt-6 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-gold-dark underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-name" className={LABEL}>
                    Full Name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={handleNameChange}
                    className={`${FIELD} ${errors.name ? 'border-red-500/60 ring-1 ring-red-500/20' : ''}`}
                  />
                  {errors.name && (
                    <span className="font-sans text-[12px] text-red-600 font-medium">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-email" className={LABEL}>
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="e.g. rahul@example.com"
                    value={form.email}
                    onChange={handleEmailChange}
                    className={`${FIELD} ${errors.email ? 'border-red-500/60 ring-1 ring-red-500/20' : ''}`}
                  />
                  {errors.email && (
                    <span className="font-sans text-[12px] text-red-600 font-medium">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="c-phone" className={LABEL}>
                  Phone Number
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  required
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  className={`${FIELD} ${errors.phone ? 'border-red-500/60 ring-1 ring-red-500/20' : ''}`}
                />
                {errors.phone && (
                  <span className="font-sans text-[12px] text-red-600 font-medium">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="c-message" className={LABEL}>
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  required
                  placeholder="Share details about your upcoming event, preferred date, or special requests..."
                  value={form.message}
                  onChange={handleMessageChange}
                  className={`${FIELD} resize-none ${errors.message ? 'border-red-500/60 ring-1 ring-red-500/20' : ''}`}
                />
                {errors.message && (
                  <span className="font-sans text-[12px] text-red-600 font-medium">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-sm bg-forest px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-cream shadow-[0_12px_40px_-12px_rgba(20,57,43,0.6)] transition-all duration-500 ease-premium hover:bg-forest-light active:scale-[0.99]"
              >
                {contactData.submitButtonText || 'Submit'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

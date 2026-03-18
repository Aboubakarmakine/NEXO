import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Copy, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import SectionLabel from '../components/ui/SectionLabel';
import { submitContact } from '../lib/airtable';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SUBJECTS = ['General', 'Partnership', 'Investment', 'Press', 'Other'];

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-nexo-teal hover:text-nexo-teal-light transition-colors"
      aria-label={`Copy ${email}`}
    >
      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span className="text-xs font-mono">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmitStatus('loading');
    setErrorMessage('');
    try {
      await submitContact({
        ...data,
        submittedAt: new Date().toISOString(),
      });
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact NEXO | Get in Touch</title>
        <meta name="description" content="Get in touch with NEXO. Whether you're a worker, employer, partner, or investor — we'd love to hear from you." />
        <meta property="og:title" content="Contact NEXO | Get in Touch" />
        <meta property="og:description" content="Get in touch with NEXO about workforce reintegration." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/contact" />
        <link rel="canonical" href="https://nexo.io/contact" />
      </Helmet>

      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left — Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>CONTACT</SectionLabel>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-display-md text-nexo-navy mb-4">
                Get in touch.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-body-lg text-nexo-navy/70 mb-10">
                Whether you're a worker, employer, partner, or investor — we'd love to hear from you.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <p className="text-body-sm font-medium text-nexo-navy mb-1">General Inquiries</p>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-nexo-teal" />
                    <a href="mailto:hello@nexo.io" className="text-body-md text-nexo-teal no-underline hover:underline">
                      hello@nexo.io
                    </a>
                    <CopyEmailButton email="hello@nexo.io" />
                  </div>
                </div>
                <div>
                  <p className="text-body-sm font-medium text-nexo-navy mb-1">Strategic & Partnership Inquiries</p>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-nexo-teal" />
                    <a href="mailto:partnerships@nexo.io" className="text-body-md text-nexo-teal no-underline hover:underline">
                      partnerships@nexo.io
                    </a>
                    <CopyEmailButton email="partnerships@nexo.io" />
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <p className="text-body-sm font-medium text-nexo-navy mb-3">Follow Us</p>
                  <div className="flex items-center gap-4">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-nexo-mid-gray hover:text-nexo-teal transition-colors" aria-label="LinkedIn">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-nexo-mid-gray hover:text-nexo-teal transition-colors" aria-label="Instagram">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-nexo-off-white rounded-card p-8 shadow-card"
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-nexo-green mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-nexo-navy mb-3">Message sent.</h3>
                  <p className="text-body-md text-nexo-mid-gray">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-body-sm font-medium text-nexo-navy mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      {...register('name')}
                      className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.name ? 'border-red-400' : 'border-nexo-light-gray'}`}
                      placeholder="Your name"
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && <p id="contact-name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-body-sm font-medium text-nexo-navy mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.email ? 'border-red-400' : 'border-nexo-light-gray'}`}
                      placeholder="you@example.com"
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && <p id="contact-email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-body-sm font-medium text-nexo-navy mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      {...register('subject')}
                      className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.subject ? 'border-red-400' : 'border-nexo-light-gray'}`}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    >
                      <option value="">Select a subject...</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.subject && <p id="contact-subject-error" className="text-red-500 text-sm mt-1" role="alert">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-body-sm font-medium text-nexo-navy mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      {...register('message')}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal resize-y ${errors.message ? 'border-red-400' : 'border-nexo-light-gray'}`}
                      placeholder="How can we help?"
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && <p id="contact-message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message.message}</p>}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-btn bg-gradient-to-r from-nexo-teal to-nexo-teal-light text-white font-body font-semibold text-base shadow-btn hover:shadow-lg transition-shadow disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'loading' ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <>Send Message <ArrowRight className="w-4 h-4" /></>
                    )}
                  </motion.button>
                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center" role="alert">{errorMessage}</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

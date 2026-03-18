import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Lock, Sparkles, Radio } from 'lucide-react';
import SectionLabel from '../components/ui/SectionLabel';
import WaitlistForm from '../components/ui/WaitlistForm';

type Role = 'worker' | 'employer' | 'partner' | 'investor';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const TRUST_SIGNALS = [
  { icon: CheckCircle, text: 'Early access to pilot phases' },
  { icon: Radio, text: 'Segmented updates based on your role' },
  { icon: Sparkles, text: 'Be part of shaping the ecosystem' },
  { icon: Lock, text: 'Your data stays private. No spam.' },
];

const COPY = {
  label: 'EARLY ACCESS',
  headline: 'Join the NEXO waitlist.',
  body: 'Tell us who you are and how you want to engage with the platform.',
  quote:
    '"Thank you for joining NEXO. We\'re building the first layer of the ecosystem now, and we\'ll keep you updated as early access opportunities open."',
};

export default function Waitlist() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role') as Role | null;
  const validRoles: Role[] = ['worker', 'employer', 'partner', 'investor'];
  const defaultRole = roleParam && validRoles.includes(roleParam) ? roleParam : undefined;

  return (
    <>
      <Helmet>
        <title>Join the NEXO Waitlist | Early Access</title>
        <meta name="description" content="Sign up for early access to NEXO CORE — the workforce reintegration platform for returned migrants." />
        <meta property="og:title" content="Join the NEXO Waitlist | Early Access" />
        <meta property="og:description" content="Sign up for early access to NEXO CORE — the workforce reintegration platform for returned migrants." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/waitlist" />
        <link rel="canonical" href="https://nexo.io/waitlist" />
      </Helmet>

      {/* No Navbar on Waitlist — distraction-free */}
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column — Messaging */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{COPY.label}</SectionLabel>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-display-md text-nexo-navy mb-4">
                {COPY.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-body-lg text-nexo-navy/70 mb-8">
                {COPY.body}
              </motion.p>

              {/* Trust signals */}
              <motion.div variants={fadeUp} className="space-y-4 mb-10">
                {TRUST_SIGNALS.map((signal) => (
                  <div key={signal.text} className="flex items-center gap-3">
                    <signal.icon className="w-5 h-5 text-nexo-teal flex-shrink-0" />
                    <span className="text-body-md text-nexo-navy/80">{signal.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* Quote */}
              <motion.blockquote
                variants={fadeUp}
                className="border-l-2 border-nexo-teal/30 pl-6 italic text-body-md text-nexo-navy/60"
              >
                {COPY.quote}
              </motion.blockquote>
            </motion.div>

            {/* Right Column — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-nexo-off-white rounded-card p-8 shadow-card"
            >
              <WaitlistForm sourcePage="waitlist" defaultRole={defaultRole} />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

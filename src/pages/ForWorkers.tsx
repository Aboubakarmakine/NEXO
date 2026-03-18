import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Eye, Shield, Unlock, Sparkles } from 'lucide-react';
import SectionLabel from '../components/ui/SectionLabel';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const COPY = {
  hero: {
    label: 'FOR WORKERS',
    headline: 'A better starting point after return.',
    subheadline:
      'NEXO CORE is being built to help skilled workers become visible, trusted, and connected to future opportunities.',
  },
  quote:
    'Your experience is real. Your skills are real. NEXO is building a path that recognizes both.',
  offers: [
    {
      icon: Eye,
      title: 'Visibility',
      description: 'Be seen by employers, partners, and the ecosystem.',
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'A credible foundation that grows over time.',
    },
    {
      icon: Unlock,
      title: 'Access',
      description: 'Future pathways to projects and opportunities.',
    },
    {
      icon: Sparkles,
      title: 'Possibility',
      description: 'Long-term: certifications, profile growth, structured career identity.',
    },
  ],
  expectations: [
    'Right now, NEXO is in its early ecosystem-building phase. Joining the waitlist is the first step.',
    'As pilot phases open, waitlist members will be first to receive access invitations.',
    'Over time, you will have the ability to build a verified digital profile, connect to employers, and access credentialing tools.',
  ],
};

export default function ForWorkers() {
  return (
    <>
      <Helmet>
        <title>For Workers | NEXO CORE — Your Path Back to Opportunity</title>
        <meta name="description" content="NEXO CORE helps skilled returned migrants become visible, trusted, and connected to future opportunities in construction and real estate." />
        <meta property="og:title" content="For Workers | NEXO CORE — Your Path Back to Opportunity" />
        <meta property="og:description" content="NEXO CORE helps skilled returned migrants become visible, trusted, and connected to future opportunities." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/for-workers" />
        <link rel="canonical" href="https://nexo.io/for-workers" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-32 lg:py-40" style={{ background: 'var(--gradient-hero)' }}>
          <div className="hero-grid-overlay" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeUp}>
                <SectionLabel color="white">{COPY.hero.label}</SectionLabel>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-display-xl text-white mb-6">
                {COPY.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-body-xl text-white/70 max-w-2xl mx-auto">
                {COPY.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-nexo-navy py-20 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <blockquote className="font-display text-2xl lg:text-3xl italic text-white leading-snug">
              "{COPY.quote}"
            </blockquote>
          </motion.div>
        </section>

        {/* What NEXO CORE Offers Workers */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>WHAT NEXO CORE OFFERS WORKERS</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy">
                Built around what matters to you.
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {COPY.offers.map((offer) => (
                <motion.div key={offer.title} variants={fadeUp}>
                  <Card className="text-center p-8 h-full">
                    <offer.icon className="w-10 h-10 text-nexo-teal mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="font-display text-xl text-nexo-navy mb-3">{offer.title}</h3>
                    <p className="text-body-md text-nexo-navy/70">{offer.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* What to Expect Right Now */}
        <section className="bg-nexo-off-white py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>WHAT TO EXPECT RIGHT NOW</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-sm text-nexo-navy mb-8">
                Honest about where we are.
              </motion.h2>
              <div className="space-y-4">
                {COPY.expectations.map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-nexo-teal/10 text-nexo-teal flex items-center justify-center text-sm font-mono font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-body-lg text-nexo-navy/80">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32" style={{ background: 'var(--gradient-core)' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto px-6"
          >
            <h2 className="text-display-md text-white mb-6">Ready to take the first step?</h2>
            <p className="text-body-lg text-white/80 mb-10">
              Join the waitlist and be the first to know when early access opens.
            </p>
            <Link to="/waitlist?role=worker">
              <Button variant="white" size="lg" showArrow>
                Join as a Worker
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}

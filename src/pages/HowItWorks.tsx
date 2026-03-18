import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { UserPlus, Users, FileText, Bell, ClipboardList, Search, Link2, Award } from 'lucide-react';
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
    label: 'HOW IT WORKS',
    headline: 'A simple first layer designed to reconnect talent to opportunity.',
  },
  steps: [
    {
      icon: UserPlus,
      num: '01',
      title: 'Join the Waitlist',
      description: 'Tell us who you are and how you want to engage.',
    },
    {
      icon: Users,
      num: '02',
      title: 'Select Your Role',
      description: 'Worker, employer, partner, or advisor. We design for each.',
    },
    {
      icon: FileText,
      num: '03',
      title: 'Share Your Background',
      description: "What you bring to the ecosystem. Where you've been. What you're looking for.",
    },
    {
      icon: Bell,
      num: '04',
      title: 'Get Access Updates',
      description: "As early pilot phases open, you'll be first in line.",
    },
  ],
  futurePhases: [
    { icon: ClipboardList, text: 'Worker profile creation and skill documentation' },
    { icon: Search, text: 'Employer access layer and talent discovery' },
    { icon: Link2, text: 'Structured matching and opportunity pipeline' },
    { icon: Award, text: 'Certification and long-term credentialing' },
  ],
};

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How NEXO CORE Works | Workforce Reintegration Platform</title>
        <meta name="description" content="Learn how NEXO CORE works — a simple first layer designed to reconnect returned migrant talent to opportunity in construction and real estate." />
        <meta property="og:title" content="How NEXO CORE Works" />
        <meta property="og:description" content="A simple first layer designed to reconnect talent to opportunity." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/how-it-works" />
        <link rel="canonical" href="https://nexo.io/how-it-works" />
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
              <motion.h1 variants={fadeUp} className="text-display-xl text-white">
                {COPY.hero.headline}
              </motion.h1>
            </motion.div>
          </div>
        </section>

        {/* Current Phase — 4 Steps */}
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
                <SectionLabel>CURRENT PHASE</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy">
                Four steps to get started.
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {COPY.steps.map((step) => (
                <motion.div key={step.num} variants={fadeUp}>
                  <Card className="h-full p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nexo-teal to-nexo-teal-light flex items-center justify-center text-white font-mono font-bold text-sm mx-auto mb-4">
                      {step.num}
                    </div>
                    <step.icon className="w-8 h-8 text-nexo-teal mx-auto mb-3" strokeWidth={1.5} />
                    <h3 className="font-display text-lg text-nexo-navy mb-3">{step.title}</h3>
                    <p className="text-body-md text-nexo-navy/70">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Coming Next */}
        <section className="bg-nexo-off-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>FUTURE PHASES</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-sm text-nexo-navy mb-8">
                What comes next.
              </motion.h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {COPY.futurePhases.map((phase) => (
                  <motion.div
                    key={phase.text}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-5 rounded-card bg-white border border-nexo-light-gray"
                  >
                    <phase.icon className="w-6 h-6 text-nexo-mid-gray flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-body-md text-nexo-navy/60">{phase.text}</p>
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
            <h2 className="text-display-md text-white mb-6">Be part of the first wave.</h2>
            <p className="text-body-lg text-white/80 mb-10">
              Early members will shape how NEXO grows.
            </p>
            <Link to="/waitlist">
              <Button variant="white" size="lg" showArrow>
                Get Early Access
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}

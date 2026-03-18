import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, Search, ShieldCheck, Building2, Globe, Lightbulb } from 'lucide-react';
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
    label: 'FOR EMPLOYERS & PARTNERS',
    headline: 'Help build a more trusted workforce pipeline.',
    subheadline:
      'NEXO is creating infrastructure that can make reintegration more visible, more structured, and more scalable.',
  },
  employers: {
    label: 'FOR EMPLOYERS',
    items: [
      { icon: Users, title: 'Future access to emerging structured talent', description: 'As the NEXO ecosystem grows, employers will gain access to a verified, structured talent pool of returned migrants with real skills.' },
      { icon: Search, title: 'Early ecosystem participation and pilot shaping', description: 'Early participants help shape how the platform works, what it prioritizes, and who it serves.' },
      { icon: ShieldCheck, title: 'Reduce hiring uncertainty before it becomes a bottleneck', description: 'Build relationships with the ecosystem now to be ready when demand meets supply.' },
    ],
  },
  partners: {
    label: 'FOR PARTNERS / NGOs / INSTITUTIONS',
    items: [
      { icon: Globe, title: 'Referral infrastructure for the workers you serve', description: 'Provide your beneficiaries with a structured pathway to visibility and opportunity.' },
      { icon: Lightbulb, title: 'Strategic collaboration on ecosystem design', description: 'Be part of building core infrastructure — not just another referral tool.' },
      { icon: Building2, title: 'Scalable, measurable impact vehicle', description: 'Track outcomes, demonstrate value, and grow your reintegration capacity.' },
    ],
  },
  whyEarly:
    'The companies and organizations that join now will shape how this platform works, what it prioritizes, and who it serves.',
};

export default function ForEmployers() {
  return (
    <>
      <Helmet>
        <title>For Employers & Partners | NEXO CORE — Build the Workforce Pipeline</title>
        <meta name="description" content="NEXO is creating infrastructure that can make reintegration more visible, more structured, and more scalable for employers and partners." />
        <meta property="og:title" content="For Employers & Partners | NEXO CORE" />
        <meta property="og:description" content="NEXO is creating infrastructure that can make reintegration more visible, more structured, and more scalable." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/for-employers" />
        <link rel="canonical" href="https://nexo.io/for-employers" />
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

        {/* For Employers */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-12"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{COPY.employers.label}</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy">
                Why join the ecosystem as an employer.
              </motion.h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-3 gap-8"
            >
              {COPY.employers.items.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <Card className="h-full p-8">
                    <item.icon className="w-10 h-10 text-nexo-teal mb-4" strokeWidth={1.5} />
                    <h3 className="font-display text-lg text-nexo-navy mb-3">{item.title}</h3>
                    <p className="text-body-md text-nexo-navy/70">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* For Partners */}
        <section className="bg-nexo-off-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-12"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{COPY.partners.label}</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy">
                Why partner with NEXO.
              </motion.h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-3 gap-8"
            >
              {COPY.partners.items.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <Card className="h-full p-8">
                    <item.icon className="w-10 h-10 text-nexo-green mb-4" strokeWidth={1.5} />
                    <h3 className="font-display text-lg text-nexo-navy mb-3">{item.title}</h3>
                    <p className="text-body-md text-nexo-navy/70">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Join Early */}
        <section className="bg-white py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="max-w-3xl mx-auto px-6 text-center"
          >
            <SectionLabel>WHY JOIN EARLY</SectionLabel>
            <h2 className="text-display-sm text-nexo-navy mb-6">Shape the future of workforce reintegration.</h2>
            <p className="text-body-lg text-nexo-navy/70 mb-10">{COPY.whyEarly}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/waitlist?role=employer">
                <Button variant="primary" size="lg" showArrow>
                  Join as an Employer
                </Button>
              </Link>
              <Link to="/waitlist?role=partner">
                <Button variant="secondary" size="lg">
                  Partner with NEXO
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

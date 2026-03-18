import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Building2, HardHat, TrendingUp, Heart, Globe } from 'lucide-react';
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
    headline: "We're building the infrastructure that reintegration has always needed.",
    subheadline:
      'NEXO was born from a simple observation: millions of returned migrants carry real skills and experience, but no system exists to reconnect them to formal economic opportunity. We decided to build one.',
  },
  mission:
    'To create the first trusted digital infrastructure that helps returned migrants become visible, verified, and connected to economic opportunity.',
  vision:
    'A world where return migration is not the end of economic progress, but the beginning of a new chapter — supported by the right technology, the right partnerships, and the right design.',
  whySector: {
    headline: 'Why Construction & Real Estate',
    paragraphs: [
      'Construction is one of the largest employers of migrant labor globally. When workers return, their skills are often directly transferable — but the systems to recognize and deploy those skills are broken or nonexistent.',
      'Real estate development is growing rapidly across Latin America. Demand for skilled labor is accelerating. The gap between supply and structured access is where NEXO operates.',
      'By focusing on a sector with massive scale, clear demand, and tangible skills — we can build a reintegration model that works, then expand.',
    ],
  },
  whyMatters: [
    { icon: TrendingUp, title: 'Economic', description: 'Returned migrants represent untapped economic potential. Reconnecting them to formal work grows GDP and reduces informality.' },
    { icon: Heart, title: 'Social', description: 'Dignity through work. Reintegration without structure leads to isolation, instability, and wasted human potential.' },
    { icon: Globe, title: 'Structural', description: 'No infrastructure exists to verify, match, and deploy this talent. NEXO is building the rails.' },
  ],
  founders: [
    { name: '[Founder Name]', title: '[CEO / Co-Founder]', bio: 'Background in workforce infrastructure and emerging markets. Leading NEXO\'s vision and strategy.' },
    { name: '[Founder Name]', title: '[CTO / Co-Founder]', bio: 'Technical leader with experience building scalable platforms for underserved markets.' },
  ],
};

export default function About() {
  return (
    <>
      <Helmet>
        <title>About NEXO | Workforce Reintegration Infrastructure</title>
        <meta name="description" content="Learn about NEXO — the venture-backed startup building workforce reintegration infrastructure for returned migrants in construction and real estate." />
        <meta property="og:title" content="About NEXO | Workforce Reintegration Infrastructure" />
        <meta property="og:description" content="Building the infrastructure that reintegration has always needed." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/about" />
        <link rel="canonical" href="https://nexo.io/about" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-32 lg:py-40" style={{ background: 'var(--gradient-hero)' }}>
          <div className="hero-grid-overlay" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeUp}>
                <SectionLabel color="white">ABOUT NEXO</SectionLabel>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-display-lg text-white mb-6">
                {COPY.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-body-xl text-white/70 max-w-2xl mx-auto">
                {COPY.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 gap-8"
            >
              <motion.div variants={fadeUp}>
                <Card hover={false} className="h-full border-l-4 border-l-nexo-teal p-8">
                  <h3 className="text-label text-nexo-teal mb-4">OUR MISSION</h3>
                  <p className="font-display text-xl text-nexo-navy leading-snug">{COPY.mission}</p>
                </Card>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Card hover={false} className="h-full border-l-4 border-l-nexo-green p-8">
                  <h3 className="text-label text-nexo-green mb-4">OUR VISION</h3>
                  <p className="font-display text-xl text-nexo-navy leading-snug">{COPY.vision}</p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Construction + Real Estate */}
        <section className="bg-nexo-off-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <Building2 className="w-8 h-8 text-nexo-teal" strokeWidth={1.5} />
                <HardHat className="w-8 h-8 text-nexo-teal" strokeWidth={1.5} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionLabel>SECTOR FOCUS</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy mb-8">
                {COPY.whySector.headline}
              </motion.h2>
              {COPY.whySector.paragraphs.map((p, i) => (
                <motion.p key={i} variants={fadeUp} className="text-body-lg text-nexo-navy/80 mb-4">
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Reintegration Infrastructure Matters */}
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
                <SectionLabel>WHY THIS MATTERS</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy">
                Why reintegration infrastructure matters.
              </motion.h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-3 gap-8"
            >
              {COPY.whyMatters.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <Card className="text-center p-8 h-full">
                    <item.icon className="w-10 h-10 text-nexo-teal mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="font-display text-xl text-nexo-navy mb-3">{item.title}</h3>
                    <p className="text-body-md text-nexo-navy/70">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team / Founders */}
        <section className="bg-nexo-off-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>THE TEAM</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-sm text-nexo-navy mb-8">
                Founded to solve a real problem.
              </motion.h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {COPY.founders.map((founder) => (
                  <motion.div key={founder.name} variants={fadeUp}>
                    <Card hover={false} className="p-8">
                      <div className="w-20 h-20 rounded-full bg-nexo-light-gray mx-auto mb-4" />
                      <h3 className="font-display text-lg text-nexo-navy text-center">{founder.name}</h3>
                      <p className="text-label text-nexo-teal text-center mb-3">{founder.title}</p>
                      <p className="text-body-sm text-nexo-navy/70 text-center">{founder.bio}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} className="text-body-sm text-nexo-mid-gray text-center mt-8 italic">
                Founder photos and bios to be added before launch.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'var(--gradient-core)' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto px-6"
          >
            <h2 className="text-display-sm text-white mb-6">Join us in building this.</h2>
            <Link to="/waitlist">
              <Button variant="white" size="lg" showArrow>
                Join the Waitlist
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}

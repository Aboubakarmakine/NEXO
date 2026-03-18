import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowRight, Users, Building2, Globe, TrendingUp, Shield, Eye, Sparkles, ChevronDown } from 'lucide-react';
import SectionLabel from '../components/ui/SectionLabel';
import Button from '../components/ui/Button';
import EcosystemDiagram from '../components/ui/EcosystemDiagram';

/* =========================================
   Animation Variants
   ========================================= */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* =========================================
   Data
   ========================================= */
const STATS = [
  { value: '6.8M+', label: 'Returned migrants in Latin America', icon: Users },
  { value: '72%', label: 'Carry transferable trade skills', icon: Building2 },
  { value: '0', label: 'Systems exist to verify and connect them', icon: Globe },
];

const PROBLEMS = [
  { title: 'Invisible Skills', text: 'Years of experience abroad vanish on return — no records, no recognition, no system.' },
  { title: 'Zero Infrastructure', text: 'No digital tools connect returned workers to the formal labor market.' },
  { title: 'Growing Demand', text: "Latin America's $340B construction sector needs skilled labor now. Supply exists, but access doesn't." },
];

const PILLARS = [
  { icon: Eye, title: 'Visibility', text: 'Be seen by the ecosystem through verified digital identity.' },
  { icon: Shield, title: 'Trust', text: 'A credible foundation that grows over time with real attestations.' },
  { icon: Sparkles, title: 'Access', text: 'Structured pathways from waitlist to opportunity to career.' },
  { icon: TrendingUp, title: 'Growth', text: 'Certifications, training, credentials — designed for upward mobility.' },
];

const AUDIENCES = [
  { label: 'Workers', description: 'Build a verified profile. Get seen. Access real opportunity.', cta: 'Explore for Workers', href: '/for-workers', icon: '👷' },
  { label: 'Employers', description: 'Access structured, emerging talent before your competitors.', cta: 'Explore for Employers', href: '/for-employers', icon: '🏗️' },
  { label: 'Partners', description: 'Scalable referral infrastructure for the communities you serve.', cta: 'Explore for Partners', href: '/for-employers', icon: '🤝' },
  { label: 'Investors', description: 'Back the infrastructure layer for a $340B+ market.', cta: 'Talk to Us', href: '/contact', icon: '💼' },
];

/* =========================================
   Home Page Component
   ========================================= */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, 80]);

  return (
    <>
      <Helmet>
        <title>NEXO CORE | Workforce Reintegration Infrastructure</title>
        <meta name="description" content="NEXO CORE is building the first trusted digital infrastructure to help returned migrants become visible, verified, and connected to economic opportunity in construction and real estate." />
        <meta property="og:title" content="NEXO CORE | Workforce Reintegration Infrastructure" />
        <meta property="og:description" content="The first trusted digital infrastructure for workforce reintegration." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io" />
        <link rel="canonical" href="https://nexo.io" />
      </Helmet>

      <main>
        {/* ═══════════════════════════════════════════
            HERO — Full-screen, cinematic entry
           ═══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center hero-mesh overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
          <div className="hero-grid-overlay" />
          <div className="hero-mesh-extra" />
          <div className="hero-mesh-orb" />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 py-32 lg:py-0">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left — Copy */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <motion.div variants={fadeUp}>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-nexo-teal-light uppercase mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-nexo-green animate-pulse" />
                      Building in Public
                    </span>
                  </motion.div>
                  <motion.h1 variants={fadeUp} className="text-display-xl text-white mb-6">
                    The missing layer for{' '}
                    <span className="gradient-text">workforce reintegration.</span>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-body-xl text-white/60 max-w-lg mb-10">
                    NEXO CORE is building trusted digital infrastructure to help returned migrants become visible, verified, and connected to economic opportunity.
                  </motion.p>
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                    <Link to="/waitlist">
                      <Button variant="primary" size="lg" showArrow>
                        Join the Waitlist
                      </Button>
                    </Link>
                    <Link to="/how-it-works">
                      <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/5">
                        See How It Works
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right — Ecosystem Diagram */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden lg:block"
                >
                  <EcosystemDiagram className="w-full max-w-[460px] mx-auto" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/30" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            STATS BAR — Bold numbers
           ═══════════════════════════════════════════ */}
        <section className="relative bg-nexo-navy border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-3 gap-8 lg:gap-12"
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <stat.icon className="w-6 h-6 text-nexo-teal/60 mx-auto mb-3" strokeWidth={1.5} />
                  <div className="font-display text-5xl lg:text-6xl text-white stat-glow mb-2">
                    {stat.value}
                  </div>
                  <p className="text-body-sm text-white/40 max-w-[200px] mx-auto">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PROBLEM — Dark, dramatic
           ═══════════════════════════════════════════ */}
        <section className="relative bg-[#070F18] overflow-hidden py-28 lg:py-36">
          {/* Ambient background orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-nexo-teal/3 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel color="white">THE PROBLEM</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-lg text-white mb-4">
                Millions of skilled workers.
                <br />
                <span className="text-white/30">Zero infrastructure.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-body-lg text-white/40 max-w-2xl mx-auto">
                Returned migrants carry real experience from years abroad. But when they come home, they become invisible to the formal economy.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-3 gap-6"
            >
              {PROBLEMS.map((problem, i) => (
                <motion.div
                  key={problem.title}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-8 group hover:border-nexo-teal/20 transition-all duration-500"
                >
                  <div className="text-5xl font-display text-white/5 mb-4">0{i + 1}</div>
                  <h3 className="font-display text-xl text-white mb-3">{problem.title}</h3>
                  <p className="text-body-md text-white/40">{problem.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SOLUTION — The answer
           ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-28 lg:py-36" style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #122838 50%, #0D1B2A 100%)' }}>
          {/* Gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-teal/30 to-transparent" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left — statement */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel color="white">THE SOLUTION</SectionLabel>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-display-lg text-white mb-6">
                  NEXO CORE builds the{' '}
                  <span className="gradient-text">first layer.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-body-lg text-white/50 mb-8">
                  A structured digital entry point that makes returned migrant workers visible, trustable, and accessible to the economic ecosystem they belong in.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Link to="/vision">
                    <span className="inline-flex items-center gap-2 text-nexo-teal-light font-medium cursor-pointer group">
                      Explore the Vision
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right — Pillar cards */}
              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-2 gap-4"
              >
                {PILLARS.map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    variants={scaleIn}
                    className={`glass-card rounded-2xl p-6 hover:border-nexo-teal/20 transition-all duration-500 ${
                      i === 0 ? 'col-span-2 md:col-span-1' : ''
                    }`}
                  >
                    <pillar.icon className="w-8 h-8 text-nexo-teal mb-3" strokeWidth={1.5} />
                    <h3 className="font-display text-lg text-white mb-2">{pillar.title}</h3>
                    <p className="text-body-sm text-white/40">{pillar.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            AUDIENCE — Who NEXO is for
           ═══════════════════════════════════════════ */}
        <section className="bg-white py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>FOR EVERY STAKEHOLDER</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy mb-4">
                Built for an ecosystem, not just a user.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-body-lg text-nexo-navy/50 max-w-xl mx-auto">
                NEXO connects four stakeholder groups in a single infrastructure layer.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {AUDIENCES.map((aud) => (
                <motion.div
                  key={aud.label}
                  variants={fadeUp}
                  className="group relative bg-nexo-off-white rounded-2xl p-7 border border-transparent hover:border-nexo-teal/15 hover:shadow-xl transition-all duration-500"
                >
                  <span className="text-4xl mb-4 block">{aud.icon}</span>
                  <h3 className="font-display text-xl text-nexo-navy mb-2">{aud.label}</h3>
                  <p className="text-body-sm text-nexo-navy/50 mb-6">{aud.description}</p>
                  <Link to={aud.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-nexo-teal group-hover:gap-2.5 transition-all">
                    {aud.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            QUOTE — Bold, typographic
           ═══════════════════════════════════════════ */}
        <section className="bg-nexo-navy py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeIn}
            className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          >
            <div className="w-16 h-px bg-gradient-to-r from-nexo-teal to-nexo-green mx-auto mb-10" />
            <blockquote className="font-display text-3xl lg:text-4xl text-white leading-tight mb-8">
              "We're not building another job board.
              <br />
              We're building the <span className="gradient-text">infrastructure</span> the world forgot."
            </blockquote>
            <div className="w-16 h-px bg-gradient-to-r from-nexo-teal to-nexo-green mx-auto" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            FINAL CTA — Full-bleed, high conversion
           ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-32 lg:py-40" style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #143040 30%, #1A6B72 70%, #3AAB5C 100%)' }}>
          <div className="hero-grid-overlay" />
          {/* Ambient orbs */}
          <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-nexo-green/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-20 left-20 w-[200px] h-[200px] rounded-full bg-nexo-teal/10 blur-[60px] pointer-events-none" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 text-center max-w-3xl mx-auto px-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-mono tracking-widest text-white/80 uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-nexo-green animate-pulse" />
                Early Access Open
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-display-lg text-white mb-6">
              Be part of something foundational.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body-xl text-white/60 mb-10 max-w-xl mx-auto">
              The first wave of participants will shape how NEXO works, what it prioritizes, and who it serves.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/waitlist">
                <Button variant="white" size="lg" showArrow>
                  Join the Waitlist
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/5">
                  Learn More
                </Button>
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs text-white/30 mt-8 font-mono tracking-wider">
              No credit card · No commitment · Shape the future
            </motion.p>
          </motion.div>
        </section>
      </main>
    </>
  );
}

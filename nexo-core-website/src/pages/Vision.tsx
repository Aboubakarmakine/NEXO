import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SectionLabel from '../components/ui/SectionLabel';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

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
    headline: 'NEXO starts with CORE.',
    subheadline:
      'Over time, NEXO is being designed to grow into a broader ecosystem for workforce access, infrastructure, and economic mobility.',
  },
  modules: [
    {
      name: 'NEXO CORE',
      description: 'Worker visibility, access, trust layer',
      detail: 'The entry layer of the NEXO ecosystem. Focuses on helping returned migrants become visible, structured, and connected to opportunity.',
      status: 'Active Focus',
      variant: 'core' as const,
      badgeVariant: 'active' as const,
      color: 'from-nexo-teal to-nexo-teal-light',
      large: true,
    },
    {
      name: 'NEXO INFRA',
      description: 'Digital twin infrastructure, site-level tools',
      detail: 'Future module for construction site digitization, project management, and field-level coordination.',
      status: 'Future',
      variant: 'infra' as const,
      badgeVariant: 'coming-soon' as const,
      color: 'from-nexo-green-dark to-nexo-green',
      large: false,
    },
    {
      name: 'NEXO CHAIN',
      description: 'Blockchain-backed credentials and verification',
      detail: 'Future module for immutable credential verification, skill attestation, and cross-border work history.',
      status: 'Future',
      variant: 'chain' as const,
      badgeVariant: 'coming-soon' as const,
      color: 'from-nexo-purple to-[#7B6FDE]',
      large: false,
    },
    {
      name: 'NEXO MONEY',
      description: 'Remittance, micro-financing, financial access',
      detail: 'Future module for financial services, wage access, remittance infrastructure, and micro-lending for returned migrants.',
      status: 'Future',
      variant: 'money' as const,
      badgeVariant: 'coming-soon' as const,
      color: 'from-nexo-amber to-[#E9A033]',
      large: false,
    },
  ],
  sequencing:
    'We are not building everything at once. We are building it right.',
  market: [
    'Latin America is home to millions of returned migrants. Many carry years of construction experience from the United States, Spain, and other developed markets. The demand for skilled labor in the region is growing rapidly — but the infrastructure to match this talent to opportunity barely exists.',
    'The construction and real estate sector represents one of the largest economic engines in the region. By starting here, NEXO can demonstrate the model and expand to adjacent sectors over time.',
  ],
};

export default function Vision() {
  return (
    <>
      <Helmet>
        <title>The NEXO Vision | Building a Reintegration Ecosystem</title>
        <meta name="description" content="NEXO starts with CORE. Discover the broader ecosystem vision — INFRA, CHAIN, MONEY — being designed for workforce reintegration at scale." />
        <meta property="og:title" content="The NEXO Vision | Building a Reintegration Ecosystem" />
        <meta property="og:description" content="NEXO starts with CORE. Over time, we're building a broader ecosystem." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/vision" />
        <link rel="canonical" href="https://nexo.io/vision" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-32 lg:py-40" style={{ background: 'var(--gradient-hero)' }}>
          <div className="hero-grid-overlay" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeUp}>
                <SectionLabel color="white">THE VISION</SectionLabel>
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

        {/* The Ecosystem */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>THE ECOSYSTEM</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-md text-nexo-navy">
                Four layers. One mission.
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-6"
            >
              {COPY.modules.map((mod) => (
                <motion.div
                  key={mod.name}
                  variants={fadeUp}
                  className={`
                    rounded-card border p-8 transition-all
                    ${mod.large
                      ? 'bg-gradient-to-r ' + mod.color + ' text-white shadow-lg'
                      : 'bg-white border-nexo-light-gray'
                    }
                  `}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <h3 className={`font-display text-2xl ${mod.large ? 'text-white' : 'text-nexo-navy'}`}>
                      {mod.name}
                    </h3>
                    <Badge variant={mod.badgeVariant}>{mod.status}</Badge>
                  </div>
                  <p className={`text-body-sm font-semibold mb-2 ${mod.large ? 'text-white/80' : 'text-nexo-teal'}`}>
                    {mod.description}
                  </p>
                  <p className={`text-body-md ${mod.large ? 'text-white/70' : 'text-nexo-navy/60'}`}>
                    {mod.detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sequencing Statement */}
        <section className="bg-nexo-navy py-20 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <blockquote className="font-display text-2xl lg:text-3xl italic text-white leading-snug">
              "{COPY.sequencing}"
            </blockquote>
          </motion.div>
        </section>

        {/* Market Context */}
        <section className="bg-nexo-off-white py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>MARKET CONTEXT</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display-sm text-nexo-navy mb-8">
                The opportunity is real.
              </motion.h2>
              {COPY.market.map((p, i) => (
                <motion.p key={i} variants={fadeUp} className="text-body-lg text-nexo-navy/80 mb-4">
                  {p}
                </motion.p>
              ))}
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
            <h2 className="text-display-md text-white mb-6">Be part of something foundational.</h2>
            <p className="text-body-lg text-white/80 mb-10">
              Join the early ecosystem and help shape what comes next.
            </p>
            <Link to="/waitlist">
              <Button variant="white" size="lg" showArrow>
                Join the Early Ecosystem
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}

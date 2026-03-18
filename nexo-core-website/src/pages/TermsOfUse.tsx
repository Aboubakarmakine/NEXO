import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionLabel from '../components/ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function TermsOfUse() {
  return (
    <>
      <Helmet>
        <title>Terms of Use | NEXO</title>
        <meta name="description" content="NEXO Terms of Use — conditions governing your use of the NEXO website." />
        <meta property="og:title" content="Terms of Use | NEXO" />
        <meta property="og:description" content="NEXO Terms of Use — conditions governing your use of the NEXO website." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/terms" />
        <link rel="canonical" href="https://nexo.io/terms" />
      </Helmet>

      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>LEGAL</SectionLabel>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-display-md text-nexo-navy mb-8">
              Terms of Use
            </motion.h1>

            <motion.div variants={fadeUp} className="prose prose-lg max-w-none text-nexo-navy/80 space-y-6">
              <p className="text-body-sm text-nexo-mid-gray">
                Last updated: March 2025
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">1. Acceptance of Terms</h2>
              <p className="text-body-md">
                By accessing and using the NEXO website (nexo.io), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the website.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">2. Informational Purpose</h2>
              <p className="text-body-md">
                This website is provided for informational purposes only. It describes the mission, vision, and planned capabilities of NEXO and NEXO CORE. The content on this site does not constitute a contractual offer, guarantee of service, or commitment to deliver any specific functionality.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">3. No Guarantee of Platform Availability</h2>
              <p className="text-body-md">
                NEXO is currently in its early ecosystem-building phase. There is no guarantee of when, or in what form, the platform will become fully available. Features, timelines, and functionality described on this website are subject to change without notice.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">4. Waitlist and Early Access</h2>
              <p className="text-body-md">
                Joining the NEXO waitlist indicates your interest in the platform and consents to receiving updates. It does not constitute a binding agreement, contract, or guarantee of access. Waitlist membership is non-transferable and may be revoked at NEXO's discretion.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">5. User Conduct</h2>
              <p className="text-body-md">
                You agree to use this website lawfully and responsibly. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body-md">
                <li>Submit false or misleading information through any form</li>
                <li>Attempt to interfere with the website's functionality or security</li>
                <li>Use the website for any unlawful or unauthorized purpose</li>
                <li>Reproduce, distribute, or modify website content without permission</li>
              </ul>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">6. Intellectual Property</h2>
              <p className="text-body-md">
                All content on this website — including text, graphics, logos, icons, images, and software — is the property of NEXO or its licensors and is protected by applicable intellectual property laws. You may not use, reproduce, or distribute any content without prior written permission from NEXO.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">7. Disclaimer of Warranties</h2>
              <p className="text-body-md">
                This website is provided "as is" and "as available" without warranties of any kind, either express or implied. NEXO does not warrant that the website will be uninterrupted, error-free, or free of harmful components.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">8. Limitation of Liability</h2>
              <p className="text-body-md">
                To the fullest extent permitted by law, NEXO shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or any services described herein.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">9. Governing Law</h2>
              <p className="text-body-md">
                These Terms of Use shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through appropriate legal channels.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">10. Changes to These Terms</h2>
              <p className="text-body-md">
                NEXO reserves the right to modify these Terms of Use at any time. Changes will be reflected on this page with an updated "Last updated" date. Continued use of the website constitutes acceptance of the revised terms.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">11. Contact</h2>
              <p className="text-body-md">
                If you have questions about these Terms of Use, please contact us at{' '}
                <a href="mailto:hello@nexo.io" className="text-nexo-teal no-underline hover:underline">hello@nexo.io</a>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

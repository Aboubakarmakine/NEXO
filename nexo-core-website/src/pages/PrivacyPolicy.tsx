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

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | NEXO</title>
        <meta name="description" content="NEXO Privacy Policy — how we collect, use, and protect your data." />
        <meta property="og:title" content="Privacy Policy | NEXO" />
        <meta property="og:description" content="NEXO Privacy Policy — how we collect, use, and protect your data." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://nexo.io/privacy" />
        <link rel="canonical" href="https://nexo.io/privacy" />
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
              Privacy Policy
            </motion.h1>

            <motion.div variants={fadeUp} className="prose prose-lg max-w-none text-nexo-navy/80 space-y-6">
              <p className="text-body-sm text-nexo-mid-gray">
                Last updated: March 2025
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">1. Information We Collect</h2>
              <p className="text-body-md">
                When you interact with the NEXO website, we may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body-md">
                <li><strong>Form Submissions:</strong> Name, email address, country, phone number, role, and any additional information you provide through our waitlist or contact forms.</li>
                <li><strong>Analytics Data:</strong> We use Google Analytics 4 to collect anonymized usage data, including page views, session duration, device type, and approximate location. This data does not personally identify you.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and operating system — collected automatically for security and performance purposes.</li>
              </ul>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">2. How We Use Your Data</h2>
              <p className="text-body-md">
                Your information is used solely for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body-md">
                <li>To process and manage your waitlist enrollment</li>
                <li>To send you early access notifications and ecosystem updates (only with your explicit consent)</li>
                <li>To respond to your contact inquiries</li>
                <li>To understand website usage patterns and improve our services</li>
              </ul>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">3. Third-Party Services</h2>
              <p className="text-body-md">
                We use the following third-party services to operate this website:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body-md">
                <li><strong>Airtable:</strong> Used to store form submissions securely. Airtable is SOC 2 compliant.</li>
                <li><strong>Google Analytics 4:</strong> Used for anonymized website analytics. You can opt out using browser extensions or privacy settings.</li>
                <li><strong>Firebase Hosting:</strong> Used to serve the website. Firebase is operated by Google and complies with industry security standards.</li>
              </ul>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">4. Data Sharing</h2>
              <p className="text-body-md">
                <strong>We do not sell, rent, or share your personal information with any third parties for marketing purposes.</strong> Your data is only shared with the service providers listed above, strictly for the purposes described in this policy.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">5. Your Rights</h2>
              <p className="text-body-md">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body-md">
                <li>Request access to the data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for communications at any time</li>
              </ul>
              <p className="text-body-md">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:hello@nexo.io" className="text-nexo-teal no-underline hover:underline">hello@nexo.io</a>.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">6. Data Security</h2>
              <p className="text-body-md">
                We take reasonable measures to protect your information from unauthorized access, alteration, or destruction. However, no method of electronic storage or transmission is 100% secure.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">7. Changes to This Policy</h2>
              <p className="text-body-md">
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
              </p>

              <h2 className="font-display text-xl text-nexo-navy mt-8 mb-3">8. Contact</h2>
              <p className="text-body-md">
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:hello@nexo.io" className="text-nexo-teal no-underline hover:underline">hello@nexo.io</a>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

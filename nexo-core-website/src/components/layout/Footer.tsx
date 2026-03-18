import { Link } from 'react-router-dom';

const PLATFORM_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Vision', path: '/vision' },
  { label: 'Waitlist', path: '/waitlist' },
];

const AUDIENCE_LINKS = [
  { label: 'For Workers', path: '/for-workers' },
  { label: 'For Employers', path: '/for-employers' },
  { label: 'For Partners', path: '/waitlist?role=partner' },
  { label: 'Contact', path: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Use', path: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-nexo-navy text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo + Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4" aria-label="NEXO Home">
              <svg width="32" height="20" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0" y1="12" x2="36" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1A6B72" />
                    <stop offset="1" stopColor="#3AAB5C" />
                  </linearGradient>
                </defs>
                <path
                  d="M9 12C9 8.5 6.5 6 3.5 6C1.5 6 0 7.5 0 9.5C0 14 6 18 9 12Z
                     M9 12C9 15.5 11.5 18 14.5 18C16.5 18 18 16.5 18 14.5C18 10 12 6 9 12Z
                     M27 12C27 8.5 24.5 6 21.5 6C19.5 6 18 7.5 18 9.5C18 14 24 18 27 12Z
                     M27 12C27 15.5 29.5 18 32.5 18C34.5 18 36 16.5 36 14.5C36 10 30 6 27 12Z"
                  stroke="url(#footerLogoGrad)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="33" cy="7" r="2.5" fill="url(#footerLogoGrad)" />
              </svg>
              <span className="font-display text-lg font-bold text-white">NEXO</span>
            </Link>
            <p className="text-body-sm text-nexo-mid-gray max-w-xs">
              Building the entry layer for workforce reintegration.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="text-label text-nexo-mid-gray mb-4">Platform</h4>
            <ul className="space-y-3 list-none">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-body-sm text-white/70 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For You */}
          <div>
            <h4 className="text-label text-nexo-mid-gray mb-4">For You</h4>
            <ul className="space-y-3 list-none">
              {AUDIENCE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-body-sm text-white/70 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal + Social */}
          <div>
            <h4 className="text-label text-nexo-mid-gray mb-4">Legal</h4>
            <ul className="space-y-3 list-none mb-6">
              {LEGAL_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-body-sm text-white/70 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nexo-mid-gray hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nexo-mid-gray hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-nexo-mid-gray">
            © 2025 NEXO. All rights reserved.
          </p>
          <p className="text-body-sm text-nexo-mid-gray">
            Built with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}

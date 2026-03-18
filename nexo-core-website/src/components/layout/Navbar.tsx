import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const NAV_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'For Workers', path: '/for-workers' },
  { label: 'For Employers', path: '/for-employers' },
  { label: 'Vision', path: '/vision' },
] as const;

function NexoLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 no-underline" aria-label="NEXO Home">
      <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="12" x2="36" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A6B72" />
            <stop offset="1" stopColor="#3AAB5C" />
          </linearGradient>
        </defs>
        {/* Infinity loop */}
        <path
          d="M9 12C9 8.5 6.5 6 3.5 6C1.5 6 0 7.5 0 9.5C0 14 6 18 9 12Z
             M9 12C9 15.5 11.5 18 14.5 18C16.5 18 18 16.5 18 14.5C18 10 12 6 9 12Z
             M27 12C27 8.5 24.5 6 21.5 6C19.5 6 18 7.5 18 9.5C18 14 24 18 27 12Z
             M27 12C27 15.5 29.5 18 32.5 18C34.5 18 36 16.5 36 14.5C36 10 30 6 27 12Z"
          stroke="url(#logoGrad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Small circle at top-right */}
        <circle cx="33" cy="7" r="2.5" fill="url(#logoGrad)" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight text-nexo-navy">
        NEXO
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300
        ${isScrolled
          ? 'bg-[rgba(13,27,42,0.96)] backdrop-blur-[16px] shadow-lg'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px] md:h-[72px] h-[64px]">
        {/* Logo */}
        <NexoLogo />

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                font-body text-sm font-medium no-underline transition-colors duration-200
                ${isActive(link.path)
                  ? 'text-nexo-teal-light'
                  : isScrolled
                    ? 'text-white/80 hover:text-white'
                    : 'text-white/70 hover:text-white'
                }
                relative
              `}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-nexo-teal-light rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link to="/waitlist">
            <Button variant="primary" size="sm" showArrow>
              Join Waitlist
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[rgba(13,27,42,0.98)] backdrop-blur-[16px] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`
                      block py-2 font-body text-lg font-medium no-underline
                      ${isActive(link.path) ? 'text-nexo-teal-light' : 'text-white/80'}
                    `}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.3 }}
                className="pt-4"
              >
                <Link to="/waitlist">
                  <Button variant="primary" size="md" fullWidth showArrow>
                    Join Waitlist
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

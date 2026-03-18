import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

/* =========================================
   Lazy-loaded Pages (code splitting)
   ========================================= */
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const ForWorkers = lazy(() => import('./pages/ForWorkers'));
const ForEmployers = lazy(() => import('./pages/ForEmployers'));
const Vision = lazy(() => import('./pages/Vision'));
const Waitlist = lazy(() => import('./pages/Waitlist'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));

/* =========================================
   Loading Fallback
   ========================================= */
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <svg width="48" height="32" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
          <defs>
            <linearGradient id="loadingGrad" x1="0" y1="12" x2="36" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A6B72" />
              <stop offset="1" stopColor="#3AAB5C" />
            </linearGradient>
          </defs>
          <path
            d="M9 12C9 8.5 6.5 6 3.5 6C1.5 6 0 7.5 0 9.5C0 14 6 18 9 12Z
               M9 12C9 15.5 11.5 18 14.5 18C16.5 18 18 16.5 18 14.5C18 10 12 6 9 12Z
               M27 12C27 8.5 24.5 6 21.5 6C19.5 6 18 7.5 18 9.5C18 14 24 18 27 12Z
               M27 12C27 15.5 29.5 18 32.5 18C34.5 18 36 16.5 36 14.5C36 10 30 6 27 12Z"
            stroke="url(#loadingGrad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="33" cy="7" r="2.5" fill="url(#loadingGrad)" />
        </svg>
        <span className="font-display text-nexo-navy text-lg animate-pulse">NEXO</span>
      </div>
    </div>
  );
}

/* =========================================
   Scroll-to-top on route change
   ========================================= */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* =========================================
   Layout wrapper — no Navbar/Footer on Waitlist
   ========================================= */
function Layout({ children, hideNav = false }: { children: React.ReactNode; hideNav?: boolean }) {
  return (
    <>
      {!hideNav && <Navbar />}
      {children}
      {!hideNav && <Footer />}
    </>
  );
}

/* =========================================
   App Component
   ========================================= */
export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
            <Route path="/for-workers" element={<Layout><ForWorkers /></Layout>} />
            <Route path="/for-employers" element={<Layout><ForEmployers /></Layout>} />
            <Route path="/vision" element={<Layout><Vision /></Layout>} />
            <Route path="/waitlist" element={<Layout hideNav><Waitlist /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfUse /></Layout>} />
          </Routes>
        </Suspense>
      </HashRouter>
    </HelmetProvider>
  );
}

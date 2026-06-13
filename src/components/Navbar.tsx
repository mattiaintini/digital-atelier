import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, t, toggleLang } = useLanguage();
  const langLabels: Record<string, string> = { it: 'IT', en: 'EN', fr: 'FR', de: 'DE' };
  const nextLangLabels: Record<string, string> = { it: 'EN', en: 'FR', fr: 'DE', de: 'IT' };

  const NAV_ITEMS = [
    { label: t.nav.chiSiamo, href: '#chi-siamo' },
    { label: t.nav.lavori, href: '#portfolio' },
    { label: t.nav.servizi, href: '#servizi' },
    { label: t.nav.atelier, href: '#atelier' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contatti, href: '#contatti' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (item: typeof NAV_ITEMS[0]) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(item.href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            height: '180%',
            background: scrolled
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 22%, rgba(0,0,0,0.52) 46%, rgba(0,0,0,0.28) 68%, rgba(0,0,0,0.08) 88%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.2) 64%, rgba(0,0,0,0.05) 85%, transparent 100%)',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 md:px-16 py-5 md:py-8">
          <button
            onClick={() => {
              setMobileOpen(false);
              const el = document.querySelector('#hero');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase"
            style={{ color: '#D97757', fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            INTINI WEB ATELIER
          </button>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="text-xs tracking-[0.25em] uppercase transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D97757')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full transition-all duration-300"
              style={{
                border: '1px solid rgba(217,119,87,0.3)',
                color: '#D97757',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(217,119,87,0.08)';
                e.currentTarget.style.borderColor = 'rgba(217,119,87,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(217,119,87,0.3)';
              }}
            >
              {nextLangLabels[lang]}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
              style={{
                border: '1px solid rgba(217,119,87,0.3)',
                color: '#D97757',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}
            >
              {nextLangLabels[lang]}
            </button>
            <button
              className="flex flex-col gap-[5px] min-h-[44px] min-w-[44px] items-center justify-center relative z-[60]"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="block w-5 h-px transition-all duration-300" style={{ background: '#D97757', transform: mobileOpen ? 'rotate(45deg) translateY(3px)' : 'none' }} />
              <span className="block w-5 h-px transition-all duration-300" style={{ background: '#D97757', opacity: mobileOpen ? 0 : 1 }} />
              <span className="block w-5 h-px transition-all duration-300" style={{ background: '#D97757', transform: mobileOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55] md:hidden flex flex-col items-center justify-center gap-8"
            style={{
              background: 'rgba(5,5,5,0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => handleNav(item)}
                className="text-sm tracking-[0.35em] uppercase min-h-[48px] flex items-center"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-display)', fontWeight: 500 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                onTouchStart={(e) => (e.currentTarget.style.color = '#D97757')}
                onTouchEnd={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

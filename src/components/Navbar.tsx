import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import logoMi from '@/assets/logo-mi-white.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, t, toggleLang } = useLanguage();
  const nextLangLabels: Record<string, string> = { it: 'EN', en: 'FR', fr: 'DE', de: 'IT' };

  const NAV_ITEMS = [
    { label: t.nav.chiSiamo, href: '#chi-siamo' },
    { label: t.nav.lavori, href: '#portfolio' },
    { label: t.nav.servizi, href: '#servizi' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contatti, href: '#contatti' },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav
      className="absolute top-4 lg:top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100%-24px)] grid items-center gap-1.5 lg:gap-2 xl:gap-2.5 p-1.5 pl-3 lg:pl-3 lg:pr-1.5 xl:pl-3.5 xl:pr-1.5"
      style={{
        gridTemplateColumns: 'auto 1fr auto',
        background: 'rgba(15,15,16,0.65)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '999px',
      }}
    >
      {/* Brand */}
      <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2 lg:gap-2 xl:gap-2.5 shrink-0">
        <img
          src={logoMi}
          alt="Mattia Intini"
          className="h-12 md:h-16 lg:h-20 xl:h-24 w-auto object-contain select-none"
          style={{ opacity: 0.95 }}
        />
        <span
          className="hidden sm:block lg:hidden xl:block text-[13px] md:text-[14px] xl:text-[15px] whitespace-nowrap"
          style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}
        >
          Intini Web Atelier
        </span>
      </button>

      {/* Links — center column */}
      <ul className="flex items-center justify-center gap-0.5 xl:gap-0.5 list-none min-w-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.label} className="hidden lg:block">
            <button
              onClick={() => scrollTo(item.href)}
              className="text-[13px] xl:text-[14px] px-2 py-2 rounded-full transition-colors duration-150 whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right group */}
      <div className="flex items-center gap-1.5 xl:gap-2 shrink-0">
        <button
          onClick={toggleLang}
          className="text-[11px] xl:text-[12px] tracking-[0.1em] uppercase px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-full transition-colors duration-150"
          style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
        >
          {nextLangLabels[lang]}
        </button>

        {/* CTA filled pill */}
        <button
          onClick={() => scrollTo('#contatti')}
          className="hidden md:inline-flex items-center gap-1.5 rounded-full transition-opacity duration-150 whitespace-nowrap text-[13px] xl:text-[14px] py-2 pl-3.5 pr-2 xl:pl-4 xl:pr-2"
          style={{ background: '#fff', color: '#000', fontFamily: 'var(--font-body)', fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {t.nav.contatti}
          <span
            className="inline-flex items-center justify-center rounded-full w-[22px] h-[22px] xl:w-7 xl:h-7 text-[12px] xl:text-[14px]"
            style={{ background: 'rgba(0,0,0,0.1)' }}
          >
            →
          </span>
        </button>

        {/* Hamburger — mobile/tablet */}
        <button
          className="lg:hidden flex items-center justify-center min-h-[40px] min-w-[40px]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          style={{ color: '#fff', fontSize: 22, lineHeight: 1 }}
        >
          {mobileOpen ? '×' : '≡'}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute left-0 right-0"
          style={{
            top: 'calc(100% + 10px)',
            background: 'rgba(15,15,16,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '10px',
          }}
        >
          <ul className="flex flex-col gap-0.5 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-left text-[14px] px-4 py-2.5 rounded-xl transition-colors"
                  style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

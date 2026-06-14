import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import logoSignature from '@/assets/logo-mi-signature-white.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, t, toggleLang } = useLanguage();
  const nextLangLabels: Record<string, string> = { it: 'EN', en: 'FR', fr: 'DE', de: 'IT' };

  const NAV_ITEMS = [
    { label: t.nav.chiSiamo, href: '#chi-siamo' },
    { label: t.nav.lavori, href: '#portfolio' },
    { label: t.nav.servizi, href: '#servizi' },
    { label: t.nav.faq, href: '#faq' },
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
      className="fixed top-3.5 lg:top-5 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100%-32px)] grid items-center gap-3 lg:gap-9 p-1.5 pl-4 lg:p-2 lg:pl-[22px]"
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
      <button
        onClick={() => scrollTo('#hero')}
        className="flex items-center shrink-0"
        style={{ gap: 10, fontFamily: 'var(--font-display)' }}
      >
        <img
          src={logoSignature}
          alt="Intini Web Atelier"
          style={{ height: 34, width: 'auto', display: 'block' }}
        />
      </button>

      {/* Links — center column */}
      <ul className="hidden lg:flex items-center justify-center list-none" style={{ gap: 4 }}>
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => scrollTo(item.href)}
              className="whitespace-nowrap"
              style={{
                fontSize: 13, fontWeight: 400, color: '#a1a1aa',
                padding: '8px 12px', borderRadius: 999,
                fontFamily: 'var(--font-body)',
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.background = 'transparent'; }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right group */}
      <div className="flex items-center gap-1.5 lg:gap-2 shrink-0 justify-self-end">
        <button
          onClick={toggleLang}
          style={{
            fontSize: 11, fontFamily: 'var(--font-body)',
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 999, padding: '7px 11px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'border-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
        >
          {nextLangLabels[lang]}
        </button>

        {/* CTA filled pill */}
        <button
          onClick={() => scrollTo('#contatti')}
          className="hidden md:inline-flex items-center whitespace-nowrap"
          style={{
            gap: 8, background: '#fff', color: '#000',
            padding: '10px 8px 10px 18px', borderRadius: 999,
            fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {t.nav.contatti}
          <span
            style={{
              width: 24, height: 24, borderRadius: 999,
              background: 'rgba(0,0,0,0.1)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12,
            }}
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
          <ul className="flex flex-col list-none" style={{ gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-left"
                  style={{
                    fontSize: 13, color: '#a1a1aa',
                    padding: '10px 16px', borderRadius: 12,
                    fontFamily: 'var(--font-body)',
                    transition: 'color 0.15s ease, background 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.background = 'transparent'; }}
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

import { useLanguage } from '@/i18n/LanguageContext';
import logoMi from '@/assets/logo-mi-white.png';

interface HeroTitleProps {
  visible: boolean;
  onContact?: () => void;
}

const HeroTitle = ({ visible }: HeroTitleProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 text-center px-5 md:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Logo firma MI */}
      <img
        src={logoMi}
        alt="Mattia Intini"
        className="select-none pointer-events-none"
        style={{
          width: 'clamp(96px, 13vw, 180px)',
          height: 'auto',
          marginBottom: 'clamp(1.5rem, 3vw, 2.75rem)',
          opacity: visible ? 0.95 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 1.4s ease, transform 1.4s ease',
        }}
      />

      <h1
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(2.6rem, 8.6vw, 8.25rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.04,
          marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 1.6s ease 0.25s, transform 1.6s ease 0.25s',
        }}
      >
        {t.hero.title}
      </h1>

      <p
        className="max-w-2xl mx-auto"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
          letterSpacing: '0.01em',
          color: 'rgba(255,255,255,0.66)',
          lineHeight: 1.65,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.6s ease 0.7s',
        }}
      >
        {t.hero.subtitle}
      </p>

      {/* Scroll indicator */}
      <div
        className="mt-14 md:mt-20 flex flex-col items-center gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.6s ease 1.3s',
        }}
      >
        <p
          className="text-[9px] tracking-[0.4em] uppercase"
          style={{ color: 'rgba(217,119,87,0.85)', fontFamily: 'var(--font-body)' }}
        >
          Scroll
        </p>
        <div
          className="w-px h-9 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, rgba(217,119,87,0.5), transparent)' }}
        />
      </div>
    </div>
  );
};

export default HeroTitle;

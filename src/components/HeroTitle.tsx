import { useLanguage } from '@/i18n/LanguageContext';

interface HeroTitleProps {
  visible: boolean;
  onContact?: () => void;
}

const HeroTitle = ({ visible }: HeroTitleProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 text-center px-5 md:px-6 max-w-5xl mx-auto flex flex-col items-center">
      <h1
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(1.95rem, 6.45vw, 6.2rem)',
          letterSpacing: '-0.035em',
          lineHeight: 1.06,
          marginBottom: 'clamp(1.5rem, 2.8vw, 2.25rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 1.6s ease 0.25s, transform 1.6s ease 0.25s',
        }}
      >
        {t.hero.title}
      </h1>

      <p
        className="max-w-xl mx-auto"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
          letterSpacing: '0.005em',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7,
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

import { useLanguage } from '@/i18n/LanguageContext';

interface HeroTitleProps {
  visible: boolean;
  onContact?: () => void;
}

const HeroTitle = ({ visible }: HeroTitleProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto">
      <h1
        className="text-foreground leading-[1.1] mb-6 md:mb-8"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2.2rem, 8vw, 6.5rem)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.6s ease 0.3s',
        }}
      >
        {t.hero.title}
      </h1>

      <p
        className="text-[10px] md:text-base tracking-widest uppercase mt-2 max-w-lg mx-auto text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: '1.8',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.6s ease 0.8s',
        }}
      >
        {t.hero.subtitle}
      </p>

      {/* Scroll indicator */}
      <div
        className="mt-12 md:mt-16 flex flex-col items-center gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.6s ease 1.4s',
        }}
      >
        <p
          className="text-[8px] tracking-[0.4em] uppercase"
          style={{ color: 'rgba(217,119,87,0.85)', fontFamily: 'var(--font-body)' }}
        >
          Scroll
        </p>
        <div
          className="w-px h-8 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, rgba(217,119,87,0.4), transparent)' }}
        />
      </div>
    </div>
  );
};

export default HeroTitle;

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { Lock, Sparkles, Star, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AtelierPreview = ({ onContact }: { onContact: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.atelier-reveal', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featureIcons = [Sparkles, Star, Zap, Lock];

  return (
    <section id="atelier" ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="atelier-reveal text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.9)' }}
        >
          {t.atelier.label}
        </p>
        <h2
          className="atelier-reveal text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1 }}
        >
          {t.atelier.title}
        </h2>
        <p
          className="atelier-reveal text-xs md:text-base max-w-2xl mx-auto mb-10 md:mb-16"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}
        >
          {t.atelier.subtitle}
        </p>

        <div className="atelier-reveal relative mb-10 md:mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {t.atelier.features.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={i} className="flex items-center gap-3 justify-center text-center">
                  <Icon size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#d4a574', opacity: 0.6 }} />
                  <p
                    className="text-xs md:text-sm"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}
                  >
                    {feature}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="atelier-reveal flex flex-col items-center gap-3">
          <button
            onClick={onContact}
            className="w-fit px-3 md:px-4 py-2 md:py-2.5 text-[9px] md:text-[10px] tracking-[0.15em] uppercase rounded-full transition-all duration-500 min-h-[42px]"
            style={{
              background: 'linear-gradient(135deg, rgba(212,165,116,0.12), rgba(212,165,116,0.04))',
              border: '1px solid rgba(212,165,116,0.4)',
              color: '#d4a574',
              boxShadow: '0 0 40px rgba(212,165,116,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,165,116,0.2), rgba(212,165,116,0.08))';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(212,165,116,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,165,116,0.12), rgba(212,165,116,0.04))';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.06)';
            }}
          >
            {t.atelier.cta}
          </button>
          <p
            className="text-[9px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(212,165,116,0.85)', fontFamily: 'var(--font-body)' }}
          >
            {t.atelier.exclusive}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AtelierPreview;

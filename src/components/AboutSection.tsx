import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Staggered reveal with parallax
      gsap.from('.about-anim', {
        y: 80, opacity: 0, duration: 1.4, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });

      // Parallax on the decorative orb
      gsap.to('.about-orb', {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Warm glow on text
      const glowEls = sectionRef.current!.querySelectorAll('.about-glow');
      glowEls.forEach((el) => {
        gsap.fromTo(el,
          { textShadow: '0 0 0px rgba(217,119,87,0)' },
          {
            textShadow: '0 0 14px rgba(217,119,87,0.25), 0 0 30px rgba(217,119,87,0.08)',
            duration: 1, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: 1.5 },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="chi-siamo" ref={sectionRef} className="relative py-24 md:py-40 px-4 md:px-16 overflow-hidden">
      <div
        className="about-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(217,119,87,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p
          className="about-anim text-[10px] tracking-[0.5em] uppercase mb-6"
          style={{ color: 'rgba(217,119,87,0.9)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
        >
          {t.about.label}
        </p>

        <h2
          className="about-anim about-glow leading-[1.15] mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)',
            color: '#ffffff',
            wordSpacing: '0.2em',
          }}
        >
          {t.about.title1}
          {t.about.title2 && (
            <>
              <br />
              <span style={{ color: '#D97757' }}>{t.about.title2}</span>
            </>
          )}
        </h2>

        <div
          className="about-anim h-px w-20 mb-8 md:mb-12"
          style={{ background: 'linear-gradient(90deg, rgba(217,119,87,0.8), transparent)' }}
        />

        <div
          className="about-anim p-5 md:p-8 rounded-xl space-y-5 md:space-y-6"
          style={{
            background: 'rgba(217,119,87,0.03)',
            border: '1px solid rgba(217,119,87,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <p className="text-xs md:text-[14px] leading-[2]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(220,218,214,0.78)' }}>
            {t.about.p1}<span style={{ color: '#ffffff', fontWeight: 400 }}>{t.about.p1Name}</span>{t.about.p1b}
          </p>
          <p className="text-xs md:text-[14px] leading-[2]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(220,218,214,0.78)' }}>
            {t.about.p2}<span style={{ color: '#ffffff', fontWeight: 400 }}>{t.about.p2Bold}</span>{t.about.p2b}
          </p>
          <p className="text-xs md:text-[14px] leading-[2]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(220,218,214,0.78)' }}>
            {t.about.p3}<span style={{ color: '#D97757', fontWeight: 400 }}>{t.about.p3Bold}</span>{t.about.p3b}
          </p>
          <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(217,119,87,0.08)' }}>
            <p
              className="italic"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
                color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
              }}
            >
              {t.about.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

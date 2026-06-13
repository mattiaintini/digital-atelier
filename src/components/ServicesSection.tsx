import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, Zap, Palette, Settings, Gem } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = ({ onContact }: { onContact: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const rows = sectionRef.current!.querySelectorAll('.pkg-row');
      rows.forEach((row) => {
        gsap.fromTo(row,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 95%', once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contatti');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const packages = [
    {
      name: lang === 'it' ? 'Percorso Fondamentale' : 'Fundamental Path',
      subtitle: lang === 'it' ? 'Sito Vetrina Standard' : 'Standard Showcase Website',
      icon: Globe,
      features: lang === 'it'
        ? ['Design responsive essenziale', '5 pagine standard', 'Configurazione SEO di base', 'Modulo di contatto', 'Consegna entro 48 ore']
        : ['Essential responsive design', '5 standard pages', 'Basic SEO setup', 'Contact form', 'Delivery within 48 hours'],
      description: lang === 'it'
        ? 'Ideale per una prima presenza professionale online.'
        : 'Ideal for a first professional online presence.',
      price: null,
      showPrice: false,
      cta: lang === 'it' ? 'Richiedi Preventivo' : 'Request Quote',
      onAction: onContact,
      hasConfigurator: false,
    },
    {
      name: lang === 'it' ? 'Percorso Crescita' : 'Growth Path',
      subtitle: lang === 'it' ? 'Sito + Automazioni' : 'Website + Automations',
      icon: Zap,
      features: lang === 'it'
        ? ['Sito web avanzato', 'Integrazione CRM di base', 'Sistemi di automazione flussi', 'Newsletter automatiche', 'Configuratore Visuale Incluso']
        : ['Advanced website', 'Basic CRM integration', 'Flow automation systems', 'Automatic newsletters', 'Visual Configurator Included'],
      description: lang === 'it'
        ? 'Per chi vuole far crescere il proprio business digitale.'
        : 'For those who want to grow their digital business.',
      price: null,
      showPrice: false,
      cta: lang === 'it' ? 'Compila il Form per Info' : 'Fill the Form for Info',
      onAction: scrollToContact,
      hasConfigurator: true,
    },
    {
      name: lang === 'it' ? 'Percorso Visionario' : 'Visionary Path',
      subtitle: lang === 'it' ? 'Sito + Rebranding' : 'Website + Rebranding',
      icon: Palette,
      features: lang === 'it'
        ? ['Sito web di alto livello', 'Creazione logo professionale', 'Setup profili social', 'Rebranding completo identità digitale', 'Pacchetto chiavi in mano']
        : ['High-end website', 'Professional logo creation', 'Social profile setup', 'Complete digital identity rebranding', 'Turnkey package'],
      description: lang === 'it'
        ? 'Un pacchetto chiavi in mano per una trasformazione radicale.'
        : 'A turnkey package for a radical transformation.',
      price: null,
      showPrice: false,
      cta: lang === 'it' ? 'Inizia la Trasformazione' : 'Start the Transformation',
      onAction: scrollToContact,
      hasConfigurator: true,
    },
    {
      name: lang === 'it' ? 'Atelier Visuale' : 'Visual Atelier',
      subtitle: lang === 'it' ? 'Revisione Grafica Completa' : 'Complete Graphic Review',
      icon: Gem,
      features: lang === 'it'
        ? ['Revisione grafica completa del sito', 'Ottimizzazione UI/UX avanzata', 'Coerenza visiva su ogni pagina', 'Consulenza di design dedicata']
        : ['Complete graphic site review', 'Advanced UI/UX optimization', 'Visual consistency across every page', 'Dedicated design consultancy'],
      description: lang === 'it'
        ? 'Un servizio esclusivo di revisione grafica per elevare ogni dettaglio del tuo sito.'
        : 'An exclusive graphic review service to elevate every detail of your site.',
      price: null,
      showPrice: false,
      cta: lang === 'it' ? 'Richiedi Revisione' : 'Request Review',
      onAction: scrollToContact,
      hasConfigurator: false,
    },
  ];

  return (
    <section id="servizi" ref={sectionRef} className="relative py-24 md:py-40 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(217,119,87,0.9)' }}
          >
            {lang === 'it' ? 'Cosa Offriamo' : 'What We Offer'}
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#ffffff', lineHeight: 1.1 }}
          >
            {lang === 'it' ? 'I Nostri Pacchetti' : 'Our Packages'}
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.03em', lineHeight: 1.9 }}
          >
            {lang === 'it'
              ? 'Ogni nostro progetto è creato al 100% su misura. I pacchetti sottostanti sono solo esempi illustrativi delle nostre capacità.'
              : 'Every project is 100% bespoke. The packages below are illustrative examples of our capabilities.'}
          </p>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="pkg-row group flex flex-col justify-between"
              style={{
                background: 'rgba(10,10,11,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 'clamp(28px, 3vw, 40px)',
                minHeight: 340,
                transition: 'border-color 0.4s ease, background 0.4s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; e.currentTarget.style.background = 'rgba(13,13,15,0.8)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(10,10,11,0.6)'; }}
            >
              {/* Top: number pill + icon */}
              <div className="flex items-start justify-between">
                <span
                  className="inline-flex items-center"
                  style={{
                    gap: 8, padding: '5px 12px 5px 6px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 999,
                    fontSize: 11.5, color: '#a1a1aa', letterSpacing: '0.04em',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span
                    style={{
                      width: 20, height: 20, background: '#fff', color: '#000',
                      borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 600,
                    }}
                  >
                    0{i + 1}
                  </span>
                  {pkg.subtitle}
                </span>
                <pkg.icon size={20} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
              </div>

              {/* Middle: name + deck + tags */}
              <div className="mt-8 md:mt-10">
                <h3
                  className="mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#ffffff', fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                >
                  {pkg.name}
                </h3>
                <p
                  className="mb-5"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: '#a1a1aa', fontSize: 14.5, lineHeight: 1.6, maxWidth: '42ch' }}
                >
                  {pkg.description}
                </p>

                <div className="flex flex-wrap" style={{ gap: 6 }}>
                  {pkg.features.map((feat, fi) => (
                    <span
                      key={fi}
                      style={{
                        fontSize: 12, padding: '5px 11px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 999, color: '#f4f4f5',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {feat}
                    </span>
                  ))}
                  {pkg.hasConfigurator && (
                    <span
                      className="inline-flex items-center"
                      style={{
                        gap: 6, fontSize: 12, padding: '5px 11px',
                        background: 'rgba(217,119,87,0.08)',
                        border: '1px solid rgba(217,119,87,0.3)',
                        borderRadius: 999, color: '#D97757',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      <Settings size={11} strokeWidth={2} />
                      {lang === 'it' ? 'Configuratore' : 'Configurator'}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom: price note + CTA */}
              <div
                className="mt-8 md:mt-10 flex items-end justify-between"
                style={{ gap: 16, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: '#71717a', fontSize: 12.5, lineHeight: 1.4 }}>
                  {lang === 'it' ? 'Previa consulenza gratuita' : 'After free consultation'}
                </p>
                <button
                  onClick={pkg.onAction}
                  className="inline-flex items-center shrink-0"
                  style={{ gap: 8, fontSize: 13, color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 400, whiteSpace: 'nowrap' }}
                >
                  {pkg.cta}
                  <span
                    className="pkg-arrow"
                    style={{
                      width: 24, height: 24, borderRadius: 999,
                      background: 'rgba(255,255,255,0.08)', color: '#fff',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, transition: 'background 0.15s ease, color 0.15s ease',
                    }}
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12" style={{ color: '#a1a1aa', fontFamily: 'var(--font-body)', fontSize: 12.5, letterSpacing: '0.02em' }}>
          {lang === 'it' ? 'Percorso Fondamentale pronto in 72 ore' : 'Fundamental Path ready in 72 hours'} · {lang === 'it' ? 'Per gli altri percorsi, tempi in base al progetto.' : 'Other paths: timeline based on project scope.'}
        </p>

        <style>{`
          .pkg-row:hover .pkg-arrow { background: #fff; color: #000; }
        `}</style>
      </div>
    </section>
  );
};

export default ServicesSection;

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.9)' }}
          >
            {lang === 'it' ? 'Cosa Offriamo' : 'What We Offer'}
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1 }}
          >
            {lang === 'it' ? 'I Nostri Pacchetti' : 'Our Packages'}
          </h2>
          <p
            className="text-sm md:text-base max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.03em', lineHeight: 1.9 }}
          >
            {lang === 'it'
              ? 'Ogni nostro progetto è creato al 100% su misura. I pacchetti sottostanti sono solo esempi illustrativi delle nostre capacità.'
              : 'Every project is 100% bespoke. The packages below are illustrative examples of our capabilities.'}
          </p>
        </div>

        {/* Package rows */}
        <div className="space-y-0">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="pkg-row group"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                ...(i === packages.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}),
              }}
            >
              <div className="py-10 md:py-14 flex flex-col items-center text-center gap-4 transition-all duration-500">
                {/* Number + icon */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase"
                    style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.8)' }}
                  >
                    0{i + 1}
                  </span>
                  <pkg.icon size={20} style={{ color: '#d4a574', opacity: 0.6 }} />
                </div>

                <h3
                  className="text-xl md:text-2xl mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#ffffff' }}
                >
                  {pkg.name}
                </h3>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: 'rgba(212,165,116,0.9)', fontFamily: 'var(--font-body)' }}
                >
                  {pkg.subtitle}
                </p>
                <p
                  className="text-sm mb-4 max-w-lg mx-auto"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}
                >
                  {pkg.description}
                </p>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
                  {pkg.features.map((feat, fi) => (
                    <span key={fi} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full" style={{ background: '#d4a574', opacity: 0.4 }} />
                      <span
                        className="text-[11px]"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.82)' }}
                      >
                        {feat}
                      </span>
                    </span>
                  ))}
                </div>

                {pkg.hasConfigurator && (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Settings size={11} style={{ color: '#d4a574', opacity: 0.7 }} />
                    <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: '#d4a574', fontFamily: 'var(--font-body)' }}>
                      {lang === 'it' ? 'Configuratore Incluso' : 'Configurator Included'}
                    </span>
                  </div>
                )}

                {pkg.showPrice ? (
                  <p className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}>
                    {pkg.price}
                  </p>
                ) : (
                  <p className="text-[11px] italic" style={{ color: 'rgba(212,165,116,0.92)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                    {lang === 'it' ? 'Previa consulenza gratuita' : 'After free consultation'}
                  </p>
                )}

                <button
                  onClick={pkg.onAction}
                  className="px-6 py-3 rounded-full text-[9px] md:text-[10px] tracking-[0.15em] uppercase transition-all duration-400 min-h-[44px] whitespace-nowrap"
                  style={{
                    border: '1px solid rgba(212,165,116,0.3)',
                    color: '#d4a574',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,165,116,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(212,165,116,0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)';
                  }}
                >
                  {pkg.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] tracking-wider mt-12" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
          {lang === 'it' ? 'Percorso Fondamentale pronto in 72 ore' : 'Fundamental Path ready in 72 hours'} · {lang === 'it' ? 'Per gli altri percorsi, tempi in base al progetto.' : 'Other paths: timeline based on project scope.'}
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;

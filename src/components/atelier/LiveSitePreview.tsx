import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';
import {
  useAtelierStore,
  templates, palettes, typographyPairs,
} from '@/stores/atelierStore';
import { useEditorStore } from '@/stores/editorStore';
import { EditableElement } from './EditableElement';

type TemplateProps = { colors: string[]; typo: { displayFont: string; bodyFont: string }; brandName: string };

const templateLayouts: Record<string, React.FC<TemplateProps>> = {
  maison: ({ colors, typo, brandName }) => (
    <EditableElement id="maison-root" type="section" label="Pagina" parentId={null} style={{ height: '100%', display: 'flex', flexDirection: 'column', background: colors[0] }}>
      <EditableElement id="maison-nav" type="nav" label="Navigazione" parentId="maison-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: `1px solid ${colors[2]}22` }}>
        <EditableElement id="maison-logo" type="text" label="Logo" parentId="maison-nav">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        </EditableElement>
        <EditableElement id="maison-menu" type="text" label="Menu" parentId="maison-nav" style={{ display: 'flex', gap: 16 }}>
          {['Portfolio', 'About', 'Contact'].map((l) => (
            <span key={l} className="text-[8px] tracking-[0.15em] uppercase" style={{ color: colors[3] }}>{l}</span>
          ))}
        </EditableElement>
      </EditableElement>
      <EditableElement id="maison-hero" type="section" label="Hero" parentId="maison-root" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 40px' }}>
        <div style={{ flex: 1 }}>
          <EditableElement id="maison-accent" type="container" label="Accento" parentId="maison-hero">
            <div style={{ width: 80, height: 2, background: colors[3], marginBottom: 16 }} />
          </EditableElement>
          <EditableElement id="maison-title" type="text" label="Titolo Hero" parentId="maison-hero">
            <p className="text-[22px] leading-tight mb-3" style={{ color: colors[4], fontFamily: typo.displayFont }}>Crafting Digital<br/>Masterpieces</p>
          </EditableElement>
          <EditableElement id="maison-desc" type="text" label="Descrizione" parentId="maison-hero">
            <p className="text-[9px] leading-relaxed max-w-[200px]" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Un portfolio narrativo con scroll immersivo e galleria full-bleed</p>
          </EditableElement>
          <EditableElement id="maison-cta" type="button" label="CTA Button" parentId="maison-hero">
            <div className="mt-4 px-5 py-2 inline-block rounded-sm text-[7px] tracking-[0.2em] uppercase" style={{ background: colors[3], color: colors[0] }}>Esplora</div>
          </EditableElement>
        </div>
        <EditableElement id="maison-img" type="image" label="Immagine Hero" parentId="maison-hero">
          <div style={{ width: 140, height: 160, borderRadius: 12, background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})` }} />
        </EditableElement>
      </EditableElement>
      <EditableElement id="maison-cards" type="section" label="Cards" parentId="maison-root" style={{ display: 'flex', gap: 12, padding: '0 32px 20px' }}>
        {[0, 1, 2].map((i) => (
          <EditableElement key={i} id={`maison-card-${i}`} type="container" label={`Card ${i + 1}`} parentId="maison-cards">
            <div style={{ flex: 1, height: 64, borderRadius: 8, background: `${colors[i + 1]}30` }} />
          </EditableElement>
        ))}
      </EditableElement>
    </EditableElement>
  ),
  vitrine: ({ colors, typo, brandName }) => (
    <EditableElement id="vitrine-root" type="section" label="Pagina" parentId={null} style={{ height: '100%', display: 'flex', flexDirection: 'column', background: colors[0] }}>
      <EditableElement id="vitrine-nav" type="nav" label="Navigazione" parentId="vitrine-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: `1px solid ${colors[2]}22` }}>
        <EditableElement id="vitrine-logo" type="text" label="Logo" parentId="vitrine-nav">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        </EditableElement>
        <EditableElement id="vitrine-menu" type="text" label="Menu" parentId="vitrine-nav" style={{ display: 'flex', gap: 16 }}>
          {['Shop', 'Collection', 'Cart'].map((l) => (
            <span key={l} className="text-[8px] tracking-[0.15em] uppercase" style={{ color: colors[3] }}>{l}</span>
          ))}
        </EditableElement>
      </EditableElement>
      <EditableElement id="vitrine-hero" type="section" label="Prodotto" parentId="vitrine-root" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <EditableElement id="vitrine-product-img" type="image" label="Immagine Prodotto" parentId="vitrine-hero">
            <div style={{ width: 120, height: 120, borderRadius: '50%', margin: '0 auto 20px', background: `radial-gradient(circle, ${colors[2]}, ${colors[1]})`, boxShadow: `0 15px 40px ${colors[3]}20` }} />
          </EditableElement>
          <EditableElement id="vitrine-product-name" type="text" label="Nome Prodotto" parentId="vitrine-hero">
            <p className="text-[18px] tracking-[0.2em] uppercase mb-2" style={{ color: colors[4], fontFamily: typo.displayFont }}>Product Name</p>
          </EditableElement>
          <EditableElement id="vitrine-product-sub" type="text" label="Sottotitolo" parentId="vitrine-hero">
            <p className="text-[8px]" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Luxury Edition · Limited</p>
          </EditableElement>
          <EditableElement id="vitrine-cta" type="button" label="Add to Cart" parentId="vitrine-hero">
            <div className="mt-4 px-6 py-2 inline-block rounded-full text-[7px] tracking-[0.2em] uppercase" style={{ border: `1px solid ${colors[3]}`, color: colors[3] }}>Add to Cart</div>
          </EditableElement>
        </div>
      </EditableElement>
    </EditableElement>
  ),
  salon: ({ colors, typo, brandName }) => (
    <EditableElement id="salon-root" type="section" label="Pagina" parentId={null} style={{ height: '100%', display: 'flex', flexDirection: 'column', background: colors[0] }}>
      <EditableElement id="salon-nav" type="nav" label="Navigazione" parentId="salon-root" style={{ padding: '12px 24px' }}>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
      </EditableElement>
      <EditableElement id="salon-hero" type="section" label="Hero" parentId="salon-root" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px', textAlign: 'center' }}>
        <EditableElement id="salon-title" type="text" label="Titolo" parentId="salon-hero">
          <p className="text-[24px] leading-tight mb-3" style={{ color: colors[4], fontFamily: typo.displayFont }}>Let's Create<br/>Something Bold.</p>
        </EditableElement>
        <EditableElement id="salon-desc" type="text" label="Descrizione" parentId="salon-hero">
          <p className="text-[9px] max-w-[220px] mb-6" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Landing page conversazionale con form immersivo</p>
        </EditableElement>
        <EditableElement id="salon-form" type="container" label="Form" parentId="salon-hero">
          <div style={{ width: 180, borderRadius: 12, padding: 16, background: `${colors[1]}40`, border: `1px solid ${colors[2]}30` }}>
            <div style={{ height: 12, borderRadius: 4, marginBottom: 8, background: `${colors[2]}30` }} />
            <div style={{ height: 12, borderRadius: 4, marginBottom: 8, background: `${colors[2]}30` }} />
            <div style={{ height: 12, borderRadius: 4, background: colors[3] }} />
          </div>
        </EditableElement>
      </EditableElement>
    </EditableElement>
  ),
  galleria: ({ colors, typo, brandName }) => (
    <EditableElement id="gal-root" type="section" label="Pagina" parentId={null} style={{ height: '100%', display: 'flex', flexDirection: 'column', background: colors[0] }}>
      <EditableElement id="gal-nav" type="nav" label="Navigazione" parentId="gal-root" style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <span className="text-[8px]" style={{ color: colors[3] }}>01 / 04</span>
      </EditableElement>
      <EditableElement id="gal-gallery" type="section" label="Galleria" parentId="gal-root" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', overflow: 'hidden' }}>
        {[0, 1, 2, 3].map((i) => (
          <EditableElement key={i} id={`gal-img-${i}`} type="image" label={`Foto ${i + 1}`} parentId="gal-gallery">
            <div style={{ height: '80%', borderRadius: 12, flexShrink: 0, width: i === 1 ? 140 : 80, background: `linear-gradient(180deg, ${colors[i % 4 + 1]}60, ${colors[(i + 1) % 4 + 1]}30)`, opacity: i === 1 ? 1 : 0.5 }} />
          </EditableElement>
        ))}
      </EditableElement>
    </EditableElement>
  ),
  attico: ({ colors, typo, brandName }) => (
    <EditableElement id="att-root" type="section" label="Pagina" parentId={null} style={{ height: '100%', display: 'flex', background: colors[0] }}>
      <EditableElement id="att-sidebar" type="nav" label="Sidebar" parentId="att-root" style={{ width: 80, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 8, background: `${colors[1]}80`, borderRight: `1px solid ${colors[2]}20` }}>
        <span className="text-[8px] tracking-[0.2em] uppercase mb-3" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        {['Dashboard', 'Progetti', 'Team', 'Settings'].map((l, i) => (
          <EditableElement key={l} id={`att-nav-${l}`} type="button" label={l} parentId="att-sidebar">
            <div className="px-2 py-1 rounded text-[7px]" style={{ background: i === 0 ? `${colors[3]}20` : 'transparent', color: i === 0 ? colors[3] : `${colors[4]}40` }}>{l}</div>
          </EditableElement>
        ))}
      </EditableElement>
      <EditableElement id="att-main" type="section" label="Contenuto" parentId="att-root" style={{ flex: 1, padding: 24 }}>
        <EditableElement id="att-title" type="text" label="Titolo Dashboard" parentId="att-main">
          <p className="text-[12px] mb-4" style={{ color: colors[4], fontFamily: typo.displayFont }}>Dashboard</p>
        </EditableElement>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[0, 1, 2, 3].map((i) => (
            <EditableElement key={i} id={`att-card-${i}`} type="container" label={`Widget ${i + 1}`} parentId="att-main">
              <div style={{ height: 56, borderRadius: 8, background: `${colors[i % 3 + 1]}20`, border: `1px solid ${colors[2]}15` }} />
            </EditableElement>
          ))}
        </div>
      </EditableElement>
    </EditableElement>
  ),
  bespoke: ({ colors, typo, brandName }) => (
    <EditableElement id="bespoke-root" type="section" label="Pagina" parentId={null} style={{ height: '100%', position: 'relative', overflow: 'hidden', background: colors[0] }}>
      <EditableElement id="bespoke-logo" type="text" label="Logo" parentId="bespoke-root" style={{ position: 'absolute', top: 16, left: 24 }}>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
      </EditableElement>
      <EditableElement id="bespoke-center" type="container" label="Centro" parentId="bespoke-root" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <p className="text-[32px] leading-none" style={{ color: colors[4], fontFamily: typo.displayFont }}>∞</p>
        <p className="text-[8px] tracking-[0.3em] uppercase mt-3" style={{ color: colors[3] }}>Su Misura</p>
      </EditableElement>
    </EditableElement>
  ),
};

const defaultLayout = templateLayouts.maison;

const LiveSitePreview = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const brandName = useAtelierStore((s) => s.brandName) || 'YOUR BRAND';
  const template = useAtelierStore((s) => s.template) || 'maison';
  const palette = useAtelierStore((s) => s.palette);
  const typography = useAtelierStore((s) => s.typography);
  const setSelected = useEditorStore((s) => s.setSelectedElement);

  const colors = palettes.find((p) => p.id === palette)?.colors || palettes[0].colors;
  const typo = typographyPairs.find((t) => t.id === typography) || typographyPairs[0];
  const templateName = templates.find((t) => t.id === template)?.name || 'LA MAISON';
  const TemplateComponent = templateLayouts[template] || defaultLayout;

  const isDesktop = viewMode === 'desktop';
  const frameWidth = isDesktop ? 680 : 280;
  const frameHeight = isDesktop ? 420 : 500;

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center" onClick={() => setSelected(null)}>
      {/* Viewport toggle */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setViewMode('desktop')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[8px] tracking-[0.2em] uppercase transition-all"
          style={{
            background: isDesktop ? 'rgba(217,119,87,0.12)' : 'transparent',
            border: `1px solid ${isDesktop ? 'rgba(217,119,87,0.3)' : 'rgba(255,255,255,0.06)'}`,
            color: isDesktop ? '#D97757' : 'rgba(255,255,255,0.25)',
          }}
        >
          <Monitor size={12} /> Desktop
        </motion.button>
        <motion.button
          onClick={() => setViewMode('mobile')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[8px] tracking-[0.2em] uppercase transition-all"
          style={{
            background: !isDesktop ? 'rgba(217,119,87,0.12)' : 'transparent',
            border: `1px solid ${!isDesktop ? 'rgba(217,119,87,0.3)' : 'rgba(255,255,255,0.06)'}`,
            color: !isDesktop ? '#D97757' : 'rgba(255,255,255,0.25)',
          }}
        >
          <Smartphone size={12} /> Mobile
        </motion.button>
        <div className="w-[1px] h-4 mx-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <motion.span key={templateName} className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(217,119,87,0.5)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {templateName}
        </motion.span>
      </div>

      {/* Browser frame */}
      <motion.div className="relative" layout transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
        <div className="absolute -inset-4 rounded-3xl opacity-15 blur-2xl pointer-events-none" style={{ background: `linear-gradient(135deg, ${colors[3]}, transparent, ${colors[2]})` }} />

        <motion.div className="rounded-xl overflow-hidden" layout style={{ width: frameWidth, height: frameHeight, background: '#111', padding: 3, boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Chrome */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex gap-1">
              <div className="w-[7px] h-[7px] rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-[7px] h-[7px] rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-[7px] h-[7px] rounded-full" style={{ background: '#28c840' }} />
            </div>
            <div className="flex-1 mx-3 h-[16px] rounded-md flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span className="text-[7px] tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.25)' }}>www.{brandName.toLowerCase().replace(/\s/g, '')}.com</span>
            </div>
          </div>

          {/* Content */}
          <div className="rounded-b-lg overflow-hidden" style={{ height: 'calc(100% - 30px)' }} onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.div key={`${template}-${palette}-${typography}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <TemplateComponent colors={colors} typo={{ displayFont: typo.displayFont, bodyFont: typo.bodyFont }} brandName={brandName} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LiveSitePreview;

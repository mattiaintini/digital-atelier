import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Settings2, Sliders } from 'lucide-react';
import {
  useAtelierStore, Phase, MaterialType,
  templates, palettes, typographyPairs, animationStyles, layoutStyles,
} from '@/stores/atelierStore';
import { useEditorStore } from '@/stores/editorStore';
import LayerTree from './LayerTree';
import PropertyEditor from './PropertyEditor';

const allPhases: { id: Phase; label: string; number: string }[] = [
  { id: 'identity', label: 'IDENTITÀ', number: '01' },
  { id: 'template', label: 'ARCHETIPO', number: '02' },
  { id: 'essence', label: 'ESSENZA', number: '03' },
  { id: 'palette', label: 'CROMIA', number: '04' },
  { id: 'typography', label: 'TIPOGRAFIA', number: '05' },
  { id: 'animations', label: 'DINAMICA', number: '06' },
  { id: 'layout', label: 'ARCHITETTURA', number: '07' },
  { id: 'arsenal', label: 'ARSENALE', number: '08' },
  { id: 'signature', label: 'FIRMA', number: '09' },
];

const materials: { id: MaterialType; name: string; subtitle: string; color: string }[] = [
  { id: 'obsidian', name: 'OSSIDIANA LIQUIDA', subtitle: 'Nero assoluto · Riflessi fluidi', color: '#1a1a1a' },
  { id: 'frosted-glass', name: 'VETRO SMERIGLIATO', subtitle: 'Trasparenza · Rifrazione', color: '#e0e0e0' },
  { id: 'gold', name: 'ORO CHAMPAGNE', subtitle: 'Metallo caldo · Riflessi nobili', color: '#D97757' },
  { id: 'marble', name: 'MARMO DI CARRARA', subtitle: 'Venature classiche · Eternità', color: '#f5f5f0' },
  { id: 'carbon', name: 'FIBRA DI CARBONIO', subtitle: 'Trama tecnica · Performance', color: '#2a2a2a' },
  { id: 'holographic', name: 'OLOGRAFICO', subtitle: 'Iridescenza · Futuro', color: '#c084fc' },
];

const phaseTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function ProceedButton({ onClick, label = 'PROCEDI →' }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      onClick={onClick}
      className="text-[10px] tracking-[0.3em] uppercase py-3 px-6 transition-all duration-300"
      style={{ border: '1px solid rgba(217,119,87,0.3)', color: '#D97757' }}
      whileHover={{ background: 'rgba(217,119,87,0.08)' }}
    >
      {label}
    </motion.button>
  );
}

function PhaseHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
        FASE {number} — {title}
      </p>
      {subtitle && (
        <h2 className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)' }}>{subtitle}</h2>
      )}
    </div>
  );
}

// ─── PHASE 1: IDENTITY ───
function IdentityPhase() {
  const brandName = useAtelierStore((s) => s.brandName);
  const tagline = useAtelierStore((s) => s.tagline);
  const setBrandName = useAtelierStore((s) => s.setBrandName);
  const setTagline = useAtelierStore((s) => s.setTagline);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="01" title="L'IDENTITÀ" subtitle="Incidi il tuo Brand" />
      <div className="relative">
        <label className="block text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>NOME DEL BRAND</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value.toUpperCase())}
          placeholder="IL TUO BRAND"
          maxLength={20}
          className="w-full bg-transparent text-white text-base tracking-[0.15em] py-2.5 border-b outline-none transition-all duration-500 placeholder:text-white/10"
          style={{ borderColor: brandName ? '#D97757' : 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-display)' }}
        />
        <span className="absolute right-0 bottom-3 text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>{brandName.length}/20</span>
      </div>
      <div>
        <label className="block text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>TAGLINE / CLAIM</label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="La tua promessa in una frase..."
          maxLength={60}
          className="w-full bg-transparent text-white text-sm py-2.5 border-b outline-none transition-all duration-500 placeholder:text-white/10"
          style={{ borderColor: tagline ? '#D97757' : 'rgba(255,255,255,0.08)' }}
        />
      </div>
      {brandName.length >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ProceedButton onClick={() => setPhase('template')} />
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── PHASE 2: TEMPLATE ───
function TemplatePhase() {
  const template = useAtelierStore((s) => s.template);
  const setTemplate = useAtelierStore((s) => s.setTemplate);
  const setPhase = useAtelierStore((s) => s.setPhase);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="02" title="L'ARCHETIPO" subtitle="Scegli il Template" />
      <div className="space-y-1.5">
        {templates.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => { setTemplate(t.id); setExpanded(expanded === t.id ? null : t.id); }}
            className="w-full text-left p-2.5 rounded-lg transition-all duration-500"
            style={{
              background: template === t.id ? 'rgba(217,119,87,0.06)' : 'transparent',
              border: `1px solid ${template === t.id ? 'rgba(217,119,87,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="w-full h-1 rounded-full mb-1.5 opacity-60" style={{ background: t.previewGradient }} />
            <p className="text-[9px] tracking-[0.2em]" style={{ color: template === t.id ? '#D97757' : 'rgba(255,255,255,0.4)' }}>{t.name}</p>
            <AnimatePresence>
              {expanded === t.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="text-[7px] leading-relaxed mt-1 mb-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{t.description}</p>
                  <div className="flex gap-1 flex-wrap">
                    {t.tags.map((tag) => (
                      <span key={tag} className="text-[6px] tracking-[0.15em] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(217,119,87,0.1)', color: '#D97757', border: '1px solid rgba(217,119,87,0.15)' }}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      {template && <ProceedButton onClick={() => setPhase('essence')} />}
    </motion.div>
  );
}

// ─── PHASE 3: ESSENCE ───
function EssencePhase() {
  const material = useAtelierStore((s) => s.material);
  const setMaterial = useAtelierStore((s) => s.setMaterial);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="03" title="L'ESSENZA" subtitle="Materiali" />
      <div className="space-y-1">
        {materials.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMaterial(m.id)}
            className="w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-500 text-left"
            style={{
              background: material === m.id ? 'rgba(255,255,255,0.04)' : 'transparent',
              border: `1px solid ${material === m.id ? 'rgba(217,119,87,0.3)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="w-6 h-6 rounded-full border border-white/10 shrink-0"
              style={{
                background: m.id === 'obsidian' ? 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)'
                  : m.id === 'frosted-glass' ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))'
                  : m.id === 'gold' ? 'radial-gradient(circle at 30% 30%, #e8c99b, #8a6d3b)'
                  : m.id === 'marble' ? 'radial-gradient(circle at 30% 30%, #f5f5f0, #d0d0c8)'
                  : m.id === 'carbon' ? 'repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 4px)'
                  : 'linear-gradient(135deg, #ff6b6b, #c084fc, #60a5fa)',
                boxShadow: material === m.id ? `0 0 12px ${m.color}33` : 'none',
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[8px] tracking-[0.2em]" style={{ color: material === m.id ? '#ffffff' : 'rgba(255,255,255,0.35)' }}>{m.name}</p>
              <p className="text-[7px] mt-0.5" style={{ color: 'rgba(255,255,255,0.18)' }}>{m.subtitle}</p>
            </div>
            {material === m.id && <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D97757' }} layoutId="matInd" />}
          </motion.button>
        ))}
      </div>
      <ProceedButton onClick={() => setPhase('palette')} />
    </motion.div>
  );
}

// ─── PHASE 4: PALETTE ───
function PalettePhase() {
  const palette = useAtelierStore((s) => s.palette);
  const setPalette = useAtelierStore((s) => s.setPalette);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="04" title="LA CROMIA" subtitle="Palette" />
      <div className="space-y-1">
        {palettes.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => setPalette(p.id)}
            className="w-full p-2.5 rounded-lg text-left transition-all duration-500"
            style={{
              background: palette === p.id ? 'rgba(217,119,87,0.06)' : 'transparent',
              border: `1px solid ${palette === p.id ? 'rgba(217,119,87,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-2.5 mb-1">
              <div className="flex gap-0.5">
                {p.colors.map((c, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-sm border border-white/5" style={{ background: c }} />
                ))}
              </div>
              {palette === p.id && <motion.div className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: '#D97757' }} layoutId="palInd" />}
            </div>
            <p className="text-[8px] tracking-[0.2em]" style={{ color: palette === p.id ? '#ffffff' : 'rgba(255,255,255,0.35)' }}>{p.name}</p>
            <p className="text-[6px] mt-0.5" style={{ color: 'rgba(255,255,255,0.18)' }}>{p.mood}</p>
          </motion.button>
        ))}
      </div>
      <ProceedButton onClick={() => setPhase('typography')} />
    </motion.div>
  );
}

// ─── PHASE 5: TYPOGRAPHY ───
function TypographyPhase() {
  const typography = useAtelierStore((s) => s.typography);
  const setTypography = useAtelierStore((s) => s.setTypography);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="05" title="LA TIPOGRAFIA" subtitle="Voce Visiva" />
      <div className="space-y-1.5">
        {typographyPairs.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => setTypography(t.id)}
            className="w-full p-2.5 rounded-lg text-left transition-all duration-500"
            style={{
              background: typography === t.id ? 'rgba(217,119,87,0.06)' : 'transparent',
              border: `1px solid ${typography === t.id ? 'rgba(217,119,87,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-sm mb-0.5" style={{ fontFamily: t.displayFont, color: typography === t.id ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>{t.display}</p>
            <p className="text-[7px]" style={{ fontFamily: t.bodyFont, color: 'rgba(255,255,255,0.2)' }}>{t.body} — {t.preview}</p>
          </motion.button>
        ))}
      </div>
      <ProceedButton onClick={() => setPhase('animations')} />
    </motion.div>
  );
}

// ─── PHASE 6: ANIMATIONS ───
function AnimationsPhase() {
  const animationStyle = useAtelierStore((s) => s.animationStyle);
  const setAnimationStyle = useAtelierStore((s) => s.setAnimationStyle);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="06" title="LA DINAMICA" subtitle="Animazioni" />
      <div className="space-y-1">
        {animationStyles.map((a) => (
          <motion.button
            key={a.id}
            onClick={() => setAnimationStyle(a.id)}
            className="w-full p-2.5 rounded-lg text-left transition-all duration-500"
            style={{
              background: animationStyle === a.id ? 'rgba(217,119,87,0.06)' : 'transparent',
              border: `1px solid ${animationStyle === a.id ? 'rgba(217,119,87,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-[8px] tracking-[0.2em]" style={{ color: animationStyle === a.id ? '#D97757' : 'rgba(255,255,255,0.35)' }}>{a.name}</p>
              <span className="text-[6px] tracking-[0.15em] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)' }}>{a.intensity}</span>
            </div>
            <p className="text-[6px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.18)' }}>{a.description}</p>
          </motion.button>
        ))}
      </div>
      <ProceedButton onClick={() => setPhase('layout')} />
    </motion.div>
  );
}

// ─── PHASE 7: LAYOUT ───
function LayoutPhase() {
  const layoutStyle = useAtelierStore((s) => s.layoutStyle);
  const setLayoutStyle = useAtelierStore((s) => s.setLayoutStyle);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="07" title="L'ARCHITETTURA" subtitle="Layout" />
      <div className="space-y-1">
        {layoutStyles.map((l) => (
          <motion.button
            key={l.id}
            onClick={() => setLayoutStyle(l.id)}
            className="w-full p-2.5 rounded-lg text-left transition-all duration-500"
            style={{
              background: layoutStyle === l.id ? 'rgba(217,119,87,0.06)' : 'transparent',
              border: `1px solid ${layoutStyle === l.id ? 'rgba(217,119,87,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-5 rounded border border-white/10 flex items-center justify-center gap-[1px] shrink-0" style={{ background: 'rgba(255,255,255,0.02)' }}>
                {l.columns === '1' && <div className="w-4 h-2.5 rounded-sm" style={{ background: layoutStyle === l.id ? '#D97757' : 'rgba(255,255,255,0.15)' }} />}
                {l.columns === '2' && <>{[0, 1].map((i) => <div key={i} className="w-1.5 h-2.5 rounded-sm" style={{ background: layoutStyle === l.id ? '#D97757' : 'rgba(255,255,255,0.15)' }} />)}</>}
                {l.columns === '2-3' && <>{[0, 1, 2].map((i) => <div key={i} className="h-2.5 rounded-sm" style={{ width: i === 0 ? 3 : 2, background: layoutStyle === l.id ? '#D97757' : 'rgba(255,255,255,0.15)' }} />)}</>}
                {l.columns === '3-4' && <>{[0, 1, 2, 3].map((i) => <div key={i} className="w-1 h-2.5 rounded-sm" style={{ background: layoutStyle === l.id ? '#D97757' : 'rgba(255,255,255,0.15)' }} />)}</>}
                {l.columns === 'H' && <div className="w-4 h-1.5 rounded-sm" style={{ background: layoutStyle === l.id ? '#D97757' : 'rgba(255,255,255,0.15)' }} />}
                {l.columns === '∞' && <span className="text-[7px]" style={{ color: layoutStyle === l.id ? '#D97757' : 'rgba(255,255,255,0.2)' }}>∞</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] tracking-[0.2em]" style={{ color: layoutStyle === l.id ? '#D97757' : 'rgba(255,255,255,0.35)' }}>{l.name}</p>
                <p className="text-[6px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.18)' }}>{l.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <ProceedButton onClick={() => setPhase('arsenal')} />
    </motion.div>
  );
}

// ─── PHASE 8: ARSENAL ───
function ArsenalPhase() {
  const modules = useAtelierStore((s) => s.modules);
  const toggleModule = useAtelierStore((s) => s.toggleModule);
  const setPhase = useAtelierStore((s) => s.setPhase);
  const activeCount = modules.filter((m) => m.active).length;

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="08" title="L'ARSENALE" subtitle="Moduli d'Élite" />
      <p className="text-[8px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.25)' }}>{activeCount} MODULI ATTIVATI</p>
      <div className="space-y-1">
        {modules.map((mod) => (
          <motion.button
            key={mod.id}
            onClick={() => toggleModule(mod.id)}
            className="w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-500 text-left"
            style={{
              background: mod.active ? 'rgba(217,119,87,0.06)' : 'transparent',
              border: `1px solid ${mod.active ? 'rgba(217,119,87,0.2)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: mod.active ? 'rgba(217,119,87,0.08)' : 'rgba(255,255,255,0.02)' }}
          >
            <div className="w-6 h-3 rounded-full relative shrink-0 transition-colors duration-500"
              style={{ background: mod.active ? 'rgba(217,119,87,0.3)' : 'rgba(255,255,255,0.06)', border: `1px solid ${mod.active ? 'rgba(217,119,87,0.5)' : 'rgba(255,255,255,0.1)'}` }}>
              <motion.div className="absolute top-[2px] w-[8px] h-[8px] rounded-full"
                style={{ background: mod.active ? '#D97757' : 'rgba(255,255,255,0.2)' }}
                animate={{ left: mod.active ? '12px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[7px] tracking-[0.15em]" style={{ color: mod.active ? '#D97757' : 'rgba(255,255,255,0.3)' }}>{mod.name}</p>
              <p className="text-[6px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.12)' }}>{mod.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <div>
        <label className="block text-[7px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>NOTE AGGIUNTIVE</label>
        <textarea
          value={useAtelierStore.getState().notes}
          onChange={(e) => useAtelierStore.getState().setNotes(e.target.value)}
          placeholder="Descrivi la tua visione..."
          rows={2}
          className="w-full bg-transparent text-white text-[9px] p-2.5 rounded-lg border outline-none resize-none placeholder:text-white/10"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        />
      </div>
      <ProceedButton onClick={() => setPhase('signature')} />
    </motion.div>
  );
}

// ─── PHASE 9: SIGNATURE ───
function SignaturePhase() {
  const setPhase = useAtelierStore((s) => s.setPhase);
  const brandName = useAtelierStore((s) => s.brandName);
  const tagline = useAtelierStore((s) => s.tagline);
  const template = useAtelierStore((s) => s.template);
  const material = useAtelierStore((s) => s.material);
  const palette = useAtelierStore((s) => s.palette);
  const typography = useAtelierStore((s) => s.typography);
  const animationStyle = useAtelierStore((s) => s.animationStyle);
  const layoutStyle = useAtelierStore((s) => s.layoutStyle);
  const modules = useAtelierStore((s) => s.modules);
  const activeModules = modules.filter((m) => m.active);

  const rows = [
    ['BRAND', brandName || '—'],
    ['TAGLINE', tagline || '—'],
    ['ARCHETIPO', templates.find((t) => t.id === template)?.name || '—'],
    ['MATERIALE', materials.find((m) => m.id === material)?.name || '—'],
    ['CROMIA', palettes.find((p) => p.id === palette)?.name || '—'],
    ['TIPOGRAFIA', typographyPairs.find((t) => t.id === typography)?.display || '—'],
    ['ANIMAZIONE', animationStyles.find((a) => a.id === animationStyle)?.name || '—'],
    ['LAYOUT', layoutStyles.find((l) => l.id === layoutStyle)?.name || '—'],
  ];

  return (
    <motion.div className="space-y-3" {...phaseTransition}>
      <PhaseHeader number="09" title="LA FIRMA" subtitle="Riepilogo" />
      <div className="p-2.5 rounded-xl space-y-1.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        {rows.map(([label, value], i) => (
          <div key={i}>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-[6px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</span>
              <span className="text-[8px] tracking-[0.1em] text-right max-w-[55%] truncate">{value}</span>
            </div>
            {i < rows.length - 1 && <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.03)' }} />}
          </div>
        ))}
      </div>
      {activeModules.length > 0 && (
        <div className="p-2.5 rounded-xl" style={{ background: 'rgba(217,119,87,0.03)', border: '1px solid rgba(217,119,87,0.08)' }}>
          <p className="text-[6px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>MODULI ({activeModules.length})</p>
          {activeModules.map((m) => (
            <p key={m.id} className="text-[7px] py-0.5" style={{ color: '#D97757' }}>◆ {m.name}</p>
          ))}
        </div>
      )}
      <motion.button
        onClick={() => setPhase('finale')}
        className="w-full py-3 text-[10px] tracking-[0.3em] uppercase rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(217,119,87,0.15), rgba(217,119,87,0.05))',
          border: '1px solid rgba(217,119,87,0.3)',
          color: '#D97757',
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        INIZIALIZZA PROGETTO
      </motion.button>
    </motion.div>
  );
}

// ─── FINALE ───
function FinaleOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.95) 0%, rgba(0,0,0,0.98) 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="text-center max-w-lg mx-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="w-16 h-[1px] mx-auto mb-10" style={{ background: 'linear-gradient(90deg, transparent, #D97757, transparent)' }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1.5 }} />
        <h2 className="text-3xl md:text-4xl font-medium mb-6 leading-[1.2]" style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}>La Tua Visione è Pronta.</h2>
        <p className="text-[11px] tracking-[0.1em] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Un'opera di questo calibro richiede una direzione artistica dedicata.</p>
        <p className="text-sm mb-10" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>Il valore di partenza per le nostre creazioni su misura è di <strong>5.000€</strong>.</p>
        <motion.a
          href="mailto:info@intinisystem.digital?subject=Richiesta%20Accesso%20-%20L'Atelier"
          className="inline-block px-10 py-4 text-[10px] tracking-[0.35em] uppercase transition-all duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(217,119,87,0.2), rgba(217,119,87,0.05))', border: '1px solid rgba(217,119,87,0.4)', color: '#D97757' }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(217,119,87,0.15)' }}
          whileTap={{ scale: 0.98 }}
        >
          RICHIEDI ACCESSO E CALL PRIVATA
        </motion.a>
        <p className="text-[8px] tracking-[0.2em] uppercase mt-8" style={{ color: 'rgba(255,255,255,0.12)' }}>INTINI SYSTEM DIGITAL · MONACO · DUBAI · MILANO</p>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN HUD (Sidebar) ───
interface AtelierHUDProps {
  locked?: boolean;
  onUnlockClick?: () => void;
}

const AtelierHUD = ({ locked = false, onUnlockClick }: AtelierHUDProps) => {
  const phase = useAtelierStore((s) => s.phase);
  const setPhase = useAtelierStore((s) => s.setPhase);
  const sidebarTab = useEditorStore((s) => s.sidebarTab);
  const setSidebarTab = useEditorStore((s) => s.setSidebarTab);

  if (phase === 'finale' && !locked) return <FinaleOverlay />;

  const tabs = [
    { id: 'phases' as const, label: 'FASI', icon: Sliders },
    { id: 'layers' as const, label: 'LIVELLI', icon: Layers },
    { id: 'properties' as const, label: 'PROPRIETÀ', icon: Settings2 },
  ];

  return (
    <div
      className="w-[360px] h-screen flex flex-col shrink-0"
      style={{
        background: 'rgba(8,8,8,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: '#D97757' }}>
          INTINI SYSTEM DIGITAL
        </p>

        {/* Tab switcher */}
        <div className="flex gap-0.5 mb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = sidebarTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[7px] tracking-[0.15em] uppercase transition-all"
                style={{
                  background: active ? 'rgba(217,119,87,0.1)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(217,119,87,0.2)' : 'rgba(255,255,255,0.03)'}`,
                  color: active ? '#D97757' : 'rgba(255,255,255,0.25)',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <Icon size={11} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Phase nav — only visible in phases tab */}
        {sidebarTab === 'phases' && (
          <div className="flex flex-wrap gap-x-1 gap-y-0.5 pt-1">
            {allPhases.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => setPhase(p.id)}
                className="flex items-center gap-1 py-1 px-1.5 rounded transition-all"
                style={{
                  background: phase === p.id ? 'rgba(217,119,87,0.1)' : 'transparent',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <span className="text-[7px] font-mono" style={{ color: phase === p.id ? '#D97757' : 'rgba(255,255,255,0.15)' }}>{p.number}</span>
                <span className="text-[7px] tracking-[0.1em]" style={{ color: phase === p.id ? '#ffffff' : 'rgba(255,255,255,0.2)' }}>{p.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: 'none' }}>
        {locked && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer"
            style={{ background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={onUnlockClick}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97757" strokeWidth="1" className="mb-3 opacity-60">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#D97757' }}>SBLOCCA PER CONFIGURARE</p>
          </motion.div>
        )}

        <div style={{ filter: locked ? 'blur(2px)' : 'none', pointerEvents: locked ? 'none' : 'auto' }}>
          <AnimatePresence mode="wait">
            {sidebarTab === 'phases' && (
              <motion.div key="phases" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {phase === 'identity' && <IdentityPhase key="identity" />}
                {phase === 'template' && <TemplatePhase key="template" />}
                {phase === 'essence' && <EssencePhase key="essence" />}
                {phase === 'palette' && <PalettePhase key="palette" />}
                {phase === 'typography' && <TypographyPhase key="typography" />}
                {phase === 'animations' && <AnimationsPhase key="animations" />}
                {phase === 'layout' && <LayoutPhase key="layout" />}
                {phase === 'arsenal' && <ArsenalPhase key="arsenal" />}
                {phase === 'signature' && <SignaturePhase key="signature" />}
              </motion.div>
            )}
            {sidebarTab === 'layers' && (
              <motion.div key="layers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LayerTree />
              </motion.div>
            )}
            {sidebarTab === 'properties' && (
              <motion.div key="properties" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PropertyEditor />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AtelierHUD;

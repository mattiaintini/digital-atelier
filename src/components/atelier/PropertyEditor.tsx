import { motion } from 'framer-motion';
import { useEditorStore, ElementOverrides } from '@/stores/editorStore';

const EMPTY_OVERRIDES = Object.freeze({}) as ElementOverrides;

const PropertyEditor = () => {
  const selectedId = useEditorStore((s) => s.selectedElementId);
  const elements = useEditorStore((s) => s.elements);
  const overrides = useEditorStore((s) => (selectedId ? s.overrides[selectedId] : undefined) ?? EMPTY_OVERRIDES);
  const updateOverride = useEditorStore((s) => s.updateOverride);
  const setSelected = useEditorStore((s) => s.setSelectedElement);

  const element = elements.find((e) => e.id === selectedId);

  if (!selectedId || !element) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[14px]" style={{ color: 'rgba(255,255,255,0.15)' }}>⊡</span>
        </div>
        <p className="text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Seleziona un elemento
        </p>
        <p className="text-[7px] mt-1" style={{ color: 'rgba(255,255,255,0.1)' }}>
          Clicca su un elemento nell'anteprima
        </p>
      </div>
    );
  }

  const update = (key: string, value: any) => {
    updateOverride(selectedId, { [key]: value });
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={selectedId}
    >
      {/* Element info header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: '#D97757' }}>{element.label}</p>
          <p className="text-[7px] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>Tipo: {element.type}</p>
        </div>
        <button
          onClick={() => setSelected(null)}
          className="text-[8px] px-2 py-1 rounded"
          style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          ✕
        </button>
      </div>

      <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.05)' }} />

      {/* Text properties */}
      {(element.type === 'text' || element.type === 'button' || element.type === 'nav') && (
        <div className="space-y-3">
          <p className="text-[7px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>TIPOGRAFIA</p>

          <div>
            <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Dimensione Font</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={6}
                max={48}
                value={overrides.fontSize || 14}
                onChange={(e) => update('fontSize', Number(e.target.value))}
                className="flex-1 accent-[#D97757] h-1"
                style={{ accentColor: '#D97757' }}
              />
              <span className="text-[8px] font-mono w-8 text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {overrides.fontSize || 14}px
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Peso Font</label>
            <div className="flex gap-1">
              {['300', '400', '500', '600', '700'].map((w) => (
                <button
                  key={w}
                  onClick={() => update('fontWeight', w)}
                  className="flex-1 py-1 rounded text-[7px]"
                  style={{
                    background: (overrides.fontWeight || '400') === w ? 'rgba(217,119,87,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${(overrides.fontWeight || '400') === w ? 'rgba(217,119,87,0.3)' : 'rgba(255,255,255,0.05)'}`,
                    color: (overrides.fontWeight || '400') === w ? '#D97757' : 'rgba(255,255,255,0.25)',
                    fontWeight: w,
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Spaziatura Lettere</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={-2}
                max={10}
                step={0.5}
                value={overrides.letterSpacing ?? 0}
                onChange={(e) => update('letterSpacing', Number(e.target.value))}
                className="flex-1 h-1"
                style={{ accentColor: '#D97757' }}
              />
              <span className="text-[8px] font-mono w-8 text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {overrides.letterSpacing ?? 0}px
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Colore Testo</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={overrides.textColor || '#ffffff'}
                onChange={(e) => update('textColor', e.target.value)}
                className="w-6 h-6 rounded border-0 cursor-pointer"
                style={{ background: 'transparent' }}
              />
              <span className="text-[8px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {overrides.textColor || '#ffffff'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section/container properties */}
      {(element.type === 'section' || element.type === 'container' || element.type === 'image') && (
        <div className="space-y-3">
          <p className="text-[7px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>ASPETTO</p>

          <div>
            <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Colore Sfondo</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={overrides.backgroundColor || '#0a0a0a'}
                onChange={(e) => update('backgroundColor', e.target.value)}
                className="w-6 h-6 rounded border-0 cursor-pointer"
              />
              <span className="text-[8px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {overrides.backgroundColor || '#0a0a0a'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Bordo Arrotondato</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={32}
                value={overrides.borderRadius ?? 0}
                onChange={(e) => update('borderRadius', Number(e.target.value))}
                className="flex-1 h-1"
                style={{ accentColor: '#D97757' }}
              />
              <span className="text-[8px] font-mono w-8 text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {overrides.borderRadius ?? 0}px
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Padding</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={60}
                value={overrides.padding ?? 0}
                onChange={(e) => update('padding', Number(e.target.value))}
                className="flex-1 h-1"
                style={{ accentColor: '#D97757' }}
              />
              <span className="text-[8px] font-mono w-8 text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {overrides.padding ?? 0}px
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Opacity — for all types */}
      <div className="space-y-3">
        <p className="text-[7px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>GENERALE</p>
        <div>
          <label className="block text-[7px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Opacità</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={(overrides.opacity ?? 1) * 100}
              onChange={(e) => update('opacity', Number(e.target.value) / 100)}
              className="flex-1 h-1"
              style={{ accentColor: '#D97757' }}
            />
            <span className="text-[8px] font-mono w-8 text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {Math.round((overrides.opacity ?? 1) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyEditor;

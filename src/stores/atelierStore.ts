import { create } from 'zustand';

export type MaterialType = 'obsidian' | 'frosted-glass' | 'gold' | 'marble' | 'carbon' | 'holographic';
export type Phase =
  | 'identity' | 'template' | 'essence' | 'palette' | 'typography'
  | 'animations' | 'layout' | 'arsenal' | 'signature' | 'finale';

export interface AtelierModule {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  tags: string[];
  previewGradient: string;
}

export interface PaletteOption {
  id: string;
  name: string;
  colors: string[];
  mood: string;
}

export interface TypographyPair {
  id: string;
  display: string;
  body: string;
  displayFont: string;
  bodyFont: string;
  preview: string;
}

export interface AnimationStyle {
  id: string;
  name: string;
  description: string;
  intensity: string;
}

export interface LayoutStyle {
  id: string;
  name: string;
  description: string;
  columns: string;
}

interface AtelierState {
  phase: Phase;
  brandName: string;
  tagline: string;
  template: string;
  material: MaterialType;
  palette: string;
  typography: string;
  animationStyle: string;
  layoutStyle: string;
  modules: AtelierModule[];
  notes: string;
  hasAccess: boolean;
  email: string;

  setPhase: (phase: Phase) => void;
  setBrandName: (name: string) => void;
  setTagline: (tagline: string) => void;
  setTemplate: (template: string) => void;
  setMaterial: (material: MaterialType) => void;
  setPalette: (palette: string) => void;
  setTypography: (typography: string) => void;
  setAnimationStyle: (style: string) => void;
  setLayoutStyle: (style: string) => void;
  toggleModule: (id: string) => void;
  setNotes: (notes: string) => void;
  setHasAccess: (access: boolean) => void;
  setEmail: (email: string) => void;
}

export const templates: TemplateOption[] = [
  { id: 'maison', name: 'LA MAISON', description: 'Portfolio d\'autore con scroll narrativo e galleria immersiva full-bleed', tags: ['LUXURY', 'PORTFOLIO', 'NARRATIVO'], previewGradient: 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #0a0a0a)' },
  { id: 'vitrine', name: 'LA VITRINE', description: 'E-commerce d\'élite con product viewer 3D e checkout cinematografico', tags: ['E-COMMERCE', '3D', 'PRODOTTO'], previewGradient: 'linear-gradient(135deg, #1a0a0a, #2e1a1a, #0a0a0a)' },
  { id: 'salon', name: 'IL SALONE', description: 'Landing page conversazionale con sezioni animate e form immersivo', tags: ['LANDING', 'CONVERSIONE', 'MINIMAL'], previewGradient: 'linear-gradient(135deg, #0a1a0a, #1a2e1a, #0a0a0a)' },
  { id: 'galleria', name: 'LA GALLERIA', description: 'Showcase fotografico orizzontale con transizioni fluide tra progetti', tags: ['FOTOGRAFIA', 'ORIZZONTALE', 'ARTE'], previewGradient: 'linear-gradient(135deg, #0a0a1a, #1a1a3e, #0a0a0a)' },
  { id: 'attico', name: "L'ATTICO", description: 'Sito corporate multi-pagina con dashboard interna e area riservata', tags: ['CORPORATE', 'MULTI-PAGINA', 'DASHBOARD'], previewGradient: 'linear-gradient(135deg, #1a1a0a, #2e2e1a, #0a0a0a)' },
  { id: 'bespoke', name: 'SU MISURA', description: 'Architettura completamente personalizzata — nessun template, solo la tua visione', tags: ['CUSTOM', 'ILLIMITATO', 'UNICO'], previewGradient: 'linear-gradient(135deg, #D9775715, #0a0a0a, #D9775710)' },
];

export const palettes: PaletteOption[] = [
  { id: 'vantablack', name: 'VANTABLACK', colors: ['#000000', '#0a0a0a', '#1a1a1a', '#d4a574', '#ffffff'], mood: 'Lusso estremo · Minimalismo assoluto' },
  { id: 'arctic', name: 'ARCTIC NOIR', colors: ['#0d1117', '#161b22', '#21262d', '#c9d1d9', '#f0f6fc'], mood: 'Tech premium · Eleganza nordica' },
  { id: 'terracotta', name: 'TERRACOTTA', colors: ['#1a0e0a', '#2d1810', '#8b4513', '#d2691e', '#faebd7'], mood: 'Calore organico · Artigianato' },
  { id: 'royal', name: 'ROYAL MIDNIGHT', colors: ['#0a0a1a', '#1a1a3e', '#2e2e6e', '#7b68ee', '#e8e4f0'], mood: 'Autorevolezza · Prestigio' },
  { id: 'emerald', name: 'EMERALD VAULT', colors: ['#0a1a0a', '#0d2818', '#1a5632', '#2ecc71', '#ecf0f1'], mood: 'Natura · Rinascita · Crescita' },
  { id: 'monochrome', name: 'MONOCROMO ASSOLUTO', colors: ['#000000', '#333333', '#666666', '#999999', '#ffffff'], mood: 'Purezza tipografica · Senza tempo' },
  { id: 'champagne', name: 'CHAMPAGNE & NOIR', colors: ['#050505', '#1a1510', '#d4a574', '#e8c99b', '#faf0e6'], mood: 'Alta moda · Celebrazione' },
  { id: 'crimson', name: 'CRIMSON SILK', colors: ['#0a0505', '#1a0a0a', '#8b0000', '#dc143c', '#f5f5f5'], mood: 'Passione · Audacia · Potere' },
];

export const typographyPairs: TypographyPair[] = [
  { id: 'classic', display: 'Cormorant Garamond', body: 'Inter', displayFont: "'Cormorant Garamond', serif", bodyFont: "'Inter', sans-serif", preview: 'Eleganza classica con leggibilità contemporanea' },
  { id: 'editorial', display: 'Playfair Display', body: 'Source Sans 3', displayFont: "'Playfair Display', serif", bodyFont: "'Source Sans 3', sans-serif", preview: 'Stile editoriale — raffinato e autorevole' },
  { id: 'brutalist', display: 'Space Grotesk', body: 'JetBrains Mono', displayFont: "'Space Grotesk', sans-serif", bodyFont: "'JetBrains Mono', monospace", preview: 'Brutalismo digitale — tecnico e d\'impatto' },
  { id: 'swiss', display: 'Helvetica Neue', body: 'Helvetica Neue', displayFont: "'Helvetica Neue', Arial, sans-serif", bodyFont: "'Helvetica Neue', Arial, sans-serif", preview: 'Scuola svizzera — pulizia assoluta' },
  { id: 'contrast', display: 'Bodoni Moda', body: 'DM Sans', displayFont: "'Bodoni Moda', serif", bodyFont: "'DM Sans', sans-serif", preview: 'Alto contrasto — drammatico e memorabile' },
  { id: 'organic', display: 'Libre Baskerville', body: 'Nunito Sans', displayFont: "'Libre Baskerville', serif", bodyFont: "'Nunito Sans', sans-serif", preview: 'Calore artigianale — accogliente e sofisticato' },
];

export const animationStyles: AnimationStyle[] = [
  { id: 'cinematic', name: 'CINEMATOGRAFICO', description: 'Parallasse profondo, reveal al scroll con timing da film. Effetti camera con profondità di campo.', intensity: 'ALTO' },
  { id: 'fluid', name: 'FLUIDO ORGANICO', description: 'Transizioni liquide, morphing, curve di Bézier morbide. Tutto scorre come seta.', intensity: 'MEDIO-ALTO' },
  { id: 'precise', name: 'PRECISIONE CHIRURGICA', description: 'Micro-animazioni calibrate al millisecondo. Niente di superfluo, ogni frame ha uno scopo.', intensity: 'MEDIO' },
  { id: 'immersive', name: 'IMMERSIONE TOTALE', description: 'WebGL, particelle, shader custom. Il sito è un\'opera d\'arte interattiva.', intensity: 'MASSIMO' },
  { id: 'subtle', name: 'SUSSURRO ELEGANTE', description: 'Animazioni quasi impercettibili. La maestria si nasconde nella sottigliezza.', intensity: 'BASSO' },
];

export const layoutStyles: LayoutStyle[] = [
  { id: 'fullbleed', name: 'FULL-BLEED IMMERSIVO', description: 'Contenuti edge-to-edge, immagini a tutto schermo, scroll verticale drammatico', columns: '1' },
  { id: 'editorial', name: 'GRIGLIA EDITORIALE', description: 'Layout a colonne asimmetrico, mix di testo e visual come una rivista d\'alta moda', columns: '2-3' },
  { id: 'bento', name: 'BENTO GRID', description: 'Griglia modulare stile Apple con card di dimensioni variabili e contenuti densi', columns: '3-4' },
  { id: 'horizontal', name: 'SCROLL ORIZZONTALE', description: 'Navigazione laterale cinematografica, ideale per portfolio e showcase sequenziali', columns: 'H' },
  { id: 'split', name: 'SPLIT SCREEN', description: 'Due pannelli affiancati con contenuti sincronizzati — uno visual, uno testuale', columns: '2' },
  { id: 'freeform', name: 'COMPOSIZIONE LIBERA', description: 'Posizionamento assoluto, sovrapposizioni, rotazioni. Layout come opera d\'arte astratta.', columns: '∞' },
];

const defaultModules: AtelierModule[] = [
  { id: 'ecommerce', name: 'E-COMMERCE IMMERSIVO 3D', description: 'Catalogo prodotti con viewer 3D integrato e checkout cinematografico', active: false },
  { id: 'ai-concierge', name: 'PORTIERATO AI INTEGRATO', description: 'Assistente artificiale conversazionale con personalità su misura', active: false },
  { id: 'parallax', name: 'SCROLL CINEMATOGRAFICO PARALLASSE', description: 'Navigazione narrativa con profondità e movimenti di camera', active: false },
  { id: 'analytics', name: 'INTELLIGENCE DASHBOARD', description: 'Analytics avanzati con heatmap e comportamento utente in tempo reale', active: false },
  { id: 'multilang', name: 'ARCHITETTURA MULTILINGUA', description: 'Localizzazione professionale con routing geografico automatico', active: false },
  { id: 'cms', name: 'CMS HEADLESS ENTERPRISE', description: 'Gestione contenuti decentralizzata con API GraphQL', active: false },
  { id: 'booking', name: 'SISTEMA PRENOTAZIONI', description: 'Calendario integrato con pagamento e conferma automatica', active: false },
  { id: 'video', name: 'VIDEO HERO GENERATIVO', description: 'Background video con shader personalizzati e transizioni dinamiche', active: false },
  { id: 'members', name: 'AREA MEMBRI ESCLUSIVA', description: 'Sezione riservata con login, contenuti premium e community', active: false },
  { id: 'seo', name: 'SEO ARCHITETTURA AVANZATA', description: 'Schema markup, sitemap dinamica, Core Web Vitals ottimizzati', active: false },
];

export const useAtelierStore = create<AtelierState>((set) => ({
  phase: 'identity',
  brandName: '',
  tagline: '',
  template: '',
  material: 'obsidian',
  palette: 'vantablack',
  typography: 'classic',
  animationStyle: 'cinematic',
  layoutStyle: 'fullbleed',
  modules: defaultModules,
  notes: '',
  hasAccess: false,
  email: '',

  setPhase: (phase) => set({ phase }),
  setBrandName: (brandName) => set({ brandName }),
  setTagline: (tagline) => set({ tagline }),
  setTemplate: (template) => set({ template }),
  setMaterial: (material) => set({ material }),
  setPalette: (palette) => set({ palette }),
  setTypography: (typography) => set({ typography }),
  setAnimationStyle: (animationStyle) => set({ animationStyle }),
  setLayoutStyle: (layoutStyle) => set({ layoutStyle }),
  toggleModule: (id) =>
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === id ? { ...m, active: !m.active } : m
      ),
    })),
  setNotes: (notes) => set({ notes }),
  setHasAccess: (hasAccess) => set({ hasAccess }),
  setEmail: (email) => set({ email }),
}));

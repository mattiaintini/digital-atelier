import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Lang } from '@/i18n/translations';

const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: 'it', label: 'Italiano', native: 'Benvenuto' },
  { code: 'en', label: 'English', native: 'Welcome' },
  { code: 'fr', label: 'Français', native: 'Bienvenue' },
  { code: 'de', label: 'Deutsch', native: 'Willkommen' },
];

const LanguageGate = () => {
  const { langChosen, setLang } = useLanguage();

  return (
    <AnimatePresence>
      {!langChosen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background: 'rgba(2,2,2,0.97)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-10 md:gap-12 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Brand mark */}
            <div className="text-center mb-2">
              <p
                className="text-[10px] md:text-xs tracking-[0.5em] uppercase mb-3"
                style={{ color: 'rgba(217,119,87,0.55)', fontFamily: 'var(--font-body)' }}
              >
                INTINI WEB ATELIER
              </p>
              <div
                className="w-12 h-px mx-auto"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,87,0.3), transparent)' }}
              />
            </div>

            {/* Prompt */}
            <p
              className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-center"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
            >
              Select Your Language
            </p>

            {/* Language buttons */}
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[280px]">
              {LANGUAGES.map((l, i) => (
                <motion.button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="group relative w-full py-4 md:py-5 overflow-hidden min-h-[56px] flex items-center justify-center"
                  style={{
                    background: 'transparent',
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    background: 'rgba(217,119,87,0.04)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover shine line */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(217,119,87,0.03) 50%, transparent 100%)',
                    }}
                  />
                  <div className="relative flex flex-col items-center gap-0.5">
                    <span
                      className="text-sm md:text-base tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-[#D97757]"
                      style={{
                        color: 'rgba(255,255,255,0.8)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                      }}
                    >
                      {l.label}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase transition-colors duration-300"
                      style={{
                        color: 'rgba(217,119,87,0.5)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                      }}
                    >
                      {l.native}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Bottom accent */}
            <div
              className="w-8 h-px mt-4"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,87,0.2), transparent)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageGate;

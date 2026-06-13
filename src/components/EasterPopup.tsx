import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface EasterPopupProps {
  onGetDiscount: () => void;
}

const EasterPopup = ({ onGetDiscount }: EasterPopupProps) => {
  const [open, setOpen] = useState(false);
  const { t, langChosen } = useLanguage();

  useEffect(() => {
    if (!langChosen) return;
    const dismissed = sessionStorage.getItem('easter26_v2_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 6000);
      return () => clearTimeout(timer);
    }
  }, [langChosen]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem('easter26_v2_dismissed', '1');
  };

  const handleGetDiscount = () => {
    close();
    setTimeout(() => onGetDiscount(), 300);
  };

  const e = t.easter;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={close}
          />
          <motion.div
            className="relative z-10 w-full max-w-[280px] sm:max-w-xs p-4 sm:p-5 md:p-6 rounded-xl text-center mx-2"
            style={{
              background: 'linear-gradient(145deg, rgba(15,12,8,0.98), rgba(10,8,5,0.98))',
              border: '1px solid rgba(217,119,87,0.2)',
              boxShadow: '0 0 60px rgba(217,119,87,0.08)',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={close}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <X size={14} />
            </button>

            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🐣</div>

            <h2
              className="text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#D97757' }}
            >
              {e.title}
            </h2>

            <p
              className="text-[11px] sm:text-xs md:text-sm mb-1.5 sm:mb-2 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}
            >
              {e.desc} <strong style={{ color: '#D97757' }}>{e.bonus}</strong>.
            </p>

            <div
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mb-2 sm:mb-3"
              style={{
                background: 'rgba(217,119,87,0.08)',
                border: '1px solid rgba(217,119,87,0.25)',
              }}
            >
              <p className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {e.codeLabel}
              </p>
              <p className="text-lg sm:text-xl font-bold tracking-widest" style={{ color: '#D97757', fontFamily: 'var(--font-display)' }}>
                EASTER26
              </p>
            </div>

            <p
              className="text-[9px] sm:text-[10px] mb-3 sm:mb-4 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}
            >
              {e.discountText} <strong style={{ color: '#D97757' }}>{e.discountValue}</strong> {e.discountSuffix}
              <br />
              <span className="text-[8px] sm:text-[9px] tracking-wider uppercase mt-1 inline-block" style={{ color: 'rgba(217,119,87,0.5)' }}>
                {e.validity}
              </span>
            </p>

            <motion.button
              onClick={handleGetDiscount}
              className="w-full py-2.5 sm:py-3 rounded-full text-[8px] sm:text-[9px] tracking-[0.25em] uppercase min-h-[44px]"
              style={{
                background: 'linear-gradient(135deg, rgba(217,119,87,0.2), rgba(217,119,87,0.08))',
                border: '1px solid rgba(217,119,87,0.5)',
                color: '#D97757',
                boxShadow: '0 0 30px rgba(217,119,87,0.1)',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(217,119,87,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              {e.cta}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterPopup;

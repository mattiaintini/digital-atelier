import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-2xl md:text-3xl text-center mb-8 md:mb-12"
          style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}
        >
          {t.faq.title}
        </h2>
        <div className="space-y-2">
          {t.faq.items.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <button
                onClick={() => setOpenId(openId === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left min-h-[48px]"
              >
                <span className="text-sm pr-4" style={{ color: openId === i ? '#d4a574' : 'rgba(255,255,255,0.7)' }}>
                  {faq.question}
                </span>
                <motion.div animate={{ rotate: openId === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

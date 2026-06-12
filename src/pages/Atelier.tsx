import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtelierStore } from '@/stores/atelierStore';
import { supabase } from '@/integrations/supabase/client';
import AtelierHUD from '@/components/atelier/AtelierHUD';
import AtelierPaywall from '@/components/atelier/AtelierPaywall';
import LiveSitePreview from '@/components/atelier/LiveSitePreview';

const Atelier = () => {
  const [searchParams] = useSearchParams();
  const hasAccess = useAtelierStore((s) => s.hasAccess);
  const setHasAccess = useAtelierStore((s) => s.setHasAccess);
  const setEmail = useAtelierStore((s) => s.setEmail);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const access = searchParams.get('access');
    const email = searchParams.get('email');
    if (access === 'granted' && email) {
      supabase
        .rpc('check_atelier_access', { _email: email })
        .then(({ data }) => {
          if (data === true) {
            setHasAccess(true);
            setEmail(email);
          }
        });
    }
  }, [searchParams, setHasAccess, setEmail]);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#050505' }}>
      {/* Sidebar — fixed width, full height, scroll inside */}
      <AtelierHUD locked={false} onUnlockClick={() => setShowPaywall(true)} />

      {/* Main canvas area — live preview */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <LiveSitePreview />

        {/* Bottom status bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D97757' }} />
            <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
              CANVAS ATTIVO
            </span>
          </div>
          <div className="w-[1px] h-3" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="text-[8px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>INTINI.SYS.DIG v4.0</span>
        </div>
      </div>

      {/* Lock overlay */}
      <AnimatePresence>
        {!hasAccess && !showPaywall && (
          <motion.div
            key="lock-banner"
            className="fixed bottom-0 left-0 right-0 z-40 flex items-end justify-center pb-20 pointer-events-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setShowPaywall(true)}
              className="pointer-events-auto px-10 py-4 text-[10px] tracking-[0.35em] uppercase rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(217,119,87,0.15), rgba(217,119,87,0.05))',
                border: '1px solid rgba(217,119,87,0.4)',
                color: '#D97757',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 60px rgba(217,119,87,0.1)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 80px rgba(217,119,87,0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              SBLOCCA L'ATELIER — €9,90
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paywall modal */}
      <AnimatePresence>
        {showPaywall && !hasAccess && (
          <motion.div
            key="paywall-overlay"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
              onClick={() => setShowPaywall(false)}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <AtelierPaywall />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Atelier;

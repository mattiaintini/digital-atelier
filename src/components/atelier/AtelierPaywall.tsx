import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAtelierStore } from '@/stores/atelierStore';

const AtelierPaywall = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const setHasAccess = useAtelierStore((s) => s.setHasAccess);
  const setStoreEmail = useAtelierStore((s) => s.setEmail);

  const checkAccess = async () => {
    if (!email) return;
    setChecking(true);
    const { data } = await supabase
      .rpc('check_atelier_access', { _email: email });

    if (data === true) {
      setStoreEmail(email);
      setHasAccess(true);
    } else {
      handleCheckout();
    }
    setChecking(false);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-atelier-checkout', {
        body: {
          email,
          successUrl: `${window.location.origin}/atelier?access=granted&email=${encodeURIComponent(email)}`,
          cancelUrl: `${window.location.origin}/atelier`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative flex items-center justify-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <motion.div
        className="relative max-w-lg w-full mx-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top accent line */}
        <motion.div
          className="w-12 h-[1px] mx-auto mb-10"
          style={{ background: 'linear-gradient(90deg, transparent, #D97757, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />

        <p className="text-center tracking-[0.4em] text-[10px] uppercase mb-3" style={{ color: '#D97757' }}>
          INTINI SYSTEM DIGITAL
        </p>

        <h1
          className="text-center text-4xl md:text-5xl font-light mb-4 leading-[1.1]"
          style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}
        >
          L'Atelier
        </h1>

        <p className="text-center text-xs tracking-[0.2em] uppercase mb-12" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Configuratore d'Élite Immersivo
        </p>

        <div className="relative p-8 rounded-2xl" style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(40px)',
        }}>
          <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            EMAIL DI ACCESSO
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@dominio.com"
            className="w-full bg-transparent text-white text-sm py-3 border-b outline-none transition-colors duration-300 placeholder:text-white/15"
            style={{ borderColor: email ? '#D97757' : 'rgba(255,255,255,0.1)' }}
            onKeyDown={(e) => e.key === 'Enter' && checkAccess()}
          />

          <div className="flex items-center justify-between mt-8">
            <div>
              <p className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                €9<span className="text-base">,90</span>
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                ACCESSO SINGOLO
              </p>
            </div>

            <motion.button
              onClick={checkAccess}
              disabled={!email || loading || checking}
              className="relative px-8 py-3 text-[10px] tracking-[0.3em] uppercase overflow-hidden disabled:opacity-30 transition-opacity"
              style={{
                border: '1px solid rgba(217,119,87,0.4)',
                color: '#D97757',
                background: 'rgba(217,119,87,0.05)',
              }}
              whileHover={{ scale: 1.02, background: 'rgba(217,119,87,0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              {loading || checking ? (
                <span className="inline-block animate-pulse">PROCESSANDO...</span>
              ) : (
                'INIZIALIZZA'
              )}
            </motion.button>
          </div>
        </div>

        <p className="text-center text-[9px] mt-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Pagamento sicuro via Stripe · Accesso immediato all'esperienza completa
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AtelierPaywall;

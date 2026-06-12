import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setIsRecovery(true);
    }
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setIsRecovery(true);
    });
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Minimo 6 caratteri'); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Password aggiornata');
    navigate('/auth');
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)' }}>Link non valido o scaduto.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
      <motion.div className="w-full max-w-sm p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl text-center mb-8" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>Nuova Password</h1>
        <form onSubmit={handleReset} className="space-y-4">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nuova password" className="w-full bg-transparent text-white text-sm py-2.5 px-3 rounded-lg outline-none" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
          <motion.button type="submit" disabled={loading} className="w-full py-3 rounded-lg text-[10px] tracking-[0.3em] uppercase" style={{ background: 'linear-gradient(135deg, rgba(217,119,87,0.2), rgba(217,119,87,0.08))', border: '1px solid rgba(217,119,87,0.4)', color: '#D97757' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {loading ? '...' : 'AGGIORNA PASSWORD'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

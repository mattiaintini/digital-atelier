import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('Email non valida'),
  password: z.string().min(6, 'Minimo 6 caratteri'),
});

const signupSchema = loginSchema.extend({
  displayName: z.string().trim().min(2, 'Minimo 2 caratteri').max(50),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        loginSchema.parse({ email, password });
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Accesso effettuato');
        navigate('/admin');
      } else {
        signupSchema.parse({ email, password, displayName });
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success('Controlla la tua email per confermare la registrazione');
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error(err.message || 'Errore');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
      <motion.div
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          className="text-2xl text-center mb-8"
          style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}
        >
          {isLogin ? 'Accedi' : 'Registrati'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[9px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                NOME
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-transparent text-white text-sm py-2.5 px-3 rounded-lg outline-none transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                placeholder="Il tuo nome"
              />
            </div>
          )}
          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white text-sm py-2.5 px-3 rounded-lg outline-none transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="email@esempio.com"
            />
          </div>
          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white text-sm py-2.5 px-3 rounded-lg outline-none transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="••••••••"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-[10px] tracking-[0.3em] uppercase transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(217,119,87,0.2), rgba(217,119,87,0.08))',
              border: '1px solid rgba(217,119,87,0.4)',
              color: '#D97757',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? '...' : isLogin ? 'ACCEDI' : 'REGISTRATI'}
          </motion.button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-center text-[10px] tracking-[0.15em]"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
        </button>
      </motion.div>
    </div>
  );
};

export default Auth;

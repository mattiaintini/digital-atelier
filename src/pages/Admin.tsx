import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Mail, MailOpen, HelpCircle, Trash2, Plus, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  position: number;
  is_active: boolean;
}

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'messages' | 'faq'>('messages');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // New FAQ form
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate('/auth'); return; }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin');

    if (!roles || roles.length === 0) {
      toast.error('Accesso non autorizzato');
      navigate('/');
      return;
    }

    setIsAdmin(true);
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    const [subRes, faqRes] = await Promise.all([
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('faq').select('*').order('position'),
    ]);
    if (subRes.data) setSubmissions(subRes.data);
    if (faqRes.data) setFaqs(faqRes.data);
    setLoading(false);
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    await supabase.from('contact_submissions').update({ is_read: !currentRead }).eq('id', id);
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, is_read: !currentRead } : s));
  };

  const addFaq = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) { toast.error('Compila tutti i campi'); return; }
    const { error } = await supabase.from('faq').insert({
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      position: faqs.length,
    });
    if (error) { toast.error('Errore'); return; }
    toast.success('FAQ aggiunta');
    setNewQuestion(''); setNewAnswer('');
    loadData();
  };

  const toggleFaqActive = async (id: string, active: boolean) => {
    await supabase.from('faq').update({ is_active: !active }).eq('id', id);
    setFaqs((prev) => prev.map((f) => f.id === id ? { ...f, is_active: !active } : f));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!isAdmin) return null;

  const unreadCount = submissions.filter((s) => !s.is_read).length;
  const inputStyle = { border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' };

  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h1 className="text-lg" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg" style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
            Sito
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg" style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <LogOut size={10} /> Esci
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-6 pt-4">
        {[
          { id: 'messages' as const, label: 'MESSAGGI', icon: Mail, badge: unreadCount },
          { id: 'faq' as const, label: 'FAQ', icon: HelpCircle },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[9px] tracking-[0.2em] uppercase transition-all"
            style={{
              background: tab === t.id ? 'rgba(217,119,87,0.08)' : 'transparent',
              border: `1px solid ${tab === t.id ? 'rgba(217,119,87,0.25)' : 'rgba(255,255,255,0.06)'}`,
              color: tab === t.id ? '#D97757' : 'rgba(255,255,255,0.3)',
            }}
          >
            <t.icon size={12} /> {t.label}
            {t.badge ? (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[7px]" style={{ background: '#D97757', color: '#000' }}>{t.badge}</span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <p className="text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>Caricamento...</p>
        ) : tab === 'messages' ? (
          <div className="space-y-2">
            {submissions.length === 0 ? (
              <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>Nessun messaggio</p>
            ) : submissions.map((sub) => (
              <motion.div
                key={sub.id}
                className="p-4 rounded-xl"
                style={{
                  background: sub.is_read ? 'rgba(255,255,255,0.02)' : 'rgba(217,119,87,0.04)',
                  border: `1px solid ${sub.is_read ? 'rgba(255,255,255,0.05)' : 'rgba(217,119,87,0.15)'}`,
                }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#fff' }}>{sub.name}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{sub.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
                      {new Date(sub.created_at).toLocaleDateString('it-IT')}
                    </span>
                    <button onClick={() => toggleRead(sub.id, sub.is_read)} title={sub.is_read ? 'Segna come non letto' : 'Segna come letto'}>
                      {sub.is_read ? <MailOpen size={12} style={{ color: 'rgba(255,255,255,0.2)' }} /> : <Mail size={12} style={{ color: '#D97757' }} />}
                    </button>
                  </div>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub.message}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Add FAQ */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>NUOVA FAQ</p>
              <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Domanda" className="w-full text-white text-sm py-2 px-3 rounded-lg outline-none mb-2" style={inputStyle} />
              <textarea value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Risposta" rows={3} className="w-full text-white text-sm py-2 px-3 rounded-lg outline-none resize-none mb-2" style={inputStyle} />
              <motion.button onClick={addFaq} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[9px] tracking-[0.2em] uppercase" style={{ background: 'rgba(217,119,87,0.1)', border: '1px solid rgba(217,119,87,0.3)', color: '#D97757' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Plus size={10} /> AGGIUNGI
              </motion.button>
            </div>

            {/* FAQ List */}
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 rounded-xl flex items-start justify-between" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', opacity: faq.is_active ? 1 : 0.4 }}>
                <div className="flex-1 mr-4">
                  <p className="text-sm mb-1" style={{ color: '#fff' }}>{faq.question}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{faq.answer}</p>
                </div>
                <button onClick={() => toggleFaqActive(faq.id, faq.is_active)} className="text-[8px] tracking-[0.15em] uppercase px-2 py-1 rounded" style={{ border: '1px solid rgba(255,255,255,0.1)', color: faq.is_active ? '#D97757' : 'rgba(255,255,255,0.2)' }}>
                  {faq.is_active ? 'Attiva' : 'Disattiva'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

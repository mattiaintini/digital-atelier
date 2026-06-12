import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';
import { useLanguage } from '@/i18n/LanguageContext';
import LuxuryToast from '@/components/LuxuryToast';
import { Checkbox } from '@/components/ui/checkbox';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Inserisci il tuo nome').max(100),
  email: z.string().trim().email('Email non valida').max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.string().optional(),
  message: z.string().trim().min(1, 'Inserisci un messaggio').max(1000),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Devi accettare la privacy policy per inviare il messaggio.' }) }),
});

const GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxDsbg-SpF1Lv-zO_4KR7GgJRklTpseiC_LKg2qBmBMcFT3SZdr59lyzXUj_ts6rktS8Q/exec';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const { t } = useLanguage();
  const dismissToast = useCallback(() => setToastVisible(false), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ name, email, phone, service, message, privacy });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);

    await supabase.from('contact_submissions').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: `[Tel: ${parsed.data.phone || 'N/A'}] [Servizio: ${parsed.data.service || 'N/A'}] ${parsed.data.message}`,
    });

    try {
      const formData = new FormData();
      formData.append('name', parsed.data.name);
      formData.append('email', parsed.data.email);
      formData.append('phone', parsed.data.phone || '');
      formData.append('service', parsed.data.service || '');
      formData.append('message', parsed.data.message);
      formData.append('timestamp', new Date().toISOString());
      formData.append('source', 'contact_form');

      await fetch(GOOGLE_SHEETS_WEBHOOK, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
    } catch {
      // Google Sheets is best-effort
    }

    setLoading(false);
    setSuccess(true);
    setToastVisible(true);
    setName(''); setEmail(''); setPhone(''); setService(''); setMessage(''); setPrivacy(false);
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  const inputStyle = { border: '1px solid rgba(255,255,255,0.1)', background: 'transparent' };
  const labelClass = "block text-[8px] tracking-[0.3em] uppercase mb-1.5";
  const labelStyle = { color: 'rgba(255,255,255,0.78)' };
  const inputClass = "w-full text-white text-sm py-3 px-3 rounded-lg outline-none min-h-[44px]";

  return (
    <>
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }} onClick={handleClose} />
          <motion.div
            className="relative z-10 w-full max-w-md p-6 md:p-8 rounded-2xl max-h-[90vh] overflow-y-auto"
            style={{ background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
          >
            <button onClick={handleClose} className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <X size={16} />
            </button>

            {success ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#D97757' }} />
                <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  {t.contact.successDesc}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>{t.contact.title}</h2>
                <p className="text-[9px] tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  {t.contact.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className={labelClass} style={labelStyle}>{t.contact.nameLabel}</label>
                    <input type="text" name="nome" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.contact.namePlaceholder} className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>{t.contact.emailLabel}</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.contact.emailPlaceholder} className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>{t.contact.phoneLabel}</label>
                    <input type="tel" name="telefono" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.contact.phonePlaceholder} className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>{t.contact.serviceLabel}</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className={inputClass}
                      style={{ ...inputStyle, color: service ? '#fff' : 'rgba(255,255,255,0.3)' }}
                    >
                      <option value="" style={{ background: '#0a0a0a' }}>{t.contact.serviceDefault}</option>
                      <option value="base" style={{ background: '#0a0a0a' }}>Pacchetto Base</option>
                      <option value="intermedio" style={{ background: '#0a0a0a' }}>Pacchetto Intermedio</option>
                      <option value="completo" style={{ background: '#0a0a0a' }}>Pacchetto Completo</option>
                      <option value="social" style={{ background: '#0a0a0a' }}>Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>{t.contact.messageLabel}</label>
                    <textarea name="messaggio" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.contact.messagePlaceholder} rows={3} className="w-full text-white text-sm py-3 px-3 rounded-lg outline-none resize-none" style={inputStyle} />
                  </div>

                  {/* GDPR Privacy Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <Checkbox
                      id="privacy-consent"
                      checked={privacy}
                      onCheckedChange={(checked) => setPrivacy(checked === true)}
                      className="mt-0.5 border-white/20 data-[state=checked]:bg-[#D97757] data-[state=checked]:border-[#D97757]"
                    />
                    <label htmlFor="privacy-consent" className="text-[10px] leading-[1.6] cursor-pointer" style={{ color: 'rgba(255,255,255,0.82)' }}>
                      Ho letto e accetto l'<Link to="/privacy-policy" target="_blank" className="underline" style={{ color: '#D97757' }} onClick={(e) => e.stopPropagation()}>Informativa sulla Privacy</Link> ai sensi del Reg. UE 2016/679 (GDPR). *
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-lg text-[10px] tracking-[0.3em] uppercase min-h-[48px]"
                    style={{ background: 'linear-gradient(135deg, rgba(217,119,87,0.2), rgba(217,119,87,0.08))', border: '1px solid rgba(217,119,87,0.4)', color: '#D97757' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? t.contact.sending : t.contact.send}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <LuxuryToast visible={toastVisible} message={t.contact.success} onDismiss={dismissToast} />
    </>
  );
};

export default ContactModal;

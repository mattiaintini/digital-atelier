import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import logoWhite from '@/assets/logo-mi-white.png';

type Msg = { role: 'user' | 'assistant'; content: string };

const WHATSAPP = 'https://wa.me/393793386763';
const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const ChatWidget = () => {
  const { lang, t } = useLanguage();
  const c = t.chat;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: c.greeting }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [kbInset, setKbInset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset greeting when language changes and conversation has not started.
  useEffect(() => {
    setMessages((m) => (m.length <= 1 ? [{ role: 'assistant', content: c.greeting }] : m));
  }, [c.greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  // Keep the panel above the mobile keyboard so the input stays reachable.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      setKbInset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    };
    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', onResize);
    return () => {
      vv.removeEventListener('resize', onResize);
      vv.removeEventListener('scroll', onResize);
    };
  }, []);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch(FN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: ANON,
          Authorization: `Bearer ${ANON}`,
        },
        body: JSON.stringify({
          lang,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (res.status === 429) {
        setMessages((m) => [...m, { role: 'assistant', content: c.rate }]);
        return;
      }
      if (!res.ok) {
        setMessages((m) => [...m, { role: 'assistant', content: c.down }]);
        return;
      }
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || c.down }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: c.down }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed z-[95]"
      style={{
        bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
        right: 'calc(20px + env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? c.close : c.launcher}
        className="ml-auto flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full hover:scale-105 transition-transform"
        style={{ background: '#fff', color: '#000', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <circle cx="8.5" cy="12" r="0.8" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
              <circle cx="15.5" cy="12" r="0.8" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-sm font-semibold tracking-tight">{c.launcher}</span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            style={{
              background: 'rgba(10,10,10,0.97)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              ...(kbInset > 0
                ? { bottom: `${kbInset + 64}px`, maxHeight: `calc(100dvh - ${kbInset + 96}px)` }
                : {}),
            }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2.5rem)] sm:w-[380px] h-[70vh] max-h-[560px] flex flex-col rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="shrink-0 px-5 py-4 flex items-center gap-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <img src={logoWhite} alt="Intini Web Atelier" className="h-10 w-auto shrink-0 block" />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold tracking-tight leading-snug" style={{ color: '#fff' }}>{c.title}</p>
                <p className="text-xs flex items-center gap-1.5 mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-emerald-500" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="whitespace-nowrap">{c.status}</span>
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className="max-w-[85%] text-sm leading-relaxed rounded-2xl px-4 py-2.5"
                  style={
                    m.role === 'user'
                      ? { alignSelf: 'flex-end', background: '#fff', color: '#000', borderBottomRightRadius: 6 }
                      : { alignSelf: 'flex-start', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderBottomLeftRadius: 6 }
                  }
                >
                  {m.content}
                </div>
              ))}
              {busy && (
                <div className="self-start rounded-2xl px-4 py-3 flex gap-1.5" style={{ border: '1px solid rgba(255,255,255,0.15)', borderBottomLeftRadius: 6 }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'rgba(255,255,255,0.45)', animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'rgba(255,255,255,0.45)', animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'rgba(255,255,255,0.45)', animationDelay: '300ms' }} />
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="shrink-0 px-4 pb-2 flex flex-wrap gap-2">
                {c.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Quote CTA */}
            <div className="shrink-0 px-4 pb-2">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-xs font-medium py-2 rounded-full transition-colors"
                style={{ border: '1px solid rgba(217,119,87,0.35)', color: '#D97757' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(217,119,87,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(217,119,87,0.35)')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                {c.book}
              </a>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="shrink-0 p-3 flex items-center gap-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={c.placeholder}
                maxLength={1000}
                style={{ fontSize: '16px', color: '#fff' }}
                className="flex-1 bg-transparent px-3 py-2 focus:outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={c.send}
                className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full disabled:opacity-40 hover:scale-105 transition-transform"
                style={{ background: '#fff', color: '#000' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;

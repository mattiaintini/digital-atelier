import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, X } from 'lucide-react';

const FloatingButler = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed z-[95]"
      style={{
        bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        right: 'calc(24px + env(safe-area-inset-right, 0px))',
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <a
              href="https://wa.me/393345415707"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full text-[10px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(37,211,102,0.08)',
                border: '1px solid rgba(37,211,102,0.2)',
                color: '#25d366',
                backdropFilter: 'blur(20px)',
              }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <a
              href="mailto:intiniwebatelier@gmail.com"
              className="flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full text-[10px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(217,119,87,0.06)',
                border: '1px solid rgba(217,119,87,0.2)',
                color: '#D97757',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Mail size={14} />
              Email
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: open
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(217,119,87,0.08)',
          border: `1px solid ${open ? 'rgba(255,255,255,0.08)' : 'rgba(217,119,87,0.25)'}`,
          backdropFilter: 'blur(20px)',
          color: open ? 'rgba(255,255,255,0.5)' : '#D97757',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={17} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={17} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingButler;

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

interface LuxuryToastProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  duration?: number;
}

const LuxuryToast = ({ visible, message, onDismiss, duration = 4000 }: LuxuryToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-4 md:right-8 z-[100] max-w-xs"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
            style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 0 20px rgba(212,175,55,0.15), 0 8px 32px rgba(0,0,0,0.3)',
              border: 'none',
            }}
          >
            <CheckCircle size={16} style={{ color: '#D97757', flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px' }}>
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuxuryToast;

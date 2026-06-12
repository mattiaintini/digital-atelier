import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const FooterReveal = () => {
  const { t } = useLanguage();

  return (
    <footer
      className="relative z-10 px-4 md:px-16 py-8 md:py-12"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(217,119,87,0.02) 40%, rgba(217,119,87,0.04) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-center mb-6 md:mb-8">
          <div>
            <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(217,119,87,0.8)' }}>
              {t.footer.sartoria}
            </p>
            <p className="text-xs md:text-sm leading-[1.7]" style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              {t.footer.sartoriaDesc}
              <br />
              <a
                href="mailto:intiniwebatelier@gmail.com"
                className="transition-colors duration-300 mt-1 inline-block"
                style={{ color: 'rgba(255,255,255,0.78)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D97757')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.78)')}
              >
                intiniwebatelier@gmail.com
              </a>
            </p>
          </div>

          <div>
            <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(217,119,87,0.8)' }}>
              {t.footer.contatti}
            </p>
            <p className="text-xs md:text-sm leading-[1.7]" style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              <a
                href="https://wa.me/393345415707"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.78)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D97757')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.78)')}
              >
                +39 334 541 5707 · WhatsApp
              </a>
              <br />
              Torino, Italia
            </p>
          </div>

          <div>
            <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(217,119,87,0.8)' }}>
              {t.footer.datiLegali}
            </p>
            <p className="text-xs md:text-sm leading-[1.7]" style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              Mattia Intini · {t.footer.libero}
              <br />
              P.IVA 13419790012
            </p>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex justify-center gap-6 mb-4">
          <Link
            to="/privacy-policy"
            className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D97757')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Privacy Policy
          </Link>
          <Link
            to="/cookie-policy"
            className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D97757')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Cookie Policy
          </Link>
          <Link
            to="/termini-e-condizioni"
            className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D97757')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Termini e Condizioni
          </Link>
        </div>

        <div className="w-full" style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

        <p className="text-center pt-4 md:pt-5 text-[10px] md:text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
          © {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterReveal;

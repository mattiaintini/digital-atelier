import { useState, useCallback, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import WebGLBackground from '@/components/WebGLBackground';
import Hero3DScene from '@/components/Hero3DScene';
import HeroTitle from '@/components/HeroTitle';
import PortfolioSection from '@/components/PortfolioSection';

import FAQSection from '@/components/FAQSection';
import ContactModal from '@/components/ContactModal';
import FooterReveal from '@/components/FooterReveal';
import FloatingButler from '@/components/FloatingButler';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import Marquee from '@/components/Marquee';
import ParallaxElements from '@/components/ParallaxElements';
import ServicesSection from '@/components/ServicesSection';
import ScrollTransition from '@/components/ScrollTransition';

import LanguageGate from '@/components/LanguageGate';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { t } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setRevealed(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // Global scroll-triggered section reveals
  useEffect(() => {
    if (!revealed || !mainRef.current) return;
    const ctx = gsap.context(() => {
      const sections = mainRef.current!.querySelectorAll('.scroll-reveal-section');
      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0, duration: 1.6, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 90%', once: true },
          }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, [revealed]);

  const openContact = () => setContactOpen(true);

  return (
    <>
      <LanguageGate />
      <Preloader onComplete={handlePreloaderComplete} />
      <WebGLBackground />
      <ParallaxElements />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Navbar />
      </motion.div>
      <SmoothScroll>
        <main ref={mainRef} className="relative z-10">
          <motion.section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 1 } : {}}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero3DScene />
            <HeroTitle visible={loaded} onContact={openContact} />
          </motion.section>

          <ScrollTransition />

          <div className="scroll-reveal-section">
            <Marquee offset={0} direction="left" />
          </div>

          <div className="scroll-reveal-section">
            <AboutSection />
          </div>

          <div className="scroll-reveal-section">
            <Marquee offset={3} direction="right" />
          </div>

          <div className="scroll-reveal-section">
            <PortfolioSection />
          </div>

          <div className="scroll-reveal-section">
            <ServicesSection onContact={openContact} />
          </div>

          <div id="faq" className="scroll-reveal-section relative">
            <FAQSection />
          </div>

          <section id="contatti" className="scroll-reveal-section py-20 md:py-32 flex items-center justify-center relative">
            <button
              onClick={openContact}
              className="w-fit px-4 py-3 text-[9px] md:text-[10px] tracking-[0.15em] uppercase rounded-full transition-all duration-300 min-h-[44px]"
              style={{
                background: 'transparent',
                border: '1px solid rgba(217,119,87,0.3)',
                color: '#D97757',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(217,119,87,0.08)';
                e.currentTarget.style.borderColor = 'rgba(217,119,87,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(217,119,87,0.3)';
              }}
            >
              {t.contact.cta}
            </button>
          </section>

          <FooterReveal />
        </main>
      </SmoothScroll>
      <FloatingButler />
      
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Index;

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import ripetiamoImg from '@/assets/portfolio/ripetiamo-preview.png';
import monacoImg from '@/assets/projects/monaco-bg.jpg';
import intiniJournalImg from '@/assets/portfolio/journal-suite-preview.png';
import marchettiImg from '@/assets/projects/marchetti-bg.png';
import lumiereImg from '@/assets/projects/lumiere-bg.jpg';
import yachtImg from '@/assets/projects/yacht-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  url: string;
  image: string;
  isActive: boolean;
}

const projects: Project[] = [
  { title: 'Ripetiamo Online', subtitle: 'EdTech & E-Learning Platform', url: 'https://www.ripetiamo.online', image: ripetiamoImg, isActive: true },
  { title: 'Intini Journal Suite', subtitle: 'Professional Trading Journal', url: 'https://intinijournalsuite.vercel.app', image: intiniJournalImg, isActive: true },
  { title: 'Monaco Luxury Experience', subtitle: 'Premium Brand Demo', url: 'https://intinimonacodemo.vercel.app', image: monacoImg, isActive: false },
  { title: 'Marchetti Concessionario', subtitle: 'Automotive Dealership', url: 'https://marchetticoncessionario.vercel.app', image: marchettiImg, isActive: false },
  { title: 'Lumière', subtitle: 'Luxury Wellness & Spa', url: 'https://lumieredemo.vercel.app', image: lumiereImg, isActive: false },
  { title: 'Yacht Charter', subtitle: 'Premium Maritime Experience', url: 'https://yachtcharterdemo.vercel.app/', image: yachtImg, isActive: false },
];

const row1 = projects.slice(0, 3);
const row2 = projects.slice(3);

const ProjectCard = ({ project }: { project: Project }) => {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();
  const statusLabel = project.isActive ? t.portfolio.active : t.portfolio.demo;
  const statusColor = project.isActive ? '#22c55e' : '#ef4444';

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl flex-shrink-0 w-[80vw] h-[50vw] max-w-[420px] max-h-[280px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-[-20px] transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.08)' : 'scale(1.02)',
        }}
      />
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.75) 100%)'
            : 'linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
        style={{
          border: `1px solid ${hovered ? 'rgba(217,119,87,0.3)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered ? '0 0 40px rgba(217,119,87,0.08)' : 'none',
        }}
      />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span
          className="block w-2 h-2 rounded-full"
          style={{
            backgroundColor: statusColor,
            boxShadow: `0 0 8px ${statusColor}, 0 0 16px ${statusColor}80`,
            animation: 'pulse-led 2s ease-in-out infinite',
          }}
        />
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
        >
          {statusLabel}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3
          className="text-lg md:text-xl mb-1"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          {project.title}
        </h3>
        <p
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(220,218,214,0.5)' }}
        >
          {project.subtitle}
        </p>
      </div>
    </a>
  );
};

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', end: 'top 55%', scrub: 1 } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Row 1: scroll left
  useEffect(() => {
    if (!track1Ref.current) return;
    const track = track1Ref.current;
    const totalWidth = track.scrollWidth / 2;
    gsap.set(track, { x: 0 });
    const anim = gsap.to(track, { x: -totalWidth, duration: 45, ease: 'none', repeat: -1 });
    return () => { anim.kill(); };
  }, []);

  // Row 2: scroll right (reverse)
  useEffect(() => {
    if (!track2Ref.current) return;
    const track = track2Ref.current;
    const totalWidth = track.scrollWidth / 2;
    gsap.set(track, { x: -totalWidth });
    const anim = gsap.to(track, { x: 0, duration: 50, ease: 'none', repeat: -1 });
    return () => { anim.kill(); };
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-20 md:py-44 overflow-hidden">
      <div ref={headingRef} className="max-w-5xl mx-auto text-center mb-12 md:mb-20 px-4 md:px-16">
        <p
          className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4 md:mb-5"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(217,119,87,0.8)' }}
        >
          {t.portfolio.label}
        </p>
        <h2
          className="text-3xl md:text-6xl lg:text-7xl mb-4 md:mb-6"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#ffffff', lineHeight: 1.1 }}
        >
          {t.portfolio.title}
        </h2>
        <p
          className="text-base md:text-xl max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', lineHeight: 1.8 }}
        >
          {t.portfolio.subtitle}
        </p>
      </div>

      {/* Row 1 - scrolls left */}
      <div ref={track1Ref} className="flex items-center gap-8 mb-16 md:mb-24" style={{ width: 'max-content' }}>
        {row1.map((p, i) => <ProjectCard key={`r1a-${i}`} project={p} />)}
        {row1.map((p, i) => <ProjectCard key={`r1b-${i}`} project={p} />)}
      </div>

      {/* Row 2 - scrolls right */}
      <div ref={track2Ref} className="flex items-center gap-8" style={{ width: 'max-content' }}>
        {row2.map((p, i) => <ProjectCard key={`r2a-${i}`} project={p} />)}
        {row2.map((p, i) => <ProjectCard key={`r2b-${i}`} project={p} />)}
      </div>

      <style>{`
        @keyframes pulse-led {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;

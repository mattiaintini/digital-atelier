import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectImage from './ProjectImage';


import ripetiamo from '@/assets/projects/ripetiamo.jpg';
import intinimonaco from '@/assets/projects/intinimonaco.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  image: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 'ripetiamo',
    title: 'Ripetiamo',
    subtitle: 'Elite Tutoring Platform',
    url: 'https://www.ripetiamo.online',
    image: ripetiamo,
    year: '2025',
  },
  {
    id: 'intinimonaco',
    title: 'Intini Monaco',
    subtitle: 'Luxury Real Estate',
    url: 'https://intinimonacodemo.vercel.app',
    image: intinimonaco,
    year: '2025',
  },
  {
    id: 'project3',
    title: 'Progetto III',
    subtitle: 'Coming Soon',
    url: '#',
    image: ripetiamo,
    year: '2026',
  },
  {
    id: 'project4',
    title: 'Progetto IV',
    subtitle: 'Coming Soon',
    url: '#',
    image: intinimonaco,
    year: '2026',
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className="group flex-shrink-0 block relative"
      style={{ width: '65vw', maxWidth: 900 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Image container with WebGL shader */}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{
          aspectRatio: '16/10',
          transform: hovered ? 'scale(0.98)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: hovered
            ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(217,119,87,0.08)'
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        <div className="absolute inset-0">
          <ProjectImage
            imageUrl={project.image}
            isHovered={hovered}
            mousePos={mousePos}
          />
        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: hovered
              ? 'linear-gradient(180deg, transparent 30%, rgba(5,5,5,0.85) 100%)'
              : 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.7) 100%)',
          }}
        />

        {/* Hover border glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-500"
          style={{
            border: '1px solid rgba(217,119,87,0.15)',
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Project info */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <h3
            className="text-2xl md:text-3xl mb-1"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(220,218,214,0.45)',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            {project.subtitle}
          </p>
        </div>
        <span
          className="text-xs tracking-widest"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(217,119,87,0.8)',
          }}
        >
          {project.year}
        </span>
      </div>
    </a>
  );
}

const HorizontalPortfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', end: 'top 40%', scrub: 1,
          },
        }
      );
    }

    const st = gsap.to(track, {
      x: -scrollWidth, ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true, scrub: 0.22, anticipatePin: 1, invalidateOnRefresh: true,
      },
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">

      {/* Section heading */}
      <div ref={headingRef} className="absolute top-16 left-10 md:left-20 z-10">
        <p
          className="text-[11px] tracking-[0.4em] uppercase mb-3"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(217,119,87,0.45)',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
          }}
        >
          Portfolio Selezionato
        </p>
        <h2
          className="text-3xl md:text-5xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          Lavori
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="relative z-[2] flex items-center gap-12 md:gap-20 h-screen pl-8 md:pl-16 pr-[20vw]"
        style={{ paddingTop: '8rem' }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-16 z-10">
        <p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(217,119,87,0.4)',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          Scorri →
        </p>
      </div>
    </section>
  );
};

export default HorizontalPortfolio;

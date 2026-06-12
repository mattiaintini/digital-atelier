import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import ripetiamoLogo from '@/assets/logos/ripetiamo.png';
import lumiereLogo from '@/assets/logos/lumiere.png';
import marchettiLogo from '@/assets/logos/marchetti.png';
import monacoLogo from '@/assets/logos/monaco.png';
import intiniJournalLogo from '@/assets/logos/intini-journal.png';
import yachtLogo from '@/assets/logos/yacht.png';

const LOGOS = [
  { src: ripetiamoLogo, alt: 'Ripetiamo Online' },
  { src: intiniJournalLogo, alt: 'Intini Journal Suite' },
  { src: monacoLogo, alt: 'Monaco Luxury Experience' },
  { src: marchettiLogo, alt: 'Marchetti Concessionario' },
  { src: lumiereLogo, alt: 'Lumière' },
  { src: yachtLogo, alt: 'Yacht Charter' },
];

interface MarqueeProps {
  /** Shift the logo order by N positions so the two strips show different logos first */
  offset?: number;
  /** Scroll direction: 'left' (default) or 'right' */
  direction?: 'left' | 'right';
}

const Marquee = ({ offset = 0, direction = 'left' }: MarqueeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Rotate logos by offset
  const logos = [...LOGOS.slice(offset % LOGOS.length), ...LOGOS.slice(0, offset % LOGOS.length)];

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;
    // Pixel-per-second speed for smooth linear scroll; 30% slower than before
    const speed = 60; // px/s
    const duration = totalWidth / speed;

    if (direction === 'left') {
      gsap.set(track, { x: 0 });
      const anim = gsap.to(track, { x: -totalWidth, duration, ease: 'none', repeat: -1 });
      return () => { anim.kill(); };
    } else {
      gsap.set(track, { x: -totalWidth });
      const anim = gsap.to(track, { x: 0, duration, ease: 'none', repeat: -1 });
      return () => { anim.kill(); };
    }
  }, [direction]);

  const renderItems = () =>
    logos.map((logo, i) => (
      <span key={i} className="flex items-center gap-16 md:gap-24 whitespace-nowrap px-8 md:px-14">
        <img
          src={logo.src}
          alt={logo.alt}
          className="h-24 md:h-32 lg:h-40 w-auto object-contain transition-opacity duration-500 hover:opacity-100"
          style={{ filter: 'brightness(0.9) contrast(1.1)', opacity: 0.9 }}
          loading="lazy"
        />
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: 'rgba(217,119,87,0.25)' }}
        />
      </span>
    ));

  return (
    <div className="relative py-4 md:py-12 overflow-hidden pointer-events-none select-none">
      <div ref={trackRef} className="flex items-center" style={{ width: 'max-content', willChange: 'transform' }}>
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
};

export default Marquee;

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    );
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.5,
    });
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.inOut',
      onComplete: () => setDone(true),
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950"
    >
      <div ref={logoRef} className="text-center">
        <p className="font-serif text-5xl font-light tracking-[0.3em] text-gradient-gold md:text-7xl">
          BURGER KING
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="h-[1px] w-12 bg-gold-500/40" />
          <p className="text-xs uppercase tracking-[0.4em] text-gold-300/60">Sylhet</p>
          <span className="h-[1px] w-12 bg-gold-500/40" />
        </div>
      </div>
    </div>
  );
}

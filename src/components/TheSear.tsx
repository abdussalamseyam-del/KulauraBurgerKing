import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame } from 'lucide-react';
import { HERO_IMAGES } from '@/lib/data';
import { FireFX } from '@/components/FireFX';

gsap.registerPlugin(ScrollTrigger);

export function TheSear() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sear-image',
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.3 },
        {
          clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 20%', scrub: 1 },
        },
      );

      gsap.fromTo('.sear-text',
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.sear-text', start: 'top 80%', end: 'top 40%', scrub: 1 },
        },
      );

      gsap.fromTo('.sear-flame',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.sear-flame', start: 'top 85%', end: 'top 50%', scrub: 1 },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen w-full items-center overflow-hidden bg-ink-950 py-20" id="sear">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/30 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <div className="sear-flame relative">
          <div className="sear-image relative overflow-hidden rounded-[2rem] border border-gold-500/20">
            <img src={HERO_IMAGES.sear} alt="Patty on flaming grill" className="h-[300px] w-full object-cover md:h-[500px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-700/40 via-transparent to-transparent" />
            {/* Real fire flames at the bottom */}
            <FireFX type="fire" count={14} className="absolute bottom-0" />
            {/* Sizzling sparks */}
            <FireFX type="sparks" count={16} />
            {/* Smoke drifting up */}
            <FireFX type="smoke" count={5} />
            {/* Steam from the hot patty */}
            <FireFX type="steam" count={8} />
            {/* Sizzle bubbles on the patty */}
            <FireFX type="sizzle" count={6} className="opacity-70" />
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute bottom-0 rounded-full bg-gradient-to-t from-red-500 to-gold-300"
                  style={{ left: `${10 + i * 11}%`, width: `${20 + Math.random() * 15}px`, height: `${60 + Math.random() * 40}px`, animation: `flicker ${0.5 + Math.random()}s ease-in-out infinite`, animationDelay: `${Math.random()}s`, filter: 'blur(3px)', opacity: 0.6 }}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="absolute bottom-20 rounded-full bg-cream-100/10"
                  style={{ left: `${15 + i * 14}%`, width: `${30 + Math.random() * 20}px`, height: `${30 + Math.random() * 20}px`, animation: `steam ${3 + Math.random() * 2}s ease-in-out infinite`, animationDelay: `${Math.random() * 3}s`, filter: 'blur(8px)' }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sear-text">
          <div className="flex items-center gap-3">
            <Flame className="text-red-400" size={20} />
            <span className="text-xs uppercase tracking-[0.4em] text-red-400/80">Chapter 01</span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light text-cream-100 md:text-7xl">
            The <span className="text-gradient-gold">Sear</span>
          </h2>
          <div className="mt-4 h-[1px] w-20 bg-gradient-to-r from-red-500 to-transparent" />
          <p className="mt-6 text-lg font-light leading-relaxed text-cream-300/70 md:text-xl">
            Perfectly Seared, Juicy Inside.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream-300/50">
            We smash our 100% beef patties onto a 500-degree flat-top, creating a deeply
            caramelized crust that locks in every drop of flavor. Each patty sears for exactly
            90 seconds per side, no more, no less.
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <p className="font-serif text-4xl text-gradient-gold">500°</p>
              <p className="text-xs uppercase tracking-wider text-cream-300/40">Grill Temp</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gradient-gold">90s</p>
              <p className="text-xs uppercase tracking-wider text-cream-300/40">Per Side</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gradient-gold">100%</p>
              <p className="text-xs uppercase tracking-wider text-cream-300/40">Beef</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

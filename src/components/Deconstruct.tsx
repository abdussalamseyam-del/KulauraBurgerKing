import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BURGER_LAYERS, HERO_IMAGES } from '@/lib/data';
import { FireFX } from '@/components/FireFX';

gsap.registerPlugin(ScrollTrigger);

export function Deconstruct() {
  const sectionRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layerEls = layersRef.current?.querySelectorAll('.layer-card') ?? [];

      gsap.fromTo(burgerRef.current,
        { y: 0, opacity: 1, scale: 1 },
        {
          y: -100, opacity: 0, scale: 0.5, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '40% top', scrub: 1 },
        },
      );

      layerEls.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, x: i % 2 === 0 ? -60 : 60, rotationZ: i % 2 === 0 ? -5 : 5 },
          {
            y: 0, opacity: 1, x: 0, rotationZ: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 50%', scrub: 1 },
          },
        );
      });

      gsap.fromTo('.deconstruct-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.deconstruct-title', start: 'top 80%', end: 'top 40%', scrub: 1 },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] w-full overflow-hidden bg-ink-950" id="deconstruct">
      <div className="sticky top-0 h-screen w-full">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]" />

        <div className="perspective-2000 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={burgerRef} className="preserve-3d relative" style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))' }}>
            <img src={HERO_IMAGES.deconstruct} alt="Burger deconstruct"
              className="h-[300px] w-[300px] rounded-full object-cover md:h-[450px] md:w-[450px]"
            />
            {/* Fire flames from below */}
            <FireFX type="fire" count={12} className="rounded-full" />
            {/* Steam rising */}
            <FireFX type="steam" count={6} />
            {/* Sparks */}
            <FireFX type="sparks" count={10} />
          </div>
        </div>

        <div className="deconstruct-title absolute left-1/2 top-16 -translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold-300/60">The Anatomy</p>
          <h2 className="mt-2 font-serif text-3xl font-light text-cream-100 md:text-5xl">Deconstructed</h2>
        </div>

        <div ref={layersRef} className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-5">
          {BURGER_LAYERS.map((layer, i) => (
            <div key={i}
              className={`layer-card flex items-center gap-4 rounded-2xl border border-gold-500/15 bg-ink-800/60 px-5 py-3 backdrop-blur-sm md:px-8 md:py-4 ${i % 2 === 0 ? 'md:mr-[40%]' : 'md:ml-[40%]'}`}
              style={{ boxShadow: `0 4px 30px ${layer.color}15` }}
            >
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: layer.color, boxShadow: `0 0 12px ${layer.color}` }} />
              <div>
                <h3 className="font-serif text-lg font-medium text-cream-100 md:text-2xl">{layer.name}</h3>
                <p className="text-xs text-cream-300/50 md:text-sm">{layer.description}</p>
              </div>
              <span className="ml-auto font-serif text-2xl text-gold-500/30 md:text-3xl">0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

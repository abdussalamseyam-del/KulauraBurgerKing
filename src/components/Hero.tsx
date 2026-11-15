import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Flame } from 'lucide-react';
import { HERO_IMAGES } from '@/lib/data';
import { useStore } from '@/store/StoreContext';
import { FireFX } from '@/components/FireFX';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { settings } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 });
      tl.fromTo(titleRef.current?.querySelectorAll('.letter') ?? [],
        { opacity: 0, y: 60, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out' },
      );
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3',
      );
      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2',
      );

      gsap.to(burgerRef.current, {
        rotationY: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(burgerRef.current, {
        yPercent: 30,
        opacity: 0.3,
        scale: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!burgerRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(burgerRef.current, {
          rotationX: -y * 20,
          yPercent: y * 5,
          xPercent: x * 5,
          duration: 1,
          ease: 'power2.out',
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = `WELCOME TO ${settings.restaurantName}`.split(' ');

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-ink-950" id="hero">
      {/* SEO: H1 heading for search engines */}
      <h1 className="sr-only">Best Burger in Kulaura</h1>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-red-600/20 blur-[150px]" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute bottom-0 rounded-full bg-gold-400/60"
            style={{ left: `${Math.random() * 100}%`, width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`, animation: `ember ${4 + Math.random() * 4}s linear infinite`, animationDelay: `${Math.random() * 4}s` }}
          />
        ))}
      </div>

      <div className="perspective-2000 absolute inset-0 flex items-center justify-center">
        <div ref={burgerRef} className="preserve-3d relative" style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))' }}>
          <div className="absolute -inset-10 rounded-full bg-gold-500/10 blur-[60px]" />
          <img src={HERO_IMAGES.burger} alt="Double Smash Burger"
            className="relative z-10 h-[280px] w-[280px] rounded-full object-cover md:h-[500px] md:w-[500px]"
            style={{ filter: 'drop-shadow(0 0 40px rgba(192,30,36,0.3))' }}
          />
          {/* Real fire flames rising from bottom of burger */}
          <FireFX type="fire" count={16} className="z-20 rounded-full" position="bottom" />
          {/* Fire sparks flying upward */}
          <FireFX type="sparks" count={20} className="z-20" />
          {/* Smoke drifting from the flames */}
          <FireFX type="smoke" count={6} className="z-15" />
        </div>
      </div>

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-2 flex items-center gap-3">
          <span className="h-[1px] w-8 bg-gold-500/50" />
          <span className="flex items-center gap-1 text-xs uppercase tracking-[0.4em] text-gold-300">
            <Flame size={12} /> Est. 2019
          </span>
          <span className="h-[1px] w-8 bg-gold-500/50" />
        </div>

        <h1 ref={titleRef} className="font-serif text-4xl font-light leading-tight tracking-tight text-cream-100 text-shadow-lux md:text-8xl" style={{ perspective: '800px' }}>
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block">
              <span className="letter inline-block">
                {word === settings.restaurantName ? (
                  <span className="text-gradient-gold font-medium">{word}</span>
                ) : word}
              </span>
              {i < titleWords.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="mt-6 max-w-xl text-base font-light tracking-wide text-cream-300/80 md:text-xl">
          Taste The Best Burger in {settings.city}
        </p>

        {/* SEO keywords visible at bottom of hero */}
        <p className="sr-only">
          Burger in Kulaura, best burger Sylhet, burger delivery Kulaura. Order juicy smash burgers with fast delivery in Kulaura and Sylhet area. Call 01993239956 to order now.
        </p>

        <button ref={buttonRef} onClick={onOrderClick}
          className="group mt-10 flex items-center gap-3 rounded-full border border-gold-500/40 bg-gradient-to-r from-gold-600/20 to-gold-400/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gold-200 transition-all duration-500 hover:border-gold-400 hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-ink-950 gold-glow"
        >
          Order Now
          <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream-300/40">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-gold-500/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

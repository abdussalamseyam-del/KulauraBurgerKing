import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tag, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { OFFERS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function Offers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.offers-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.offers-title', start: 'top 85%', end: 'top 50%', scrub: 1 } },
      );

      const cards = document.querySelectorAll('.offer-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotationY: i % 2 === 0 ? -10 : 10 },
          { opacity: 1, y: 0, rotationY: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 70%', scrub: 1 } },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-ink-950 py-20 md:py-28" id="offers">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/8 blur-[120px]" />

      <div className="offers-title mx-auto mb-12 max-w-2xl px-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Tag size={16} className="text-gold-400" />
          <span className="text-xs uppercase tracking-[0.4em] text-gold-300/60">Save More</span>
        </div>
        <h2 className="mt-2 font-serif text-4xl font-light text-cream-100 md:text-6xl">
          Special <span className="text-gradient-gold">Offers</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-5 px-6 md:grid-cols-3">
        {OFFERS.map((offer) => (
          <div key={offer.id}
            className="offer-card group relative overflow-hidden rounded-2xl border border-gold-500/15 bg-ink-800/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/40 hover:gold-glow"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-500/5 blur-2xl transition group-hover:bg-gold-500/10" />

            <span className="inline-block rounded-full bg-gradient-to-r from-red-600/30 to-red-500/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-red-300">
              {offer.badge}
            </span>

            <h3 className="mt-4 font-serif text-2xl font-medium text-cream-100">{offer.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-300/50">{offer.description}</p>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-gold-500/30 bg-gold-500/5 px-4 py-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gold-300/40">Code</p>
                <p className="font-serif text-lg text-gradient-gold">{offer.code}</p>
              </div>
              <button onClick={() => handleCopy(offer.code)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs uppercase tracking-wider transition ${
                  copied === offer.code
                    ? 'bg-green-500/20 text-green-300'
                    : 'border border-gold-500/30 text-gold-200 hover:bg-gold-500/15'
                }`}>
                {copied === offer.code ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

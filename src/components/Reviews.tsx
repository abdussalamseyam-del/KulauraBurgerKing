import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reviews-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.reviews-title', start: 'top 85%', end: 'top 50%', scrub: 1 } },
      );

      const cards = document.querySelectorAll('.review-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 78%', scrub: 0.5 } },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gradient-to-b from-ink-950 to-ink-900 py-20 md:py-28" id="reviews">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[120px]" />

      <div className="reviews-title mx-auto mb-12 max-w-2xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold-300/60">What People Say</p>
        <h2 className="mt-3 font-serif text-4xl font-light text-cream-100 md:text-6xl">
          Customer <span className="text-gradient-gold">Reviews</span>
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
            ))}
          </div>
          <span className="text-sm text-cream-300/50">4.9/5 from 2,000+ orders</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review) => (
          <div key={review.id}
            className="review-card relative overflow-hidden rounded-2xl border border-gold-500/15 bg-ink-800/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30">
            <Quote size={28} className="mb-3 text-gold-500/20" />

            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < review.rating ? 'fill-gold-400 text-gold-400' : 'text-cream-300/20'} />
              ))}
            </div>

            <p className="text-sm leading-relaxed text-cream-300/60">"{review.text}"</p>

            <div className="mt-5 flex items-center gap-3 border-t border-gold-500/10 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/30 to-gold-600/20 font-serif text-sm text-gold-300">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="font-serif text-sm text-cream-100">{review.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-gold-300/40">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Check, MessageCircle } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { FireFX } from '@/components/FireFX';
import { WHATSAPP_NUMBER } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Burgers', 'Sides', 'Drinks'];

export function Menu() {
  const { products, addToCart } = useStore();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-title',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-title', start: 'top 85%', end: 'top 50%', scrub: 1 },
        },
      );

      const cards = document.querySelectorAll('.menu-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 80%', scrub: 0.5 },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleAdd = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    addToCart(product);
    setAddedIds((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 1200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(5px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 py-24 md:py-32" id="menu">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-700/10 blur-[120px]" />

      <div className="menu-title mx-auto mb-12 max-w-2xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold-300/60">Choose Your Crown</p>
        <h2 className="mt-3 font-serif text-4xl font-light text-cream-100 md:text-6xl">
          Our <span className="text-gradient-gold">Menu</span>
        </h2>
        <p className="mt-4 text-sm text-cream-300/50 md:text-base">
          Twenty legendary creations. Each crafted with precision, fire, and passion.
        </p>
      </div>

      {/* Category tabs */}
      <div className="mx-auto mb-12 flex max-w-md items-center justify-center gap-2 px-6">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-ink-950'
                : 'border border-gold-500/20 text-cream-300/50 hover:border-gold-500/40 hover:text-gold-200'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-6 md:px-6 lg:grid-cols-4">
        {filtered.map((item) => (
          <div key={item.id}
            className="menu-card group relative"
            style={{ transition: 'transform 0.3s ease', transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative overflow-hidden rounded-2xl border border-gold-500/15 bg-ink-800/50 backdrop-blur-sm transition-all duration-500 group-hover:border-gold-500/40 group-hover:gold-glow">
              <div className="relative h-36 overflow-hidden md:h-48">
                <img src={item.image} alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ animation: 'food-float 4s ease-in-out infinite', animationDelay: `${(item.id.charCodeAt(2) || 0) * 0.15}s` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                {/* Steam rising from hot food */}
                <FireFX type="steam" count={5} className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Smoke for grilled items */}
                <FireFX type="smoke" count={3} className="opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                {/* Sizzle effect for burgers */}
                {item.category === 'Burgers' && (
                  <FireFX type="sizzle" count={6} className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                )}
                {/* Heat haze shimmer */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background: 'linear-gradient(to top, rgba(255,100,0,0.08), transparent)',
                    animation: 'heat-haze 2s ease-in-out infinite',
                  }}
                />
                <div className="absolute top-2 right-2 rounded-full border border-gold-500/30 bg-ink-950/80 px-2.5 py-1 backdrop-blur-sm md:top-3 md:right-3">
                  <span className="font-serif text-sm font-medium text-gradient-gold md:text-lg">{item.price}</span>
                  <span className="ml-0.5 text-[10px] text-gold-300/60 md:text-xs">TK</span>
                </div>
              </div>

              <div className="p-3 md:p-4">
                <p className="mb-1 text-[10px] uppercase tracking-wider text-gold-300/40">{item.category}</p>
                <h3 className="font-serif text-sm font-medium leading-tight text-cream-100 md:text-lg">
                  {item.name}
                </h3>
                <p className="mt-1 font-serif text-base text-gradient-gold md:text-xl">
                  {item.price} <span className="text-[10px] text-gold-300/60">TK</span>
                </p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleAdd(item.id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 md:text-xs ${
                      addedIds.has(item.id)
                        ? 'bg-green-500/20 text-green-300'
                        : 'border border-gold-500/30 bg-gold-500/10 text-gold-200 hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-ink-950'
                    }`}>
                    {addedIds.has(item.id) ? (<><Check size={12} /> Added</>) : (<><Plus size={12} /> Add</>)}
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I would like to order: ${item.name} (${item.price} TK)`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-2 text-green-300 transition hover:bg-green-500/20"
                    aria-label="Order on WhatsApp"
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

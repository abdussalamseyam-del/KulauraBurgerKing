import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Check, RotateCcw } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import {
  BURGER_BUNS, BURGER_PATTIES, BURGER_TOPPINGS, BURGER_SAUCES,
  type BurgerIngredient,
} from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type Selections = {
  bun: string;
  patty: string;
  toppings: string[];
  sauces: string[];
};

export function BuildYourBurger() {
  const { addToCart } = useStore();
  const sectionRef = useRef<HTMLElement>(null);
  const burgerStackRef = useRef<HTMLDivElement>(null);
  const [selections, setSelections] = useState<Selections>({
    bun: 'bun-brioche',
    patty: 'patty-beef',
    toppings: ['top-cheese'],
    sauces: ['sauce-house'],
  });
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.byb-title',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.byb-title', start: 'top 85%', end: 'top 50%', scrub: 1 } },
      );
      gsap.fromTo('.byb-panel',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.byb-panel', start: 'top 85%', end: 'top 40%', scrub: 1 } },
      );
      gsap.fromTo('.byb-preview',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.byb-preview', start: 'top 85%', end: 'top 40%', scrub: 1 } },
      );

      // Gentle float on the stack
      gsap.to(burgerStackRef.current, {
        y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const totalPrice = useMemo(() => {
    const bun = BURGER_BUNS.find((b) => b.id === selections.bun)?.price ?? 0;
    const patty = BURGER_PATTIES.find((p) => p.id === selections.patty)?.price ?? 0;
    const toppings = selections.toppings.reduce((sum, id) =>
      sum + (BURGER_TOPPINGS.find((t) => t.id === id)?.price ?? 0), 0);
    const sauces = selections.sauces.reduce((sum, id) =>
      sum + (BURGER_SAUCES.find((s) => s.id === id)?.price ?? 0), 0);
    return bun + patty + toppings + sauces;
  }, [selections]);

  const toggleTopping = (id: string) => {
    setSelections((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(id)
        ? prev.toppings.filter((t) => t !== id)
        : [...prev.toppings, id],
    }));
  };

  const toggleSauce = (id: string) => {
    setSelections((prev) => ({
      ...prev,
      sauces: prev.sauces.includes(id)
        ? prev.sauces.filter((s) => s !== id)
        : [...prev.sauces, id],
    }));
  };

  const reset = () => {
    setSelections({ bun: 'bun-brioche', patty: 'patty-beef', toppings: ['top-cheese'], sauces: ['sauce-house'] });
  };

  const handleAddToCart = () => {
    const ingredientNames: string[] = [];
    const bun = BURGER_BUNS.find((b) => b.id === selections.bun);
    const patty = BURGER_PATTIES.find((p) => p.id === selections.patty);
    if (bun) ingredientNames.push(bun.name);
    if (patty) ingredientNames.push(patty.name);
    selections.toppings.forEach((id) => {
      const t = BURGER_TOPPINGS.find((x) => x.id === id);
      if (t) ingredientNames.push(t.name);
    });
    selections.sauces.forEach((id) => {
      const s = BURGER_SAUCES.find((x) => x.id === id);
      if (s) ingredientNames.push(s.name);
    });

    addToCart({
      id: `custom_${Date.now()}`,
      name: `Custom Burger (${ingredientNames.slice(0, 3).join(', ')}${ingredientNames.length > 3 ? '...' : ''})`,
      price: totalPrice,
      image: 'https://images.pexels.com/photos/12325274/pexels-photo-12325274.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Custom',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Build stack for 3D preview
  const stackLayers: { ingredient: BurgerIngredient; offset: number }[] = [];
  const baseOffset = 8;
  const layerHeight = 28;
  let currentY = 0;

  const selectedBun = BURGER_BUNS.find((b) => b.id === selections.bun);
  const selectedPatty = BURGER_PATTIES.find((p) => p.id === selections.patty);

  if (selectedBun) {
    stackLayers.push({ ingredient: selectedBun, offset: currentY });
    currentY += layerHeight;
  }
  if (selectedPatty) {
    stackLayers.push({ ingredient: selectedPatty, offset: currentY });
    currentY += layerHeight;
  }
  selections.toppings.forEach((id) => {
    const t = BURGER_TOPPINGS.find((x) => x.id === id);
    if (t) {
      stackLayers.push({ ingredient: t, offset: currentY });
      currentY += layerHeight * 0.7;
    }
  });
  selections.sauces.forEach((id) => {
    const s = BURGER_SAUCES.find((x) => x.id === id);
    if (s) {
      stackLayers.push({ ingredient: s, offset: currentY });
      currentY += layerHeight * 0.5;
    }
  });
  // Top bun
  if (selectedBun) {
    stackLayers.push({ ingredient: { ...selectedBun, name: 'Top Bun' }, offset: currentY });
  }

  const OptionButton = ({ ingredient, selected, onClick }: { ingredient: BurgerIngredient; selected: boolean; onClick: () => void }) => (
    <button onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition-all duration-300 ${
        selected
          ? 'border-gold-500/50 bg-gold-500/15 text-gold-200'
          : 'border-gold-500/10 bg-ink-900/40 text-cream-300/50 hover:border-gold-500/30 hover:text-cream-100'
      }`}>
      <span className="text-base">{ingredient.emoji}</span>
      <span className="flex-1 text-left font-sans">{ingredient.name}</span>
      <span className="text-gold-300/60">+{ingredient.price} TK</span>
      {selected && <Check size={12} className="text-gold-400" />}
    </button>
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 py-24 md:py-32" id="build">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-700/10 blur-[130px]" />

      <div className="byb-title mx-auto mb-12 max-w-2xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold-300/60">Make It Yours</p>
        <h2 className="mt-3 font-serif text-4xl font-light text-cream-100 md:text-6xl">
          Build Your <span className="text-gradient-gold">Burger</span>
        </h2>
        <p className="mt-4 text-sm text-cream-300/50 md:text-base">
          Choose your bun, patty, toppings, and sauces. Watch it stack in real-time 3D.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:gap-12">
        {/* Options panel */}
        <div className="byb-panel space-y-6 rounded-3xl border border-gold-500/15 bg-ink-800/40 p-5 backdrop-blur-sm md:p-7">
          {/* Bun */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-serif text-lg text-cream-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-xs text-gold-300">1</span>
              Choose Your Bun
            </h3>
            <div className="space-y-2">
              {BURGER_BUNS.map((b) => (
                <OptionButton key={b.id} ingredient={b} selected={selections.bun === b.id}
                  onClick={() => setSelections((prev) => ({ ...prev, bun: b.id }))} />
              ))}
            </div>
          </div>

          {/* Patty */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-serif text-lg text-cream-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-xs text-gold-300">2</span>
              Choose Your Patty
            </h3>
            <div className="space-y-2">
              {BURGER_PATTIES.map((p) => (
                <OptionButton key={p.id} ingredient={p} selected={selections.patty === p.id}
                  onClick={() => setSelections((prev) => ({ ...prev, patty: p.id }))} />
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-serif text-lg text-cream-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-xs text-gold-300">3</span>
              Toppings <span className="text-xs text-cream-300/30">(pick any)</span>
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BURGER_TOPPINGS.map((t) => (
                <OptionButton key={t.id} ingredient={t} selected={selections.toppings.includes(t.id)}
                  onClick={() => toggleTopping(t.id)} />
              ))}
            </div>
          </div>

          {/* Sauces */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-serif text-lg text-cream-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-xs text-gold-300">4</span>
              Sauces <span className="text-xs text-cream-300/30">(pick any)</span>
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BURGER_SAUCES.map((s) => (
                <OptionButton key={s.id} ingredient={s} selected={selections.sauces.includes(s.id)}
                  onClick={() => toggleSauce(s.id)} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 border-t border-gold-500/10 pt-5">
            <button onClick={reset}
              className="flex items-center gap-2 rounded-full border border-gold-500/20 px-4 py-2.5 text-xs uppercase tracking-wider text-cream-300/50 transition hover:border-gold-500/40 hover:text-gold-200">
              <RotateCcw size={12} /> Reset
            </button>
            <button onClick={handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                added
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 text-ink-950 hover:gold-glow'
              }`}>
              {added ? <><Check size={14} /> Added to Cart!</> : <><Plus size={14} /> Add to Cart — {totalPrice} TK</>}
            </button>
          </div>
        </div>

        {/* 3D Preview */}
        <div className="byb-preview flex flex-col items-center justify-center rounded-3xl border border-gold-500/15 bg-ink-900/40 p-6 backdrop-blur-sm md:p-8">
          <div className="mb-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-300/40">Live Preview</p>
            <p className="mt-2 font-serif text-4xl text-gradient-gold">{totalPrice} <span className="text-lg text-gold-300/60">TK</span></p>
          </div>

          {/* 3D Burger Stack */}
          <div className="perspective-1000 relative flex h-[340px] w-full items-end justify-center" style={{ perspective: '800px' }}>
            <div ref={burgerStackRef} className="preserve-3d relative" style={{ transformStyle: 'preserve-3d' }}>
              {stackLayers.map((layer, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    bottom: `${layer.offset + baseOffset}px`,
                    width: i === 0 || i === stackLayers.length - 1 ? '180px' : '160px',
                    height: i === 0 || i === stackLayers.length - 1 ? '36px' : '24px',
                    backgroundColor: layer.ingredient.color,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.2)`,
                    transform: `translateZ(${i * 4}px)`,
                    opacity: 1,
                  }}
                >
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-ink-950/70">
                    {layer.ingredient.name}
                  </span>
                </div>
              ))}
              {/* Glow under burger */}
              <div className="absolute bottom-0 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-gold-500/20 blur-md" />
            </div>
          </div>

          {/* Ingredient summary */}
          <div className="mt-4 w-full space-y-1.5 rounded-2xl bg-ink-800/40 p-4">
            {stackLayers.filter((_, i) => i !== stackLayers.length - 1).map((layer, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-cream-300/60">{layer.ingredient.emoji} {layer.ingredient.name}</span>
                <span className="text-gold-300/50">{layer.ingredient.price} TK</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

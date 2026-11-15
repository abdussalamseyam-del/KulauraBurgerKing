import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'deconstruct', label: 'Deconstruct' },
  { id: 'menu', label: 'Menu' },
  { id: 'build', label: 'Build' },
  { id: 'sear', label: 'The Sear' },
  { id: 'offers', label: 'Offers' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'order', label: 'Order' },
];

export function Navigation({ onOrderClick, onCartClick }: { onOrderClick: () => void; onCartClick: () => void }) {
  const { settings, cartCount } = useStore();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const sections = SECTIONS.map((s) => document.getElementById(s.id));
      const scrollY = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  const goToAdmin = () => {
    window.location.hash = '/admin';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark py-3' : 'py-5'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <button onClick={() => scrollToSection('hero')}
            className="font-serif text-xl font-medium tracking-wide text-cream-100 transition hover:text-gold-300 md:text-2xl">
            {settings.restaurantName.toUpperCase()}
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {SECTIONS.slice(0, 5).map((s) => (
              <button key={s.id} onClick={() => scrollToSection(s.id)}
                className={`text-xs uppercase tracking-wider transition ${activeSection === s.id ? 'text-gold-400' : 'text-cream-300/40 hover:text-cream-100'}`}>
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={goToAdmin} title="Admin Panel"
              className="rounded-full border border-gold-500/20 bg-gold-500/5 p-2.5 text-gold-300/50 transition hover:border-gold-500/40 hover:text-gold-200">
              <Lock size={16} />
            </button>
            <button onClick={onCartClick} className="relative rounded-full border border-gold-500/30 bg-gold-500/5 p-2.5 transition hover:bg-gold-500/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-300">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-cream-100">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={onOrderClick}
              className="rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-gold-200 transition hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-ink-950 md:px-5">
              Order Now
            </button>
          </div>
        </div>
      </header>

      <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scrollToSection(s.id)} className="group flex items-center gap-3" aria-label={s.label}>
            <span className={`text-[10px] uppercase tracking-wider transition-all duration-300 ${activeSection === s.id ? 'opacity-100 text-gold-300' : 'opacity-0 text-cream-300/40 group-hover:opacity-60'}`}>
              {s.label}
            </span>
            <span className={`h-2 w-2 rounded-full border transition-all duration-300 ${activeSection === s.id ? 'scale-150 border-gold-400 bg-gold-400' : 'border-cream-300/30 bg-transparent group-hover:border-gold-400/50'}`} />
          </button>
        ))}
      </nav>
    </>
  );
}

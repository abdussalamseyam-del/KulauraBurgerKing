import { useEffect, useState } from 'react';
import { Clock, MapPin, Phone, MessageCircle, Lock } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { WHATSAPP_NUMBER } from '@/lib/data';

export function Footer() {
  const { settings } = useStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 },
    );
    const el = document.getElementById('footer');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="relative w-full overflow-hidden border-t border-gold-500/15 bg-ink-950 pt-20 pb-8" id="footer">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-serif text-3xl font-light text-gradient-gold">{settings.restaurantName.toUpperCase()}</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold-300/40">{settings.city}</p>
            <p className="mt-4 text-sm leading-relaxed text-cream-300/40">
              Crafting the perfect smash burger since 2019. Fire, meat, and an obsession with quality.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gold-400" />
              <h4 className="text-xs uppercase tracking-[0.3em] text-gold-300/60">Shop Address</h4>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream-300/50">Main Bazar Road, Kulaura 3220<br />Sylhet, Bangladesh</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Kulaura+Sylhet+Bangladesh" target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-block text-xs uppercase tracking-wider text-gold-400/70 transition hover:text-gold-300">
              View on Google Maps →
            </a>
          </div>

          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gold-400" />
              <h4 className="text-xs uppercase tracking-[0.3em] text-gold-300/60">Contact</h4>
            </div>
            <p className="mt-4 text-sm text-cream-300/50">01993239956</p>
            <a href="tel:01993239956"
              className="mt-2 inline-block text-xs uppercase tracking-wider text-gold-400/70 transition hover:text-gold-300">
              Call Us →
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-green-300 transition hover:bg-green-500/20">
              <MessageCircle size={14} /> WhatsApp Us
            </a>
            <button onClick={() => { window.location.hash = '/admin'; }}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-500/15 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-gold-300/40 transition hover:border-gold-500/30 hover:text-gold-200">
              <Lock size={12} /> Admin Panel
            </button>
          </div>

          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gold-400" />
              <h4 className="text-xs uppercase tracking-[0.3em] text-gold-300/60">Opening Hours</h4>
            </div>
            <div className="mt-4 space-y-2">
              {settings.hours.map((h, i) => (
                <div key={i}>
                  <p className="text-sm text-cream-200/70">{h.day}</p>
                  <p className="text-xs text-cream-300/40">{h.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location card */}
        <div className={`mt-12 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden rounded-2xl border border-gold-500/15 bg-ink-800/50 p-8 backdrop-blur-sm">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-500/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-red-600/5 blur-3xl" />

            <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gold-500/20 bg-gold-500/10">
                  <MapPin size={28} className="text-gold-400" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.3em] text-gold-300/60">Our Location</h4>
                  <p className="mt-2 font-serif text-xl font-light text-cream-100 md:text-2xl">Kulaura, Moulvibazar</p>
                  <p className="mt-1 text-sm text-cream-300/50">Sylhet, Bangladesh — 3220</p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Kulaura+Moulvibazar+Sylhet+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full border border-gold-500/40 bg-gradient-to-r from-gold-600/20 to-gold-400/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-200 transition-all duration-500 hover:border-gold-400 hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-ink-950 gold-glow"
              >
                <MapPin size={16} className="transition-transform group-hover:scale-110" />
                View on Google Map
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-10 flex flex-col items-center justify-between gap-4 border-t border-gold-500/10 pt-6 md:flex-row transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs text-cream-300/30">
            © {new Date().getFullYear()} {settings.restaurantName}, {settings.city}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-gold-500/20" />
            <p className="font-serif text-sm italic text-gold-300/40">Taste The Best</p>
            <span className="h-[1px] w-8 bg-gold-500/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}

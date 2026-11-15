import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, Clock, MapPin, Bike } from 'lucide-react';
import { DELIVERY_ZONES } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function DeliveryInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.delivery-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.delivery-title', start: 'top 85%', end: 'top 50%', scrub: 1 } },
      );

      gsap.fromTo('.delivery-stat',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.delivery-stats', start: 'top 85%', end: 'top 50%', scrub: 1 } },
      );

      gsap.fromTo('.zone-row',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: { trigger: '.zones-list', start: 'top 85%', end: 'top 40%', scrub: 1 } },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Bike, label: 'Delivery Time', value: '25 min', sub: 'Average' },
    { icon: Truck, label: 'Free Delivery', value: '500+', sub: 'TK orders' },
    { icon: Clock, label: 'Open Daily', value: '11AM–11PM', sub: 'Every day' },
    { icon: MapPin, label: 'Coverage', value: '6 zones', sub: 'in Kulaura' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-ink-900 py-20 md:py-28" id="delivery">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-green-500/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="delivery-title mb-12 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Truck size={16} className="text-gold-400" />
            <span className="text-xs uppercase tracking-[0.4em] text-gold-300/60">Fast & Fresh</span>
          </div>
          <h2 className="mt-2 font-serif text-4xl font-light text-cream-100 md:text-6xl">
            Delivery <span className="text-gradient-gold">Info</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="delivery-stats mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="delivery-stat flex flex-col items-center rounded-2xl border border-gold-500/15 bg-ink-800/40 p-5 text-center backdrop-blur-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10">
                <stat.icon size={20} className="text-gold-400" />
              </div>
              <p className="font-serif text-2xl text-cream-100 md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-gold-300/40">{stat.label}</p>
              <p className="text-[10px] text-cream-300/30">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Zone table */}
        <div className="zones-list overflow-hidden rounded-2xl border border-gold-500/15 bg-ink-800/40 backdrop-blur-sm">
          <div className="border-b border-gold-500/10 px-5 py-3">
            <h3 className="font-serif text-lg text-cream-100">Delivery Zones & Fees</h3>
          </div>
          <div className="divide-y divide-gold-500/10">
            {DELIVERY_ZONES.map((zone) => (
              <div key={zone.area} className="zone-row flex items-center justify-between px-5 py-3 transition hover:bg-gold-500/5">
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-gold-400/60" />
                  <span className="text-sm text-cream-200/80">{zone.area}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1 text-xs text-cream-300/40">
                    <Clock size={11} /> {zone.time}
                  </span>
                  <span className="font-serif text-sm text-gradient-gold">{zone.fee} TK</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

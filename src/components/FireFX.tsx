import { useMemo } from 'react';

type FireFXProps = {
  type?: 'fire' | 'steam' | 'smoke' | 'sparks' | 'sizzle';
  count?: number;
  className?: string;
  position?: 'bottom' | 'top' | 'around';
};

export function FireFX({ type = 'fire', count = 12, className = '', position = 'bottom' }: FireFXProps) {
  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ i, seed: Math.random() })),
    [count],
  );

  if (type === 'sparks') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        {items.map(({ i, seed }) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${seed * 100}%`,
              bottom: `${5 + seed * 30}%`,
              width: `${1.5 + seed * 2}px`,
              height: `${1.5 + seed * 2}px`,
              background: seed > 0.5 ? '#d4af37' : '#ff6b1a',
              boxShadow: `0 0 6px ${seed > 0.5 ? '#d4af37' : '#ff6b1a'}`,
              animation: `spark-fly ${1.5 + seed * 2}s ease-out infinite`,
              animationDelay: `${seed * 3}s`,
              ['--spark-y' as string]: `${-40 - seed * 60}px`,
              ['--spark-x' as string]: `${(seed - 0.5) * 80}px`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'steam') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        {items.map(({ i, seed }) => (
          <div
            key={i}
            className="absolute rounded-full bg-cream-100/20"
            style={{
              left: `${10 + seed * 80}%`,
              bottom: `${position === 'top' ? '60%' : '0%'}`,
              width: `${20 + seed * 30}px`,
              height: `${20 + seed * 30}px`,
              filter: 'blur(8px)',
              animation: `steam-rise ${3 + seed * 2.5}s ease-out infinite`,
              animationDelay: `${seed * 4}s`,
              ['--drift' as string]: `${(seed - 0.5) * 40}px`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'smoke') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        {items.map(({ i, seed }) => (
          <div
            key={i}
            className="absolute rounded-full bg-cream-200/10"
            style={{
              left: `${5 + seed * 90}%`,
              bottom: '0%',
              width: `${40 + seed * 40}px`,
              height: `${40 + seed * 40}px`,
              filter: 'blur(12px)',
              animation: `smoke-drift ${5 + seed * 4}s ease-out infinite`,
              animationDelay: `${seed * 5}s`,
              ['--drift' as string]: `${(seed - 0.5) * 60}px`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'sizzle') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        {items.slice(0, 6).map(({ i, seed }) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${15 + seed * 70}%`,
              bottom: '5%',
              width: `${3 + seed * 4}px`,
              height: `${3 + seed * 4}px`,
              background: 'radial-gradient(circle, #ffcc44, #ff6b1a)',
              boxShadow: '0 0 8px #ff8c00',
              animation: `sizzle ${0.4 + seed * 0.5}s ease-in-out infinite`,
              animationDelay: `${seed * 1.5}s`,
            }}
          />
        ))}
        <div
          className="absolute bottom-0 left-1/2 h-2 w-3/4 -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,140,0,0.25), transparent 70%)',
            animation: 'sizzle 1.5s ease-in-out infinite',
          }}
        />
      </div>
    );
  }

  // Default: fire
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Glow base */}
      <div
        className="absolute bottom-0 left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(255,80,0,0.4), rgba(200,30,30,0.15), transparent 70%)',
          animation: 'fire-glow 1.5s ease-in-out infinite',
        }}
      />
      {items.map(({ i, seed }) => {
        const w = 15 + seed * 25;
        const h = 40 + seed * 60;
        const isOrange = seed > 0.35;
        return (
          <div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${5 + i * (90 / count)}%`,
              width: `${w}px`,
              height: `${h}px`,
              background: isOrange
                ? 'linear-gradient(to top, #ff4400 0%, #ff8c00 30%, #ffcc44 60%, transparent 100%)'
                : 'linear-gradient(to top, #cc1a00 0%, #ff3300 25%, #ff6b1a 55%, transparent 100%)',
              filter: 'blur(4px)',
              borderRadius: '50% 50% 20% 20%',
              transformOrigin: 'bottom center',
              animation: `fire-flame ${0.6 + seed * 0.8}s ease-in-out infinite`,
              animationDelay: `${seed * 1.5}s`,
              opacity: 0.65,
            }}
          />
        );
      })}
    </div>
  );
}

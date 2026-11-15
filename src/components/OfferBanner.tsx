import { useEffect, useState } from 'react';
import { Flame, X } from 'lucide-react';

export function OfferBanner() {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('bk_banner_closed');
    if (dismissed) setClosed(true);
  }, []);

  const handleClose = () => {
    setClosed(true);
    sessionStorage.setItem('bk_banner_closed', '1');
  };

  if (closed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-2 text-center">
      <div className="flex items-center gap-2 px-4">
        <Flame size={14} className="animate-pulse text-gold-300" />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream-100 md:text-sm">
          Buy 1 Get 1 Free — Today Only! Use code TUESDAY2
        </p>
        <Flame size={14} className="animate-pulse text-gold-300" />
      </div>
      <button
        onClick={handleClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-200/60 transition hover:text-cream-100"
        aria-label="Close banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}

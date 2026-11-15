import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { WHATSAPP_NUMBER } from '@/lib/data';

export function WhatsAppButton() {
  const { settings, cart, cartTotal } = useStore();
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const buildOrderMessage = () => {
    if (cart.length === 0) {
      return `Hello ${settings.restaurantName}! I would like to place an order.`;
    }
    let msg = `Hello ${settings.restaurantName}! I would like to order:%0A%0A`;
    cart.forEach((item) => {
      msg += `• ${item.product.name} x${item.quantity} — ${item.product.price * item.quantity} TK%0A`;
    });
    msg += `%0ATotal: ${cartTotal} TK%0A%0APlease confirm my order.`;
    return msg;
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildOrderMessage()}`;

  return (
    <div className={`fixed bottom-6 right-6 z-[55] transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      {/* Expanded tooltip */}
      {expanded && (
        <div className="absolute bottom-16 right-0 w-64 rounded-2xl border border-gold-500/20 bg-ink-900/95 p-4 backdrop-blur-md gold-glow">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-serif text-sm text-cream-100">Order via WhatsApp</span>
            <button onClick={() => setExpanded(false)} className="text-cream-300/40 transition hover:text-cream-100">
              <X size={14} />
            </button>
          </div>
          <p className="text-xs leading-relaxed text-cream-300/50">
            {cart.length > 0
              ? `Send your cart (${cart.length} items, ${cartTotal} TK) directly to us on WhatsApp.`
              : 'Chat with us or place an order directly on WhatsApp.'}
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => setExpanded(false)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-500 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition hover:from-green-500 hover:to-green-400">
            <MessageCircle size={14} />
            {cart.length > 0 ? `Send Order (${cartTotal} TK)` : 'Start Chat'}
          </a>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-green-500/30"
        aria-label="WhatsApp Order"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" style={{ animationDuration: '2s' }} />

        {expanded ? (
          <X size={22} className="relative text-white" />
        ) : (
          <MessageCircle size={24} className="relative text-white" />
        )}

        {/* Cart badge */}
        {cart.length > 0 && !expanded && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-cream-100">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  );
}

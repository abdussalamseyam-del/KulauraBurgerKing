import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

type Props = {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
};

export function CartDrawer({ open, onClose, onCheckout }: Props) {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ink-900 border-l border-gold-500/20 transition-transform duration-500 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold-500/15 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold-400" />
            <h2 className="font-serif text-xl text-cream-100">Your Cart</h2>
            {cartCount > 0 && (
              <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-xs text-gold-300">{cartCount}</span>
            )}
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-cream-300/50 transition hover:bg-ink-800 hover:text-cream-100">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/10">
                <ShoppingBag size={32} className="text-gold-500/40" />
              </div>
              <p className="text-cream-300/40">Your cart is empty</p>
              <p className="mt-1 text-xs text-cream-300/30">Add some delicious items from the menu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 rounded-xl border border-gold-500/10 bg-ink-800/50 p-3">
                  <img src={item.product.image} alt={item.product.name}
                    className="h-14 w-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate font-serif text-sm text-cream-100">{item.product.name}</h3>
                    <p className="text-xs text-gold-300/60">{item.product.price} TK</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-500/20 text-cream-300/60 transition hover:border-gold-500/50 hover:text-gold-200">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm text-cream-100">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-500/20 text-cream-300/60 transition hover:border-gold-500/50 hover:text-gold-200">
                      <Plus size={12} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)}
                    className="rounded-full p-1.5 text-red-400/50 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gold-500/15 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-cream-300/50">Total</span>
              <span className="font-serif text-2xl text-gradient-gold">{cartTotal} <span className="text-sm text-gold-300/60">TK</span></span>
            </div>
            <button onClick={onCheckout}
              className="w-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 transition-all duration-500 hover:gold-glow">
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export function useCart() {
  const [cartOpen, setCartOpen] = useState(false);
  return { cartOpen, setCartOpen };
}

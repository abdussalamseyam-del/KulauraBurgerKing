import { useEffect, useRef, useState, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Loader2, ShoppingBag, Trash2, Plus, Minus, Copy } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { type Order, BKASH_NUMBER } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpenCart: () => void;
};

export const OrderSection = forwardRef<HTMLElement, Props>(({ onOpenCart }, ref) => {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, clearCart, addOrder } = useStore();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', paymentMethod: 'Cash on Delivery', bkashTrxId: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedBkash, setCopiedBkash] = useState(false);
  const successOrderRef = useRef<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.order-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.order-title', start: 'top 85%', end: 'top 40%', scrub: 1 },
        },
      );
      gsap.fromTo('.order-form',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.order-form', start: 'top 85%', end: 'top 40%', scrub: 1 },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,15}$/.test(formData.phone.trim()))
      errs.phone = 'Enter a valid phone number';
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (cart.length === 0) errs.cart = 'Your cart is empty';
    if (formData.paymentMethod === 'bKash' && !formData.bkashTrxId.trim())
      errs.bkashTrxId = 'bKash Transaction ID is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    const order: Order = {
      id: `order_${Date.now()}`,
      customer_name: formData.name.trim(),
      phone_number: formData.phone.trim(),
      address: formData.address.trim(),
      items: cart.map((item) => ({ product: item.product, quantity: item.quantity })),
      total: cartTotal,
      payment_method: formData.paymentMethod,
      status: 'pending',
      bkash_trx_id: formData.paymentMethod === 'bKash' ? formData.bkashTrxId.trim() : undefined,
      created_at: new Date().toISOString(),
    };

    try {
      addOrder(order);
      successOrderRef.current = order.id;
      setStatus('success');
      clearCart();
      setFormData({ name: '', phone: '', address: '', paymentMethod: 'Cash on Delivery', bkashTrxId: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-gradient-to-b from-ink-950 to-ink-900 py-24 md:py-32" id="order">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[120px]" />

      <div className="mx-auto max-w-3xl px-6">
        <div className="order-title mb-12 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <ShoppingBag size={16} className="text-gold-400" />
            <span className="text-xs uppercase tracking-[0.4em] text-gold-300/60">Place Your Order</span>
          </div>
          <h2 className="font-serif text-4xl font-light text-cream-100 md:text-6xl">
            Checkout <span className="text-gradient-gold">Now</span>
          </h2>
        </div>

        {status === 'success' ? (
          <div className="order-form rounded-3xl border border-gold-500/30 bg-ink-800/60 p-8 text-center backdrop-blur-sm gold-glow">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/20">
              <Check size={28} className="text-gold-400" />
            </div>
            <h3 className="font-serif text-2xl text-cream-100">Order Confirmed!</h3>
            <p className="mt-3 text-sm text-cream-300/60">
              We have received your order. Our team will call you shortly to confirm details.
            </p>
            <button onClick={() => setStatus('idle')}
              className="mt-6 rounded-full border border-gold-500/30 px-6 py-2 text-xs uppercase tracking-wider text-gold-200 transition hover:bg-gold-500/10">
              Place Another Order
            </button>
          </div>
        ) : (
          <div className="order-form space-y-6">
            {/* Cart summary */}
            <div className="rounded-3xl border border-gold-500/15 bg-ink-800/40 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-lg text-cream-100">Order Summary</h3>
                <button onClick={onOpenCart} className="text-xs uppercase tracking-wider text-gold-400/70 transition hover:text-gold-300">
                  Edit Cart →
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-sm text-cream-300/40">Your cart is empty</p>
                  <button onClick={onOpenCart} className="mt-3 rounded-full border border-gold-500/30 px-5 py-2 text-xs uppercase tracking-wider text-gold-200 transition hover:bg-gold-500/10">
                    Browse Menu
                  </button>
                  {errors.cart && <p className="mt-2 text-xs text-red-400">{errors.cart}</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 rounded-xl bg-ink-900/40 p-2.5">
                      <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="truncate font-serif text-sm text-cream-100">{item.product.name}</h4>
                        <p className="text-xs text-gold-300/60">{item.product.price * item.quantity} TK</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-gold-500/20 text-cream-300/60 transition hover:border-gold-500/50">
                          <Minus size={10} />
                        </button>
                        <span className="w-5 text-center text-xs text-cream-100">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-gold-500/20 text-cream-300/60 transition hover:border-gold-500/50">
                          <Plus size={10} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)}
                        className="rounded-full p-1 text-red-400/50 transition hover:text-red-400">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center justify-between border-t border-gold-500/10 pt-3">
                    <span className="text-sm uppercase tracking-wider text-cream-300/50">Total</span>
                    <span className="font-serif text-2xl text-gradient-gold">{cartTotal} <span className="text-sm text-gold-300/60">TK</span></span>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-gold-500/15 bg-ink-800/40 p-6 backdrop-blur-sm md:p-8">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Name</label>
                <input type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition focus:border-gold-500/50"
                  placeholder="Your full name" />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Phone Number</label>
                <input type="tel" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition focus:border-gold-500/50"
                  placeholder="+880 1XXX-XXXXXX" />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Delivery Address</label>
                <textarea value={formData.address} rows={2}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full resize-none rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition focus:border-gold-500/50"
                  placeholder="House, road, area, landmark" />
                {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-gold-300/60">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  {['bKash', 'Cash on Delivery'].map((method) => (
                    <button key={method} type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        formData.paymentMethod === method
                          ? 'border-gold-500/50 bg-gold-500/15 text-gold-200'
                          : 'border-gold-500/15 bg-ink-900/60 text-cream-300/50 hover:border-gold-500/30'
                      }`}>
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* bKash payment details */}
              {formData.paymentMethod === 'bKash' && (
                <div className="space-y-3 rounded-xl border border-pink-500/20 bg-pink-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-pink-300/60">Send money to bKash</p>
                      <p className="font-serif text-xl text-cream-100">{BKASH_NUMBER}</p>
                    </div>
                    <button type="button"
                      onClick={() => { navigator.clipboard?.writeText(BKASH_NUMBER); setCopiedBkash(true); setTimeout(() => setCopiedBkash(false), 1500); }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs uppercase tracking-wider transition ${
                        copiedBkash ? 'bg-green-500/20 text-green-300' : 'border border-pink-500/30 text-pink-200 hover:bg-pink-500/15'
                      }`}>
                      {copiedBkash ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                    </button>
                  </div>
                  <p className="text-xs text-cream-300/40">Send {cartTotal} TK to the number above, then enter your Transaction ID below.</p>
                  <div>
                    <input type="text" value={formData.bkashTrxId}
                      onChange={(e) => setFormData({ ...formData, bkashTrxId: e.target.value })}
                      className="w-full rounded-xl border border-pink-500/20 bg-ink-900/60 px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition focus:border-pink-500/50"
                      placeholder="e.g. 8N7K4M2X9" />
                    {errors.bkashTrxId && <p className="mt-1 text-xs text-red-400">{errors.bkashTrxId}</p>}
                  </div>
                </div>
              )}

              {status === 'error' && (
                <p className="text-center text-sm text-red-400">Something went wrong. Please try again.</p>
              )}

              <button type="submit" disabled={status === 'loading' || cart.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 transition-all duration-500 hover:gold-glow disabled:opacity-40">
                {status === 'loading' ? (<><Loader2 size={16} className="animate-spin" /> Processing...</>) : (
                  `Confirm Order — Pay with ${formData.paymentMethod}`
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
});

OrderSection.displayName = 'OrderSection';

import { useState } from 'react';
import { Trash2, ChevronDown, Phone, MapPin, Check, X, Truck, Clock } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import type { Order } from '@/lib/data';

const STATUS_COLORS: Record<Order['status'], string> = {
  pending: 'bg-gold-500/15 text-gold-300 border-gold-500/30',
  accepted: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  delivered: 'bg-green-500/15 text-green-300 border-green-500/30',
  rejected: 'bg-red-500/15 text-red-300 border-red-500/30',
};

export function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useStore();
  const [filter, setFilter] = useState<'all' | Order['status']>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    accepted: orders.filter((o) => o.status === 'accepted').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    rejected: orders.filter((o) => o.status === 'rejected').length,
  };

  const filterTabs: { id: 'all' | Order['status']; label: string }[] = [
    { id: 'all', label: `All (${counts.all})` },
    { id: 'pending', label: `Pending (${counts.pending})` },
    { id: 'accepted', label: `Accepted (${counts.accepted})` },
    { id: 'delivered', label: `Delivered (${counts.delivered})` },
    { id: 'rejected', label: `Rejected (${counts.rejected})` },
  ];

  const handleConfirm = (id: string) => updateOrderStatus(id, 'accepted');
  const handleReject = (id: string) => updateOrderStatus(id, 'rejected');
  const handleDeliver = (id: string) => updateOrderStatus(id, 'delivered');
  const handleDelete = (id: string) => {
    if (confirm('Delete this order permanently?')) deleteOrder(id);
  };

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl font-light text-cream-100">Order Management</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button key={tab.id} onClick={() => setFilter(tab.id)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition ${
              filter === tab.id
                ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-ink-950'
                : 'border border-gold-500/20 text-cream-300/50 hover:border-gold-500/40 hover:text-gold-200'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-cream-300/30">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-2xl border border-gold-500/15 bg-ink-800/50 overflow-hidden">
              {/* Summary row */}
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="truncate font-serif text-base text-cream-100">{order.customer_name}</h4>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                    {order.payment_method === 'bKash' && (
                      <span className="rounded-full bg-pink-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-pink-300">bKash</span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs text-cream-300/40">
                    <span className="flex items-center gap-1"><Phone size={11} /> {order.phone_number}</span>
                    <span>{order.items.length} item(s) • {order.total} TK</span>
                    <span>{order.payment_method}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {order.status === 'pending' && (
                    <>
                      <button onClick={() => handleConfirm(order.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-white transition hover:from-green-500 hover:to-green-400">
                        <Check size={12} /> Confirm
                      </button>
                      <button onClick={() => handleReject(order.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-red-300 transition hover:bg-red-500/15">
                        <X size={12} /> Reject
                      </button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <button onClick={() => handleDeliver(order.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink-950 transition hover:gold-glow">
                      <Truck size={12} /> Mark Delivered
                    </button>
                  )}
                  {order.status === 'rejected' && (
                    <button onClick={() => handleConfirm(order.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-green-500/30 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-green-300 transition hover:bg-green-500/15">
                      <Check size={12} /> Re-accept
                    </button>
                  )}
                  <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    className="rounded-lg border border-gold-500/20 p-2 text-cream-300/60 transition hover:bg-ink-700 hover:text-gold-200">
                    <ChevronDown size={16} className={`transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} />
                  </button>
                  <button onClick={() => handleDelete(order.id)}
                    className="rounded-lg border border-red-500/20 p-2 text-red-400/50 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expanded === order.id && (
                <div className="border-t border-gold-500/10 bg-ink-900/30 p-4">
                  <div className="mb-3 flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 text-gold-400/60" />
                    <p className="text-sm text-cream-300/60">{order.address}</p>
                  </div>

                  {/* bKash TrxID */}
                  {order.payment_method === 'bKash' && order.bkash_trx_id && (
                    <div className="mb-3 flex items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/5 px-3 py-2">
                      <span className="text-[10px] uppercase tracking-wider text-pink-300/60">bKash TrxID:</span>
                      <span className="font-mono text-sm text-pink-200">{order.bkash_trx_id}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 rounded-lg bg-ink-800/40 p-2">
                        <img src={item.product.image} alt={item.product.name} className="h-10 w-10 rounded object-cover" />
                        <span className="flex-1 text-sm text-cream-100">{item.product.name}</span>
                        <span className="text-xs text-cream-300/40">x{item.quantity}</span>
                        <span className="text-sm text-gold-300/70">{item.product.price * item.quantity} TK</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-gold-500/10 pt-3">
                    <span className="text-xs uppercase tracking-wider text-cream-300/40">Total</span>
                    <span className="font-serif text-lg text-gradient-gold">{order.total} TK</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { TrendingUp, Package, ClipboardList, DollarSign, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

type Tab = 'dashboard' | 'products' | 'orders' | 'settings';

export function AdminDashboard({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { orders, products } = useStore();

  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const rejectedOrders = orders.filter((o) => o.status === 'rejected').length;
  const totalProducts = products.length;

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: ClipboardList, color: 'text-gold-400', bg: 'bg-gold-500/10' },
    { label: 'Total Sales', value: `${totalSales} TK`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Pending', value: pendingOrders, icon: TrendingUp, color: 'text-cream-200', bg: 'bg-cream-100/10' },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl font-light text-cream-100">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gold-500/15 bg-ink-800/50 p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="font-serif text-2xl text-cream-100 lg:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-cream-300/40">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gold-500/15 bg-ink-800/50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg text-cream-100">Recent Orders</h3>
          <button onClick={() => onNavigate('orders')}
            className="flex items-center gap-1 text-xs uppercase tracking-wider text-gold-400/70 transition hover:text-gold-300">
            View All <ArrowRight size={12} />
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <p className="py-8 text-center text-sm text-cream-300/30">No orders yet</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl bg-ink-900/40 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-cream-100">{order.customer_name}</p>
                  <p className="text-xs text-cream-300/40">{order.items.length} item(s) • {order.total} TK</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${
                  order.status === 'pending' ? 'bg-gold-500/15 text-gold-300' :
                  order.status === 'accepted' ? 'bg-blue-500/15 text-blue-300' :
                  order.status === 'delivered' ? 'bg-green-500/15 text-green-300' :
                  'bg-red-500/15 text-red-300'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  LayoutDashboard, Package, ClipboardList, Settings as SettingsIcon,
  LogOut, Menu as MenuIcon, X, ExternalLink,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminSettings } from './AdminSettings';

type Tab = 'dashboard' | 'products' | 'orders' | 'settings';

export function AdminPanel() {
  const { isAdmin, setIsAdmin } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdmin) return <AdminLogin />;

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-gold-500/15 bg-ink-900 px-4 py-3 lg:hidden">
        <span className="font-serif text-lg text-gradient-gold">Admin Panel</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg p-2 text-cream-300/60">
          {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-gold-500/15 bg-ink-900 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="border-b border-gold-500/15 px-6 py-6">
          <h1 className="font-serif text-2xl font-light text-gradient-gold">BURGER KING</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold-300/40">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {tabs.map((tab) => (
            <button key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold-500/20 to-transparent text-gold-300'
                  : 'text-cream-300/50 hover:bg-ink-800 hover:text-cream-100'
              }`}>
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="space-y-2 border-t border-gold-500/15 px-3 py-4">
          <button onClick={() => { window.location.hash = ''; }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-cream-300/50 transition hover:bg-ink-800 hover:text-cream-100">
            <ExternalLink size={18} /> View Website
          </button>
          <button onClick={() => setIsAdmin(false)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400/60 transition hover:bg-red-500/10 hover:text-red-400">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-ink-950/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <main className="lg:ml-64">
        <div className="px-4 py-6 pt-20 lg:px-8 lg:py-8 lg:pt-8">
          {activeTab === 'dashboard' && <AdminDashboard onNavigate={setActiveTab} />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
}

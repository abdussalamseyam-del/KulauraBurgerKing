import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { ADMIN_CREDENTIALS } from '@/lib/data';

export function AdminLogin() {
  const { setIsAdmin } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10">
            <Lock size={24} className="text-gold-400" />
          </div>
          <h1 className="font-serif text-3xl font-light text-cream-100">Admin Panel</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold-300/40">Burger King — Sylhet</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-gold-500/15 bg-ink-800/50 p-8 backdrop-blur-sm">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-300/30" />
              <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 py-3 pl-11 pr-4 text-cream-100 placeholder-cream-300/30 outline-none transition focus:border-gold-500/50"
                placeholder="admin@example.com" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-300/30" />
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 py-3 pl-11 pr-4 text-cream-100 placeholder-cream-300/30 outline-none transition focus:border-gold-500/50"
                placeholder="••••••" />
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 transition-all duration-500 hover:gold-glow">
            Login <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => { window.location.hash = ''; }} className="text-xs uppercase tracking-wider text-cream-300/30 transition hover:text-gold-300">← Back to Website</button>
        </div>
      </div>
    </div>
  );
}

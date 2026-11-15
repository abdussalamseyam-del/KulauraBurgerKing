import { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [form, setForm] = useState({
    restaurantName: settings.restaurantName,
    city: settings.city,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    address: settings.address,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl font-light text-cream-100">Settings</h2>

      <div className="max-w-2xl space-y-5 rounded-2xl border border-gold-500/15 bg-ink-800/50 p-6 backdrop-blur-sm">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Restaurant Name</label>
          <input type="text" value={form.restaurantName}
            onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
            className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 outline-none transition focus:border-gold-500/50" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">City</label>
          <input type="text" value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 outline-none transition focus:border-gold-500/50" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Phone Number</label>
          <input type="text" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 outline-none transition focus:border-gold-500/50" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">WhatsApp Number (with country code, no +)</label>
          <input type="text" value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className="w-full rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 outline-none transition focus:border-gold-500/50" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold-300/60">Address</label>
          <textarea value={form.address} rows={2}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full resize-none rounded-xl border border-gold-500/15 bg-ink-900/60 px-4 py-3 text-cream-100 outline-none transition focus:border-gold-500/50" />
        </div>

        <button onClick={handleSave}
          className={`flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
            saved
              ? 'bg-green-500/20 text-green-300'
              : 'bg-gradient-to-r from-gold-500 to-gold-400 text-ink-950 hover:gold-glow'
          }`}>
          {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}

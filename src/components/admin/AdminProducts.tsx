import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import type { Product } from '@/lib/data';

const CATEGORIES = ['Burgers', 'Sides', 'Drinks'];

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', price: '', image: '', category: 'Burgers' });

  const startEdit = (product: Product) => {
    setEditing(product);
    setForm({ name: product.name, price: String(product.price), image: product.image, category: product.category });
    setAdding(false);
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({ name: '', price: '', image: '', category: 'Burgers' });
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price.trim() || !form.image.trim()) return;
    const price = parseInt(form.price);
    if (!price || price <= 0) return;

    if (editing) {
      updateProduct(editing.id, { name: form.name.trim(), price, image: form.image.trim(), category: form.category });
    } else {
      addProduct({ name: form.name.trim(), price, image: form.image.trim(), category: form.category });
    }
    cancel();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) {
      deleteProduct(id);
    }
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const showForm = editing || adding;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-3xl font-light text-cream-100">Products</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-300/30" />
            <input type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="rounded-lg border border-gold-500/15 bg-ink-800/50 py-2 pl-8 pr-3 text-sm text-cream-100 placeholder-cream-300/30 outline-none focus:border-gold-500/40" />
          </div>
          <button onClick={startAdd}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink-950 transition hover:gold-glow">
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="mb-6 rounded-2xl border border-gold-500/20 bg-ink-800/60 p-5 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-lg text-cream-100">
              {editing ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button onClick={cancel} className="rounded-full p-1.5 text-cream-300/40 transition hover:bg-ink-700 hover:text-cream-100">
              <X size={16} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-gold-300/60">Name</label>
              <input type="text" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gold-500/15 bg-ink-900/60 px-3 py-2.5 text-sm text-cream-100 outline-none focus:border-gold-500/50"
                placeholder="Product name" />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-gold-300/60">Price (TK)</label>
              <input type="number" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-lg border border-gold-500/15 bg-ink-900/60 px-3 py-2.5 text-sm text-cream-100 outline-none focus:border-gold-500/50"
                placeholder="250" />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-gold-300/60">Category</label>
              <select value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-gold-500/15 bg-ink-900/60 px-3 py-2.5 text-sm text-cream-100 outline-none focus:border-gold-500/50">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-gold-300/60">Image URL</label>
              <input type="text" value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full rounded-lg border border-gold-500/15 bg-ink-900/60 px-3 py-2.5 text-sm text-cream-100 outline-none focus:border-gold-500/50"
                placeholder="https://..." />
            </div>
          </div>

          {form.image && (
            <div className="mt-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-gold-300/40">Preview</p>
              <img src={form.image} alt="Preview" className="h-24 w-24 rounded-lg border border-gold-500/20 object-cover" />
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <button onClick={handleSave}
              className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-ink-950 transition hover:gold-glow">
              {editing ? 'Update Product' : 'Add Product'}
            </button>
            <button onClick={cancel}
              className="rounded-lg border border-gold-500/20 px-6 py-2.5 text-xs uppercase tracking-wider text-cream-300/60 transition hover:bg-ink-700">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div key={product.id} className="flex items-center gap-3 rounded-xl border border-gold-500/10 bg-ink-800/40 p-3 transition hover:border-gold-500/25">
            <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-gold-300/40">{product.category}</p>
              <h4 className="truncate font-serif text-sm text-cream-100">{product.name}</h4>
              <p className="text-sm text-gold-300/70">{product.price} TK</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <button onClick={() => startEdit(product)}
                className="rounded-lg border border-gold-500/20 p-2 text-gold-300/70 transition hover:bg-gold-500/15 hover:text-gold-200">
                <Edit2 size={14} />
              </button>
              <button onClick={() => handleDelete(product.id)}
                className="rounded-lg border border-red-500/20 p-2 text-red-400/60 transition hover:bg-red-500/10 hover:text-red-400">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-cream-300/30">No products found</p>
      )}
    </div>
  );
}

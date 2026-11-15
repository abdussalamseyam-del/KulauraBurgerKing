import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  type Product,
  type CartItem,
  type Order,
  type Settings,
  DEFAULT_PRODUCTS,
  DEFAULT_SETTINGS,
} from '@/lib/data';

const KEYS = {
  products: 'bk_products',
  orders: 'bk_orders',
  settings: 'bk_settings',
  cart: 'bk_cart',
  admin: 'bk_admin_auth',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

type StoreContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;

  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;

  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProductsState] = useState<Product[]>(() => load(KEYS.products, DEFAULT_PRODUCTS));
  const [orders, setOrders] = useState<Order[]>(() => load(KEYS.orders, []));
  const [settings, setSettings] = useState<Settings>(() => ({ ...DEFAULT_SETTINGS, ...load(KEYS.settings, {}) }));
  const [cart, setCart] = useState<CartItem[]>(() => load(KEYS.cart, []));
  const [isAdmin, setIsAdminState] = useState<boolean>(() => load(KEYS.admin, false));

  useEffect(() => { save(KEYS.products, products); }, [products]);
  useEffect(() => { save(KEYS.orders, orders); }, [orders]);
  useEffect(() => { save(KEYS.settings, settings); }, [settings]);
  useEffect(() => { save(KEYS.cart, cart); }, [cart]);
  useEffect(() => { save(KEYS.admin, isAdmin); }, [isAdmin]);

  const setProducts = (p: Product[]) => setProductsState(p);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const id = `p${Date.now()}`;
    setProductsState((prev) => [...prev, { ...product, id }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProductsState((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProductsState((prev) => prev.filter((p) => p.id !== id));
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const setIsAdmin = (value: boolean) => setIsAdminState(value);

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        settings,
        updateSettings,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

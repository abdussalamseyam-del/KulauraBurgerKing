import { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Loader } from '@/components/Loader';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Deconstruct } from '@/components/Deconstruct';
import { Menu } from '@/components/Menu';
import { BuildYourBurger } from '@/components/BuildYourBurger';
import { TheSear } from '@/components/TheSear';
import { Offers } from '@/components/Offers';
import { Reviews } from '@/components/Reviews';
import { DeliveryInfo } from '@/components/DeliveryInfo';
import { OrderSection } from '@/components/OrderSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { OfferBanner } from '@/components/OfferBanner';
import { AdminPanel } from '@/components/admin/AdminPanel';

function useHashRoute() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsAdmin(window.location.hash.replace('#', '').startsWith('/admin'));
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  return isAdmin;
}

function MainSite() {
  useSmoothScroll();

  const orderRef = useRef<HTMLElement>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const scrollToOrder = () => {
    if (orderRef.current) {
      window.scrollTo({ top: orderRef.current.offsetTop, behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    setCartOpen(false);
    scrollToOrder();
  };

  return (
    <>
      <OfferBanner />
      <Loader />
      <Navigation onOrderClick={scrollToOrder} onCartClick={() => setCartOpen(true)} />
      <main className="relative w-full">
        <Hero onOrderClick={scrollToOrder} />
        <Deconstruct />
        <Menu />
        <BuildYourBurger />
        <TheSear />
        <Offers />
        <Reviews />
        <DeliveryInfo />
        <OrderSection ref={orderRef} onOpenCart={() => setCartOpen(true)} />
        <Footer />
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
      <WhatsAppButton />
    </>
  );
}

function App() {
  const isAdminRoute = useHashRoute();

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  return <MainSite />;
}

export default App;

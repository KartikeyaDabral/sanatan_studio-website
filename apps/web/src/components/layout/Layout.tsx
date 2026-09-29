import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../navigation/Header';
import { Footer } from '../navigation/Footer';
import './Layout.css';

export function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change with smooth natural timing
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="app-shell">
      <Header />
      <main id="main-content" className="app-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

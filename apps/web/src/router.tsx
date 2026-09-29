import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { ProjectsPage } from './pages/Projects/ProjectsPage';
import { ProjectDetailPage } from './pages/Projects/ProjectDetailPage';
import { ShopPage } from './pages/Shop/ShopPage';
import { ProductDetailPage } from './pages/Shop/ProductDetailPage';
import { AboutPage } from './pages/About/AboutPage';
import { JournalPage } from './pages/Journal/JournalPage';
import { ContactPage } from './pages/Contact/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'projects/:slug',
        element: <ProjectDetailPage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'shop/:slug',
        element: <ProductDetailPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'journal',
        element: <JournalPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      // Aliases to handle common editorial redirects
      {
        path: 'architecture',
        element: <Navigate to="/projects" replace />,
      },
      {
        path: 'collections',
        element: <Navigate to="/shop" replace />,
      },
      {
        path: '*',
        element: (
          <div className="container text-center" style={{ padding: '12rem 1.5rem' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '1rem' }}>
              404 — Void
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              The architectural coordinates you entered lead to an empty lot.
            </p>
            <a
              href="/"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-widest)',
                color: 'var(--color-terracotta)',
                textDecoration: 'none',
              }}
            >
              Return Home →
            </a>
          </div>
        ),
      },
    ],
  },
]);

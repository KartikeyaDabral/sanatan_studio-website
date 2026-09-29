import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import './Header.css';

const NAV_LINKS = [
  { label: 'Architecture', path: '/projects' },
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'About', path: '/about' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Track scroll for header background
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'header',
          scrolled && 'header--scrolled',
          menuOpen && 'header--menu-open',
        )}
        role="banner"
      >
        <div className="header__inner container">
          {/* Logo */}
          <Link to="/" className="header__logo" aria-label="Sanatan — Home">
            <span className="header__logo-text">Sanatan</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="header__nav" aria-label="Main navigation">
              <ul className="header__nav-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        'header__nav-link',
                        location.pathname.startsWith(link.path) && 'header__nav-link--active',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Actions */}
          <div className="header__actions">
            <button
              className="header__action-btn"
              aria-label="Search"
              id="header-search-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {!isMobile && (
              <Link
                to="/account"
                className="header__action-btn"
                aria-label="Account"
                id="header-account-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            <button
              className="header__action-btn header__cart-btn"
              aria-label="Cart"
              id="header-cart-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                className={cn('header__menu-toggle', menuOpen && 'header__menu-toggle--open')}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                id="header-menu-toggle"
              >
                <span className="header__menu-bar" />
                <span className="header__menu-bar" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'mobile-menu__link',
                  location.pathname.startsWith(link.path) && 'mobile-menu__link--active',
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="mobile-menu__divider" />
            <Link to="/account" className="mobile-menu__link mobile-menu__link--secondary">
              Account
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

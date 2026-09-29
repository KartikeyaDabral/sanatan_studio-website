import { Link } from 'react-router-dom';
import './Footer.css';

const FOOTER_SECTIONS = [
  {
    title: 'Explore',
    links: [
      { label: 'Architecture', path: '/projects' },
      { label: 'Collections', path: '/collections' },
      { label: 'Shop', path: '/shop' },
      { label: 'Designers', path: '/designers' },
      { label: 'Architects', path: '/architects' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Journal', path: '/journal' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms', path: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Upper section */}
        <div className="footer__upper">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Sanatan — Home">
              Sanatan
            </Link>
            <p className="footer__tagline">
              Architecture, spaces, and the objects within them.
            </p>
          </div>

          {/* Link Columns */}
          <div className="footer__columns">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="footer__column">
                <h3 className="footer__column-title">{section.title}</h3>
                <ul className="footer__link-list">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="footer__divider" />

        {/* Lower section */}
        <div className="footer__lower">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Sanatan Studio. All rights reserved.
          </p>
          <p className="footer__craft-note">
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}

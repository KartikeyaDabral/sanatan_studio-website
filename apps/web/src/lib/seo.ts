// ============================================================
// Utility: SEO helpers
// ============================================================

interface SeoMeta {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SITE_NAME = 'Sanatan';
const DEFAULT_DESCRIPTION =
  'Architecture, spaces, and the objects within them. A premium editorial platform exploring the intersection of architecture, design, and crafted furniture.';

/**
 * Sets document head meta tags for SEO / Open Graph.
 * In a production app, this would use react-helmet-async or a
 * framework-level solution. For Phase 1, we update the DOM directly.
 */
export function updatePageMeta(meta: SeoMeta): void {
  const fullTitle = meta.title === SITE_NAME
    ? meta.title
    : `${meta.title} — ${SITE_NAME}`;

  document.title = fullTitle;

  setMetaTag('description', meta.description ?? DEFAULT_DESCRIPTION);
  setMetaTag('og:title', fullTitle, 'property');
  setMetaTag('og:description', meta.description ?? DEFAULT_DESCRIPTION, 'property');
  setMetaTag('og:type', meta.type ?? 'website', 'property');

  if (meta.url) {
    setMetaTag('og:url', meta.url, 'property');
  }
  if (meta.image) {
    setMetaTag('og:image', meta.image, 'property');
    setMetaTag('twitter:image', meta.image);
  }

  setMetaTag('twitter:title', fullTitle);
  setMetaTag('twitter:description', meta.description ?? DEFAULT_DESCRIPTION);
}

function setMetaTag(
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name',
): void {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

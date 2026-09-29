import './JournalPage.css';

const ARTICLES = [
  {
    slug: 'the-dhrangadhra-quarries',
    title: 'The Yellow Stone of Dhrangadhra: Quarrying Memory in Gujarat',
    date: 'August 2026',
    author: 'Studio Sthaan',
    readTime: '6 min read',
    excerpt: 'Deep inside the open-cast pits of Surendranagar, master stone cutters extract the porous limestone that gave Ahmedabad its golden hue. Why modern construction forgotten its breathing capacity.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop&q=80',
  },
  {
    slug: 'in-praise-of-courtyards',
    title: 'In Praise of Courtyards: The Microclimates of the Indian Havelis',
    date: 'June 2026',
    author: 'Anara Interiors',
    readTime: '8 min read',
    excerpt: 'Before mechanized air cooling, the courtyard served as the respiratory engine of the home. Exploring passive cooling physics through the lens of Casa Aria.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop&q=80',
  },
  {
    slug: 'reclaiming-heritage-teak',
    title: 'Rescuing Colonial Timbers: Why Aged Wood Cannot Be Replicated',
    date: 'April 2026',
    author: 'Sanatan Workshop',
    readTime: '5 min read',
    excerpt: 'Old-growth Burmese and Malabar teak salvaged from decommissioned structures carries a density, resin content, and stability that contemporary kiln-dried lumber can never achieve.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=500&fit=crop&q=80',
  },
];

export function JournalPage() {
  return (
    <div className="journal-page container">
      <header className="journal-hero">
        <span className="journal-hero__eyebrow">Studio Journal & Monographs</span>
        <h1 className="journal-hero__title">Dispatches on Space & Material</h1>
        <p className="journal-hero__lead">
          Critical essays, quarry documentation, and reflections on vernacular
          architecture, spatial philosophy, and craft endurance.
        </p>
      </header>

      <main className="journal-grid">
        {ARTICLES.map((article) => (
          <article key={article.slug} className="journal-card">
            <div className="journal-card__media">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="journal-card__content">
              <div className="journal-card__meta">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="journal-card__title">{article.title}</h2>
              <p className="journal-card__excerpt">{article.excerpt}</p>
              <span className="journal-card__author">Words by {article.author}</span>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

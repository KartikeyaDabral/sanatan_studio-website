import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { ProductCard } from '../../components/commerce/ProductCard/ProductCard';
import type { ProductSummary } from '@sanatan/types';
import './ShopPage.css';

export function ShopPage() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const response = await productService.getProducts({
          category: categoryFilter === 'all' ? undefined : categoryFilter,
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to load furniture collection', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [categoryFilter]);

  return (
    <div className="shop-page">
      <header className="shop-hero">
        <div className="container">
          <span className="shop-hero__eyebrow">Edition & Atelier</span>
          <h1 className="shop-hero__title">Objects of Inhabitation</h1>
          <p className="shop-hero__lead">
            Every piece in this collection originated as a bespoke commission for an
            architectural interior. Scaled, balanced, and crafted in solid hardwoods,
            natural stones, and hand-finished metals.
          </p>

          <div className="shop-filters">
            <button
              type="button"
              className={`shop-filter-btn ${categoryFilter === 'all' ? 'shop-filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              All Editions
            </button>
            <button
              type="button"
              className={`shop-filter-btn ${categoryFilter === 'seating' ? 'shop-filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('seating')}
            >
              Seating
            </button>
            <button
              type="button"
              className={`shop-filter-btn ${categoryFilter === 'tables' ? 'shop-filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('tables')}
            >
              Tables
            </button>
            <button
              type="button"
              className={`shop-filter-btn ${categoryFilter === 'lighting' ? 'shop-filter-btn--active' : ''}`}
              onClick={() => setCategoryFilter('lighting')}
            >
              Lighting
            </button>
          </div>
        </div>
      </header>

      <main className="shop-content container">
        {loading ? (
          <div className="shop-loading">Gathering editions...</div>
        ) : (
          <div className="shop-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} aspectRatio="1/1" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

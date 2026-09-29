import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { ProductCard } from '../../components/commerce/ProductCard/ProductCard';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/formatCurrency';
import type { ProductDetail, ProductVariant } from '@sanatan/types';
import './ProductDetailPage.css';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await productService.getProductBySlug(slug);
        setProduct(data);
        if (data?.variants && data.variants.length > 0 && data.variants[0]) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="product-detail-loading">
        <p>Loading piece details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-notfound container text-center">
        <h2>Piece Not Found</h2>
        <p>The furniture edition you are seeking could not be found.</p>
        <Link to="/shop">
          <Button variant="primary">Return to Collection</Button>
        </Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price ?? product.price;
  const currentImages = product.images.length > 0 ? product.images : [];
  const mainImage = currentImages[selectedImageIndex];
  const primaryProject = product.projects?.[0];

  function handleAddToOrder() {
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  }

  return (
    <article className="product-detail container">
      {/* Breadcrumbs */}
      <nav className="product-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span className="sep">/</span>
        {product.category && (
          <>
            <span>{product.category.name}</span>
            <span className="sep">/</span>
          </>
        )}
        <span className="current">{product.title}</span>
      </nav>

      <div className="product-layout">
        {/* Left Column: Visual Gallery */}
        <div className="product-gallery">
          <div className="product-gallery__main">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                className="product-gallery__main-image"
              />
            ) : (
              <div className="product-gallery__empty">Image Unavailable</div>
            )}
          </div>

          {currentImages.length > 1 && (
            <div className="product-gallery__thumbnails">
              {currentImages.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  className={`thumbnail-btn ${idx === selectedImageIndex ? 'thumbnail-btn--active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={img.url} alt={img.altText || ''} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Spatial Lineage */}
        <div className="product-info">
          {/* Spatial Provenance: The link between Object and Architecture */}
          {primaryProject && (
            <div className="product-provenance">
              <span className="product-provenance__label">Spatial Commission</span>
              <p className="product-provenance__text">
                Designed for{' '}
                <Link
                  to={`/projects/${primaryProject.slug}`}
                  className="product-provenance__link"
                >
                  {primaryProject.title} ({primaryProject.location})
                </Link>
              </p>
            </div>
          )}

          <h1 className="product-info__title">{product.title}</h1>

          <div className="product-info__price-block">
            <span className="product-info__price">
              {formatCurrency(currentPrice, product.currency)}
            </span>
            <span className="product-info__tax-note">Includes local duties & taxes</span>
          </div>

          <p className="product-info__desc">{product.description}</p>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="product-variants">
              <span className="variant-label">
                Material / Finish: <strong>{selectedVariant?.label}</strong>
              </span>
              <div className="variant-list">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`variant-option ${v.id === selectedVariant?.id ? 'variant-option--selected' : ''}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v.colorHex && (
                      <span
                        className="variant-swatch"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    )}
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specifications */}
          <div className="product-specs">
            <div className="spec-row">
              <span className="spec-label">Dimensions</span>
              <span className="spec-value">
                {selectedVariant?.dimensions || 'Upon inquiry'}
              </span>
            </div>
            {selectedVariant?.weight && (
              <div className="spec-row">
                <span className="spec-label">Weight</span>
                <span className="spec-value">{selectedVariant.weight}</span>
              </div>
            )}
            {selectedVariant?.sku && (
              <div className="spec-row">
                <span className="spec-label">Archival Ref</span>
                <span className="spec-value">{selectedVariant.sku}</span>
              </div>
            )}
            <div className="spec-row">
              <span className="spec-label">Craft Studio</span>
              <span className="spec-value">
                {product.manufacturerName || 'Sanatan Workshop'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <Button
              variant="primary"
              size="lg"
              className="product-actions__btn"
              onClick={handleAddToOrder}
            >
              Request Acquisition
            </Button>
            {addedNotice && (
              <p className="product-actions__notice">
                Acquisition inquiry recorded. Our client director will be in touch.
              </p>
            )}
          </div>

          {/* Story behind the piece */}
          {product.story && (
            <div className="product-story">
              <h3 className="product-story__title">Origin & Narrative</h3>
              <p className="product-story__body">{product.story}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="product-related section">
          <div className="section-header">
            <div>
              <span className="section-header__eyebrow">Complementary Pieces</span>
              <h2 className="section-header__title">From the Same Lineage</h2>
            </div>
          </div>
          <div className="product-related__grid">
            {product.relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} aspectRatio="1/1" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

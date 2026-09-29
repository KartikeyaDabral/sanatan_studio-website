import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../lib/formatCurrency';
import type { ProductSummary } from '@sanatan/types';
import './ProductCard.css';

interface ProductCardProps {
  product: ProductSummary;
  aspectRatio?: '1/1' | '4/3' | '3/4';
}

export function ProductCard({
  product,
  aspectRatio = '1/1',
}: ProductCardProps) {
  return (
    <article className="product-card">
      <Link to={`/shop/${product.slug}`} className="product-card__media-link">
        <div className={`product-card__image-wrap product-card__image-wrap--${aspectRatio.replace('/', '-')}`}>
          {product.coverImage ? (
            <img
              src={product.coverImage}
              alt={product.coverImageAlt || product.title}
              loading="lazy"
              className="product-card__image"
            />
          ) : (
            <div className="product-card__placeholder">No image</div>
          )}
        </div>
      </Link>

      <div className="product-card__info">
        <div className="product-card__header">
          {product.category && (
            <span className="product-card__category">{product.category.name}</span>
          )}
          {product.designer && (
            <span className="product-card__designer">{product.designer.name}</span>
          )}
        </div>

        <h3 className="product-card__title">
          <Link to={`/shop/${product.slug}`} className="product-card__title-link">
            {product.title}
          </Link>
        </h3>

        <p className="product-card__price">
          {formatCurrency(product.price, product.currency)}
        </p>
      </div>
    </article>
  );
}

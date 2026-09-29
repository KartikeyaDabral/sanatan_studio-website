import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../lib/formatCurrency';
import type { ProjectFurniture } from '@sanatan/types';
import './HotspotImage.css';

interface HotspotImageProps {
  src: string;
  alt: string;
  caption?: string;
  furniture?: ProjectFurniture[];
  aspectRatio?: '16/9' | '4/3' | '3/2';
  className?: string;
}

export function HotspotImage({
  src,
  alt,
  caption,
  furniture = [],
  aspectRatio = '16/9',
  className = '',
}: HotspotImageProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popup if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveHotspot(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <figure className={`hotspot-figure ${className}`} ref={containerRef}>
      <div className={`hotspot-container hotspot-container--${aspectRatio.replace('/', '-')}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="hotspot-image"
        />

        {/* Hotspots overlay */}
        {furniture.map((item) => {
          if (item.hotspotX == null || item.hotspotY == null || !item.product) return null;

          const isSelected = activeHotspot === item.id;
          const leftPercent = `${item.hotspotX * 100}%`;
          const topPercent = `${item.hotspotY * 100}%`;

          return (
            <div
              key={item.id}
              className={`hotspot-node ${isSelected ? 'hotspot-node--active' : ''}`}
              style={{ left: leftPercent, top: topPercent }}
            >
              <button
                type="button"
                className="hotspot-button"
                onClick={() => setActiveHotspot(isSelected ? null : item.id)}
                aria-label={`View object: ${item.product.title}`}
                aria-expanded={isSelected}
              >
                <span className="hotspot-ping" />
                <span className="hotspot-dot" />
              </button>

              {/* Popover Card */}
              {isSelected && (
                <div
                  className={`hotspot-card ${
                    item.hotspotX > 0.6 ? 'hotspot-card--left' : 'hotspot-card--right'
                  } ${item.hotspotY > 0.6 ? 'hotspot-card--top' : 'hotspot-card--bottom'}`}
                  role="dialog"
                  aria-label={item.product.title}
                >
                  {item.product.coverImage && (
                    <img
                      src={item.product.coverImage}
                      alt={item.product.title}
                      className="hotspot-card__thumb"
                    />
                  )}
                  <div className="hotspot-card__content">
                    <span className="hotspot-card__eyebrow">Object in Space</span>
                    <h4 className="hotspot-card__title">{item.product.title}</h4>
                    <p className="hotspot-card__price">
                      {formatCurrency(item.product.price, item.product.currency)}
                    </p>
                    <Link
                      to={`/shop/${item.product.slug}`}
                      className="hotspot-card__link"
                    >
                      Explore Piece →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {caption && <figcaption className="hotspot-caption">{caption}</figcaption>}
    </figure>
  );
}

import type { ProjectMaterial } from '@sanatan/types';
import './MaterialPalette.css';

interface MaterialPaletteProps {
  materials: ProjectMaterial[];
  title?: string;
  subtitle?: string;
}

export function MaterialPalette({
  materials,
  title = 'Materiality & Craft',
  subtitle = 'The tactile essence of this space — honest, local, enduring.',
}: MaterialPaletteProps) {
  if (!materials || materials.length === 0) return null;

  return (
    <section className="material-palette" aria-labelledby="materials-heading">
      <div className="material-palette__header">
        <span className="material-palette__eyebrow">Tactile Foundation</span>
        <h3 id="materials-heading" className="material-palette__title">
          {title}
        </h3>
        {subtitle && <p className="material-palette__subtitle">{subtitle}</p>}
      </div>

      <div className="material-palette__grid">
        {materials.map((item) => (
          <div key={item.id} className="material-card">
            <div className="material-card__indicator">
              <span className="material-card__category">
                {item.material?.category || 'Element'}
              </span>
            </div>
            <h4 className="material-card__name">{item.material?.name}</h4>
            {item.material?.description && (
              <p className="material-card__description">
                {item.material.description}
              </p>
            )}
            {item.usage && (
              <div className="material-card__usage">
                <span className="material-card__usage-label">Application:</span>
                <span className="material-card__usage-value">{item.usage}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

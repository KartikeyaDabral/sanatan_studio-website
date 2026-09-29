import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { HotspotImage } from '../../components/architecture/HotspotImage/HotspotImage';
import { MaterialPalette } from '../../components/architecture/MaterialPalette/MaterialPalette';
import { ProductCard } from '../../components/commerce/ProductCard/ProductCard';
import { ProjectCard } from '../../components/architecture/ProjectCard/ProjectCard';
import { Button } from '../../components/ui/Button';
import type { ProjectDetail } from '@sanatan/types';
import './ProjectDetailPage.css';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await projectService.getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project detail', err);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="project-detail-loading">
        <p>Unfolding architectural record...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-notfound container text-center">
        <h2>Project Not Found</h2>
        <p>The architectural record you requested does not exist or has been archived.</p>
        <Link to="/projects">
          <Button variant="primary">Return to Archives</Button>
        </Link>
      </div>
    );
  }

  // Extract products tied to this project
  const furnitureProducts = project.furniture
    ?.map((f) => f.product)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const secondImage = project.images?.[1];

  return (
    <article className="project-detail">
      {/* 1. Project Hero */}
      <header className="project-detail__hero">
        <div className="project-detail__hero-media">
          <img
            src={project.coverImage}
            alt={project.coverImageAlt || project.title}
            className="project-detail__hero-img"
          />
          <div className="project-detail__hero-scrim" />
        </div>

        <div className="project-detail__hero-content container">
          <div className="project-detail__breadcrumbs">
            <Link to="/projects" className="breadcrumb-link">Architecture</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{project.title}</span>
          </div>

          <h1 className="project-detail__title">{project.title}</h1>
          {project.subtitle && (
            <p className="project-detail__subtitle">{project.subtitle}</p>
          )}

          {/* Architectural Credits Bar */}
          <div className="project-detail__credits-bar">
            <div className="credit-item">
              <span className="credit-label">Location</span>
              <span className="credit-value">{project.location}</span>
            </div>
            <div className="credit-item">
              <span className="credit-label">Year</span>
              <span className="credit-value">{project.year}</span>
            </div>
            {project.architect && (
              <div className="credit-item">
                <span className="credit-label">Architecture</span>
                <span className="credit-value">{project.architect.name}</span>
              </div>
            )}
            {project.designer && (
              <div className="credit-item">
                <span className="credit-label">Interiors</span>
                <span className="credit-value">{project.designer.name}</span>
              </div>
            )}
            {project.photographerName && (
              <div className="credit-item">
                <span className="credit-label">Photography</span>
                <span className="credit-value">{project.photographerName}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Architectural Narrative & Story */}
      <section className="project-detail__story section">
        <div className="container container--narrow">
          <div className="project-detail__description">
            <p className="lead-paragraph">{project.description}</p>
          </div>

          {project.story && (
            <div className="project-detail__narrative">
              {project.story.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Interactive Spatial Inhabitation (Hotspot Integration) */}
      {project.images && secondImage && (
        <section className="project-detail__spatial section" aria-labelledby="inhabitation-heading">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-header__eyebrow">Spatial Inhabitation</span>
                <h2 id="inhabitation-heading" className="section-header__title">
                  Rooms, Voids & Objects
                </h2>
              </div>
              <p className="section-header__note">
                Interactive: Click or hover hotspot indicators to view furniture built for each room.
              </p>
            </div>

            {/* Main Interactive Hotspot Frame */}
            <div className="project-detail__hotspot-wrap">
              <HotspotImage
                src={secondImage.url}
                alt={secondImage.altText || 'Living Court'}
                furniture={project.furniture}
                caption={secondImage.caption || 'The living room looking into central courtyard'}
                aspectRatio="16/9"
              />
            </div>

            {/* Gallery Grid */}
            <div className="project-detail__gallery-grid">
              {project.images.slice(2).map((img) => (
                <figure key={img.id} className="gallery-item">
                  <div className="gallery-item__wrap">
                    <img
                      src={img.url}
                      alt={img.altText || project.title}
                      loading="lazy"
                      className="gallery-item__img"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="gallery-item__caption">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Materiality & Tectonics */}
      {project.materials && project.materials.length > 0 && (
        <div className="container">
          <MaterialPalette
            materials={project.materials}
            title="Tectonic Palette"
            subtitle="Authentic stones, reclaimed woods, and metals that form this residence."
          />
        </div>
      )}

      {/* 5. Objects Born From This Space (Cross-link to Shop) */}
      {furnitureProducts && furnitureProducts.length > 0 && (
        <section className="project-detail__furniture section" aria-labelledby="furniture-heading">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-header__eyebrow">Objects in Dialogue</span>
                <h2 id="furniture-heading" className="section-header__title">
                  Furniture from {project.title}
                </h2>
              </div>
              <Link to="/shop" className="section-header__link">
                View All Furniture Editions →
              </Link>
            </div>

            <div className="project-detail__furniture-grid">
              {furnitureProducts.map((product) => (
                <ProductCard key={product.id} product={product} aspectRatio="1/1" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Related Architectural Works */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="project-detail__related section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-header__eyebrow">Related Works</span>
                <h2 className="section-header__title">Explore Other Projects</h2>
              </div>
            </div>

            <div className="project-detail__related-grid">
              {project.relatedProjects.map((rel) => (
                <ProjectCard key={rel.id} project={rel} aspectRatio="16/9" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

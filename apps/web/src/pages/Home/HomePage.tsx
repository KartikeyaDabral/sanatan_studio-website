import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { productService } from '../../services/productService';
import { ProjectCard } from '../../components/architecture/ProjectCard/ProjectCard';
import { HotspotImage } from '../../components/architecture/HotspotImage/HotspotImage';
import { ProductCard } from '../../components/commerce/ProductCard/ProductCard';
import { Button } from '../../components/ui/Button';
import type { ProjectDetail, ProjectSummary, ProductSummary } from '@sanatan/types';
import './HomePage.css';

export function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<ProjectSummary[]>([]);
  const [heroProject, setHeroProject] = useState<ProjectDetail | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<ProductSummary[]>([]);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [projects, heroDetail, products] = await Promise.all([
          projectService.getFeaturedProjects(),
          projectService.getProjectBySlug('casa-aria'),
          productService.getFeaturedProducts(),
        ]);
        setFeaturedProjects(projects);
        setHeroProject(heroDetail);
        setFeaturedProducts(products);
      } catch (err) {
        console.error('Failed to load homepage data', err);
      }
    }

    loadHomeData();
  }, []);

  return (
    <div className="home-page">
      {/* 1. Cinematic Hero */}
      <section className="home-hero" aria-label="Featured Architecture">
        <div className="home-hero__media">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=85"
            alt="Casa Aria by Studio Sthaan — Stone facade in natural sunlight"
            className="home-hero__image"
          />
          <div className="home-hero__scrim" />
        </div>

        <div className="home-hero__content container">
          <div className="home-hero__meta">
            <span className="home-hero__tag">Architectural Monograph</span>
            <span className="home-hero__location">Ahmedabad, India · 2026</span>
          </div>

          <h1 className="home-hero__title">
            Where Light <br />
            <em>Becomes Material</em>
          </h1>

          <p className="home-hero__lead">
            Casa Aria — A private sanctuary shaped by three courtyards, local
            Dhrangadhra stone, and tailored furniture born from the room itself.
          </p>

          <div className="home-hero__actions">
            <Link to="/projects/casa-aria">
              <Button variant="primary" size="lg">
                Explore Project
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost" size="lg">
                View All Works
              </Button>
            </Link>
          </div>
        </div>

        <div className="home-hero__scroll-hint" aria-hidden="true">
          <span className="home-hero__scroll-line" />
        </div>
      </section>

      {/* 2. Editorial Philosophy */}
      <section className="home-manifesto">
        <div className="container container--narrow">
          <span className="home-manifesto__eyebrow">The Sanatan Ethos</span>
          <h2 className="home-manifesto__quote">
            “We do not view furniture in isolation. Every chair, table, and
            luminaire begins as an architectural threshold — responding to the
            volume of the space, the texture of stone, and the passage of daylight.”
          </h2>
          <div className="home-manifesto__sequence">
            <span>Architecture</span>
            <span className="arrow">→</span>
            <span>Spaces</span>
            <span className="arrow">→</span>
            <span>Stories</span>
            <span className="arrow">→</span>
            <span>Objects</span>
            <span className="arrow">→</span>
            <span>Inhabitation</span>
          </div>
        </div>
      </section>

      {/* 3. Architecture Archives (Selected Works) */}
      <section className="home-projects section" aria-labelledby="selected-works-heading">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-header__eyebrow">Selected Commissions</span>
              <h2 id="selected-works-heading" className="section-header__title">
                Architecture & Dwelling
              </h2>
            </div>
            <Link to="/projects" className="section-header__link">
              View All Projects ({featuredProjects.length}) →
            </Link>
          </div>

          <div className="home-projects__grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio={index === 0 ? '16/9' : '4/3'}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Spatial Spotlight: Living in Casa Aria */}
      {heroProject && (
        <section className="home-spatial section" aria-labelledby="spatial-heading">
          <div className="container">
            <div className="home-spatial__intro">
              <span className="section-header__eyebrow">Interactive Space</span>
              <h2 id="spatial-heading" className="home-spatial__title">
                The Living Court at Casa Aria
              </h2>
              <p className="home-spatial__lead">
                Touch or hover the illuminated points below to discover the bespoke
                furniture pieces commissioned exclusively for this interior.
              </p>
            </div>

            <div className="home-spatial__canvas">
              <HotspotImage
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1000&fit=crop&q=80"
                alt="Casa Aria Living Room looking into central courtyard"
                furniture={heroProject.furniture}
                caption="The central living room opens directly to the sky court. Teak furniture balances against rough-hewn stone."
                aspectRatio="16/9"
              />
            </div>
          </div>
        </section>
      )}

      {/* 5. Tactile Materiality */}
      <section className="home-materials section">
        <div className="container">
          <div className="home-materials__split">
            <div className="home-materials__col">
              <span className="section-header__eyebrow">Material Honesty</span>
              <h2 className="home-materials__title">
                Substances That Carry Time
              </h2>
              <p className="home-materials__text">
                We believe in raw, tactile honesty. We collaborate with generational
                stone quarriers in Gujarat, reclaimed timber artisans in Rajasthan,
                and brass metalworkers whose knowledge is inscribed into the surface
                of each finished work.
              </p>
              <div className="home-materials__list">
                <div className="material-pill">Dhrangadhra Sandstone</div>
                <div className="material-pill">Aged Indian Teak</div>
                <div className="material-pill">Makrana White Marble</div>
                <div className="material-pill">Unlacquered Brass</div>
              </div>
            </div>
            <div className="home-materials__media">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&h=800&fit=crop&q=80"
                alt="Raw stone and carved wood details"
                className="home-materials__image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Curated Objects (Shoppable Pieces) */}
      <section className="home-products section" aria-labelledby="objects-heading">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-header__eyebrow">Edition & Collection</span>
              <h2 id="objects-heading" className="section-header__title">
                Objects Born From Spaces
              </h2>
            </div>
            <Link to="/shop" className="section-header__link">
              Explore Collection →
            </Link>
          </div>

          <div className="home-products__grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} aspectRatio="1/1" />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Journal & Commission Call to Action */}
      <section className="home-inquiry">
        <div className="container container--narrow text-center">
          <span className="home-inquiry__eyebrow">Collaborative Practice</span>
          <h2 className="home-inquiry__title">
            Commission a Private Space or Acquire an Edition
          </h2>
          <p className="home-inquiry__lead">
            Our architectural studio accepts a limited number of residential and
            cultural commissions each year. Furniture editions are crafted to order.
          </p>
          <div className="home-inquiry__actions">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Studio Inquiries
              </Button>
            </Link>
            <Link to="/journal">
              <Button variant="secondary" size="lg">
                Read the Journal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { projectService } from '../../services/projectService';
import { ProjectCard } from '../../components/architecture/ProjectCard/ProjectCard';
import type { ProjectSummary } from '@sanatan/types';
import './ProjectsPage.css';

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'newest' | 'oldest'>('newest');

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const response = await projectService.getProjects({
          sort: filter === 'oldest' ? 'oldest' : 'newest',
        });
        setProjects(response.data);
      } catch (err) {
        console.error('Failed to load projects', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [filter]);

  return (
    <div className="projects-page">
      <header className="projects-hero">
        <div className="container">
          <span className="projects-hero__eyebrow">Architectural Archives</span>
          <h1 className="projects-hero__title">Spaces & Monoliths</h1>
          <p className="projects-hero__lead">
            An ongoing index of residential dwellings, pavilions, and spatial
            experiments designed in conversation with climate, vernacular craft,
            and tectonic discipline.
          </p>

          <div className="projects-filters">
            <span className="projects-filters__label">Sort by:</span>
            <button
              type="button"
              className={`filter-btn ${filter === 'newest' ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter('newest')}
            >
              Recent Works
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'oldest' ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter('oldest')}
            >
              Chronological
            </button>
          </div>
        </div>
      </header>

      <main className="projects-content container">
        {loading ? (
          <div className="projects-loading">Loading architectural index...</div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio={idx % 3 === 0 ? '16/9' : '4/3'}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

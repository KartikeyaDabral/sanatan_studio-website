import { Link } from 'react-router-dom';
import type { ProjectSummary } from '@sanatan/types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: ProjectSummary;
  aspectRatio?: '16/9' | '4/3' | '3/4' | '1/1';
  priority?: boolean;
}

export function ProjectCard({
  project,
  aspectRatio = '4/3',
  priority = false,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <Link to={`/projects/${project.slug}`} className="project-card__media-link">
        <div className={`project-card__image-wrap project-card__image-wrap--${aspectRatio.replace('/', '-')}`}>
          <img
            src={project.coverImage}
            alt={project.coverImageAlt || project.title}
            loading={priority ? 'eager' : 'lazy'}
            className="project-card__image"
          />
          <div className="project-card__overlay" />
          <span className="project-card__badge">{project.location}</span>
        </div>
      </Link>

      <div className="project-card__meta">
        <div className="project-card__header">
          <span className="project-card__year">{project.year}</span>
          {project.architect && (
            <span className="project-card__architect">{project.architect.name}</span>
          )}
        </div>

        <h3 className="project-card__title">
          <Link to={`/projects/${project.slug}`} className="project-card__title-link">
            {project.title}
          </Link>
        </h3>

        {project.subtitle && (
          <p className="project-card__subtitle">{project.subtitle}</p>
        )}
      </div>
    </article>
  );
}

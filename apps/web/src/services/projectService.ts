// ============================================================
// Architecture Project Service
// ============================================================
// Service boundary separating UI from data storage and network.
// ============================================================

import type {
  ApiResponse,
  ProjectDetail,
  ProjectFilterParams,
  ProjectSummary,
} from '@sanatan/types';
import { MOCK_PROJECTS, MOCK_PROJECT_SUMMARIES } from '../data/projects';
import { isUsingMocks, request } from './apiClient';

export const projectService = {
  /**
   * Fetch all published architecture projects with optional filtering
   */
  async getProjects(
    params: ProjectFilterParams = {}
  ): Promise<ApiResponse<ProjectSummary[]>> {
    if (!isUsingMocks) {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', String(params.page));
      if (params.pageSize) searchParams.set('pageSize', String(params.pageSize));
      if (params.architect) searchParams.set('architect', params.architect);
      if (params.location) searchParams.set('location', params.location);
      if (params.sort) searchParams.set('sort', params.sort);
      if (params.search) searchParams.set('search', params.search);

      return request<ProjectSummary[]>(`/projects?${searchParams.toString()}`);
    }

    // Local Mock Implementation with filtering & sorting
    await new Promise((resolve) => setTimeout(resolve, 120)); // Realistic frame pacing

    let results = [...MOCK_PROJECT_SUMMARIES];

    if (params.search) {
      const query = params.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.subtitle?.toLowerCase().includes(query) ||
          p.architect?.name.toLowerCase().includes(query)
      );
    }

    if (params.architect) {
      results = results.filter((p) => p.architect?.slug === params.architect);
    }

    if (params.location) {
      results = results.filter((p) =>
        p.location.toLowerCase().includes(params.location!.toLowerCase())
      );
    }

    if (params.sort === 'oldest') {
      results.sort((a, b) => a.year - b.year);
    } else {
      // Default: newest first
      results.sort((a, b) => b.year - a.year);
    }

    const page = params.page || 1;
    const pageSize = params.pageSize || 12;
    const paginated = results.slice((page - 1) * pageSize, page * pageSize);

    return {
      data: paginated,
      meta: {
        page,
        pageSize,
        total: results.length,
        totalPages: Math.ceil(results.length / pageSize) || 1,
      },
    };
  },

  /**
   * Fetch single architecture project by URL slug
   */
  async getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
    if (!isUsingMocks) {
      try {
        const response = await request<ProjectDetail>(`/projects/${slug}`);
        return response.data;
      } catch (err) {
        return null;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 80));
    const project = MOCK_PROJECTS.find((p) => p.slug === slug);
    if (!project) return null;

    // Attach related projects excluding self
    const related = MOCK_PROJECT_SUMMARIES.filter((p) => p.id !== project.id).slice(0, 2);

    return {
      ...project,
      relatedProjects: related,
    };
  },

  /**
   * Fetch curated featured projects for homepage and hero
   */
  async getFeaturedProjects(): Promise<ProjectSummary[]> {
    if (!isUsingMocks) {
      const response = await request<ProjectSummary[]>('/projects/featured');
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, 60));
    return MOCK_PROJECT_SUMMARIES.slice(0, 3);
  },
};

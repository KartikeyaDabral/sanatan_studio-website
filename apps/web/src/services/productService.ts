// ============================================================
// Furniture / Product Service
// ============================================================
// Service boundary handling furniture objects, variants, and spatial ties.
// ============================================================

import type {
  ApiResponse,
  ProductDetail,
  ProductFilterParams,
  ProductSummary,
} from '@sanatan/types';
import { MOCK_PRODUCTS, MOCK_PRODUCT_SUMMARIES } from '../data/products';
import { isUsingMocks, request } from './apiClient';

export const productService = {
  /**
   * Fetch furniture objects with filtering and sorting
   */
  async getProducts(
    params: ProductFilterParams = {}
  ): Promise<ApiResponse<ProductSummary[]>> {
    if (!isUsingMocks) {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', String(params.page));
      if (params.pageSize) searchParams.set('pageSize', String(params.pageSize));
      if (params.category) searchParams.set('category', params.category);
      if (params.sort) searchParams.set('sort', params.sort);
      if (params.search) searchParams.set('search', params.search);

      return request<ProductSummary[]>(`/products?${searchParams.toString()}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    let results = [...MOCK_PRODUCT_SUMMARIES];

    if (params.search) {
      const query = params.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.designer?.name.toLowerCase().includes(query) ||
          p.category?.name.toLowerCase().includes(query)
      );
    }

    if (params.category) {
      results = results.filter((p) => p.category?.slug === params.category);
    }

    if (params.sort === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
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
   * Fetch product detail by slug with variants, images, and architectural cross-references
   */
  async getProductBySlug(slug: string): Promise<ProductDetail | null> {
    if (!isUsingMocks) {
      try {
        const response = await request<ProductDetail>(`/products/${slug}`);
        return response.data;
      } catch {
        return null;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 80));
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (!product) return null;

    // Attach related products
    const related = MOCK_PRODUCT_SUMMARIES.filter((p) => p.id !== product.id).slice(0, 3);

    return {
      ...product,
      relatedProducts: related,
    };
  },

  /**
   * Fetch featured pieces for spatial highlights
   */
  async getFeaturedProducts(): Promise<ProductSummary[]> {
    if (!isUsingMocks) {
      const response = await request<ProductSummary[]>('/products/featured');
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_PRODUCT_SUMMARIES.slice(0, 3);
  },
};

// ============================================================
// API Client Abstraction
// ============================================================
// Provides a unified, strongly typed HTTP client interface.
// When VITE_USE_MOCK_API is 'true' or in development mode,
// services can utilize local typed repositories while maintaining
// the exact same asynchronous interface as real REST endpoints.
// ============================================================

import type { ApiError, ApiResponse } from '@sanatan/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'; // default to mock if not explicitly disabled

export class HttpClientError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'HttpClientError';
    this.statusCode = error.statusCode;
    this.errors = error.errors;
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errData: ApiError;
      try {
        errData = await response.json();
      } catch {
        errData = {
          statusCode: response.status,
          message: response.statusText || 'An unexpected error occurred',
        };
      }
      throw new HttpClientError(errData);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HttpClientError) {
      throw error;
    }
    throw new HttpClientError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Network failure',
    });
  }
}

export const isUsingMocks = USE_MOCKS;

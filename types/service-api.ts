import type { IService } from '@/models/Service';

// Single service creation request
export interface CreateServiceRequest {
  id: number;
  name: string;
  image: string;
  slug: string;
}

// Bulk service creation request
export interface CreateServicesRequest {
  services: CreateServiceRequest[];
}

// Service response format
export interface ServiceResponse {
  _id: string;
  id: number;
  name: string;
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Paginated list response
export interface ServiceListResponse {
  services: ServiceResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Bulk creation response
export interface BulkCreateServicesResponse {
  created: ServiceResponse[];
  failed: {
    service: CreateServiceRequest;
    error: string;
  }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

// Update service request
export interface UpdateServiceRequest {
  name?: string;
  image?: string;
  slug?: string;
}

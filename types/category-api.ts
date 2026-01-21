export interface CreateCategoryRequest {
  id: number;
  name: string;
  slug: string;
}

export interface CreateCategoriesRequest {
  categories: CreateCategoryRequest[];
}

export interface UpdateCategoryRequest {
  id?: number;
  name?: string;
  slug?: string;
}

export interface CategoryResponse {
  _id: string;
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListResponse {
  categories: CategoryResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BulkCreateResponse {
  created: CategoryResponse[];
  failed: {
    category: CreateCategoryRequest;
    error: string;
  }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

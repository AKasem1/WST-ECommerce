// Dashboard statistics
export interface DashboardStats {
  categories: {
    total: number;
    recent: number;
  };
  products: {
    total: number;
    recent: number;
    lowStock: number;
  };
  services: {
    total: number;
    recent: number;
  };
}

// Table filters
export interface TableFilters {
  search?: string;
  page?: number;
  limit?: number;
}

// Pagination state
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

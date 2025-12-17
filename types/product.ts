import mongoose from "mongoose";

export interface CreateProductRequest {
  modelNumber: string;
  productImage: string;
  productDescription: string;
  quantity: number;
  msrpPrice: number;
  dppPrice: number;
  categoryId: mongoose.Schema.Types.ObjectId;
}

export interface CreateProductsRequest {
  products: CreateProductRequest[];
}

export interface UpdateProductRequest {
  modelNumber?: string;
  productImage?: string;
  productDescription?: string;
  quantity?: number;
  msrpPrice?: number;
  dppPrice?: number;
  categoryId?: mongoose.Schema.Types.ObjectId;
}

export interface ProductResponse {
  _id: string;
  modelNumber: string;
  productImage: string;
  productDescription: string;
  quantity: number;
  msrpPrice: number;
  dppPrice: number;
  categoryId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListResponse {
  products: ProductResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BulkCreateProductsResponse {
  created: ProductResponse[];
  failed: {
    product: CreateProductRequest;
    error: string;
  }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  categoryId?: mongoose.Schema.Types.ObjectId;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

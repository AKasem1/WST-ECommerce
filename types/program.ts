import mongoose from "mongoose";

export interface ISubscriptionPackage {
  name: string;
  nameEn?: string;
  price: number;
  duration: number;
  features: string[];
  isPopular?: boolean;
}

export interface ISystemRequirements {
  os: string[];
  processor?: string;
  ram?: string;
  storage?: string;
  additionalNotes?: string;
}

export interface CreateProgramRequest {
  name: string;
  nameEn?: string;
  programImage: string;
  shortDescription?: string;
  fullDescription?: string;
  mainFeatures?: string[];
  supportedActivities?: string[];
  systemRequirements?: ISystemRequirements;
  platforms?: string[];
  isFree?: boolean;
  basePrice?: number;
  hasSubscription?: boolean;
  subscriptionPackages?: ISubscriptionPackage[];
  supportsOffline?: boolean;
  categoryId?: mongoose.Schema.Types.ObjectId;
  visibility?: boolean;
  downloadLink?: string;
  demoLink?: string;
  documentationLink?: string;
  supportedLanguages?: string[];
  version?: string;
  lastUpdated?: Date;
}

export interface CreateProgramsRequest {
  programs: CreateProgramRequest[];
}

export interface UpdateProgramRequest {
  name?: string;
  nameEn?: string;
  programImage?: string;
  shortDescription?: string;
  fullDescription?: string;
  mainFeatures?: string[];
  supportedActivities?: string[];
  systemRequirements?: ISystemRequirements;
  platforms?: string[];
  isFree?: boolean;
  basePrice?: number;
  hasSubscription?: boolean;
  subscriptionPackages?: ISubscriptionPackage[];
  supportsOffline?: boolean;
  categoryId?: mongoose.Schema.Types.ObjectId;
  visibility?: boolean;
  downloadLink?: string;
  demoLink?: string;
  documentationLink?: string;
  supportedLanguages?: string[];
  version?: string;
  lastUpdated?: Date;
}

export interface ProgramResponse {
  _id: string;
  name: string;
  nameEn?: string;
  slug: string;
  programImage: string;
  shortDescription?: string;
  fullDescription?: string;
  mainFeatures?: string[];
  supportedActivities?: string[];
  systemRequirements?: ISystemRequirements;
  platforms?: string[];
  isFree: boolean;
  basePrice?: number;
  hasSubscription: boolean;
  subscriptionPackages?: ISubscriptionPackage[];
  supportsOffline: boolean;
  categoryId: mongoose.Schema.Types.ObjectId;
  visibility: boolean;
  downloadLink?: string;
  demoLink?: string;
  documentationLink?: string;
  supportedLanguages?: string[];
  version?: string;
  lastUpdated?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgramListResponse {
  programs: ProgramResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BulkCreateProgramsResponse {
  created: ProgramResponse[];
  failed: {
    program: CreateProgramRequest;
    error: string;
  }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

export interface ProgramQueryParams {
  page?: number;
  limit?: number;
  categoryId?: mongoose.Schema.Types.ObjectId;
  isFree?: boolean;
  platform?: string;
  search?: string;
}

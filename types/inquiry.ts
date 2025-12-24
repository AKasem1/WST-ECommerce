// Request types
export interface CreateInquiryRequest {
  name: string;
  phone: string;
  message: string;
}

// Response types
export interface InquiryResponse {
  _id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InquiryListResponse {
  inquiries: InquiryResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

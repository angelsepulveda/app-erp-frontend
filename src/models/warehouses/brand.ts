export interface Brand {
  id: number;
  name: string;
  description?: string;
  status: boolean;
}

export interface BrandResponse {
  data: Brand[];
  totalPages: number;
  pageIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type BrandFormData = Omit<Brand, 'id' | 'status'>;

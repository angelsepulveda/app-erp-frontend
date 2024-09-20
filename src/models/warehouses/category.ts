export interface Category {
  id: number;
  name: string;
  description?: string;
  status: boolean;
}

export interface CategoryResponse {
  data: Category[];
  totalPages: number;
  pageIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type CategoryFormData = Omit<Category, 'id' | 'status'>;

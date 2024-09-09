export interface VoucherType {
  id: number;
  name: string;
  code?: string;
  description?: string;
  status: boolean;
}

export interface VoucherTypeResponse {
  data: VoucherType[];
  totalPages: number;
  pageIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type VoucherTypeFormData = Omit<VoucherType, 'id' | 'status'>;

export interface DocumentType {
  id: number;
  name: string;
  code?: string;
  description?: string;
  status: boolean;
}

export interface DocumentTypeResponse {
  data: DocumentType[];
  totalPages: number;
  pageIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type DocumentTypeFormData = Omit<DocumentType, 'id' | 'status'>;

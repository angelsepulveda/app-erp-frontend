import { DocumentTypeFormData, DocumentTypeResponse } from '@/models';

import ApiService from '../apiService';

const API_ENDPOINT = 'document-types';

const apiService = new ApiService({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7120/api/v1/',
  defaultHeaders: {
    // Aquí puedes agregar headers por defecto, como tokens de autenticación
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const fetchDocumentTypes = async (
  page: number,
  pageSize: number,
  searchTerm: string,
): Promise<DocumentTypeResponse> => {
  return apiService.post<DocumentTypeResponse>(`${API_ENDPOINT}/pagination`, { pageIndex: page, pageSize });
};

export const registerDocumentTypeService = async (data: DocumentTypeFormData): Promise<void> => {
  await apiService.post(`${API_ENDPOINT}/register`, { ...data });
};

export const updateDocumentTypeService = async (id: number, data: DocumentTypeFormData): Promise<void> => {
  const body = {
    id: id,
    ...data,
  };
  await apiService.put(`${API_ENDPOINT}/update`, body);
};

export const deleteDocumentTypeService = async (id: number): Promise<void> => {
  await apiService.delete(`${API_ENDPOINT}/delete/${id}`);
};

export const restoreDocumentTypeService = async (id: number): Promise<void> => {
  await apiService.patch(`${API_ENDPOINT}/restore/${id}`);
};

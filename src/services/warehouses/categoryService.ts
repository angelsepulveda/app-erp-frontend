import { CategoryFormData, CategoryResponse } from '@/models';

import ApiService from '../apiService';

const API_ENDPOINT = 'categories';

const apiService = new ApiService({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7120/api/v1/',
  defaultHeaders: {
    // Aquí puedes agregar headers por defecto, como tokens de autenticación
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const fetchCategories = async (
  page: number,
  pageSize: number,
  searchTerm: string,
): Promise<CategoryResponse> => {
  const response = await apiService.post<CategoryResponse>(`${API_ENDPOINT}/pagination`, {
    pageIndex: page,
    pageSize,
    search: searchTerm,
  });

  if (response) return response;

  return {
    data: [],
    totalPages: 1,
    pageIndex: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  };
};

export const registerCategoryService = async (data: CategoryFormData): Promise<void> => {
  await apiService.post(`${API_ENDPOINT}/register`, { ...data });
};

export const updateCategoryService = async (id: number, data: CategoryFormData): Promise<void> => {
  const body = {
    id: id,
    ...data,
  };
  await apiService.put(`${API_ENDPOINT}/update`, body);
};

export const deleteCategoryService = async (id: number): Promise<void> => {
  await apiService.delete(`${API_ENDPOINT}/delete/${id}`);
};

export const restoreCategoryService = async (id: number): Promise<void> => {
  await apiService.patch(`${API_ENDPOINT}/restore/${id}`);
};

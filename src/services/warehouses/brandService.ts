import { BrandFormData, BrandResponse } from '@/models';

import ApiService from '../apiService';

const API_ENDPOINT = 'brands';

const apiService = new ApiService({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7120/api/v1/',
  defaultHeaders: {
    // Aquí puedes agregar headers por defecto, como tokens de autenticación
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const fetchBrands = async (page: number, pageSize: number, searchTerm: string): Promise<BrandResponse> => {
  const response = await apiService.post<BrandResponse>(`${API_ENDPOINT}/pagination`, {
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

export const registerBrandService = async (data: BrandFormData): Promise<void> => {
  await apiService.post(`${API_ENDPOINT}/register`, { ...data });
};

export const updateBrandService = async (id: number, data: BrandFormData): Promise<void> => {
  const body = {
    id: id,
    ...data,
  };
  await apiService.put(`${API_ENDPOINT}/update`, body);
};

export const deleteBrandService = async (id: number): Promise<void> => {
  await apiService.delete(`${API_ENDPOINT}/delete/${id}`);
};

export const restoreBrandService = async (id: number): Promise<void> => {
  await apiService.patch(`${API_ENDPOINT}/restore/${id}`);
};

import { VoucherTypeFormData, VoucherTypeResponse } from '@/models';

import ApiService from '../apiService';

const API_ENDPOINT = 'voucher-types';

const apiService = new ApiService({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7120/api/v1/',
  defaultHeaders: {
    // Aquí puedes agregar headers por defecto, como tokens de autenticación
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const fetchVoucherTypesService = async (
  page: number,
  pageSize: number,
  searchTerm: string,
): Promise<VoucherTypeResponse> => {
  const response = await apiService.post<VoucherTypeResponse>(`${API_ENDPOINT}/pagination`, {
    pageIndex: page,
    pageSize,
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

export const registerVoucherTypeService = async (data: VoucherTypeFormData): Promise<void> => {
  await apiService.post(`${API_ENDPOINT}/register`, { ...data });
};

export const updateVoucherTypeService = async (id: number, data: VoucherTypeFormData): Promise<void> => {
  const body = {
    id: id,
    ...data,
  };
  await apiService.put(`${API_ENDPOINT}/update`, body);
};

export const deleteVoucherTypeService = async (id: number): Promise<void> => {
  await apiService.delete(`${API_ENDPOINT}/delete/${id}`);
};

export const restoreVoucherTypeService = async (id: number): Promise<void> => {
  await apiService.patch(`${API_ENDPOINT}/restore/${id}`);
};

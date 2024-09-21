import { MeasurementUnitFormData, MeasurementUnitResponse } from '@/models';

import ApiService from '../apiService';

const API_ENDPOINT = 'measurement-units';

const apiService = new ApiService({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7120/api/v1/',
  defaultHeaders: {
    // Aquí puedes agregar headers por defecto, como tokens de autenticación
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const fetchMeasurementUnits = async (
  page: number,
  pageSize: number,
  searchTerm: string,
): Promise<MeasurementUnitResponse> => {
  const response = await apiService.post<MeasurementUnitResponse>(`${API_ENDPOINT}/pagination`, {
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

export const registerMeasurementUnitService = async (data: MeasurementUnitFormData): Promise<void> => {
  await apiService.post(`${API_ENDPOINT}/register`, { ...data });
};

export const updateMeasurementUnitService = async (id: number, data: MeasurementUnitFormData): Promise<void> => {
  const body = {
    id: id,
    ...data,
  };
  await apiService.put(`${API_ENDPOINT}/update`, body);
};

export const deleteMeasurementUnitService = async (id: number): Promise<void> => {
  await apiService.delete(`${API_ENDPOINT}/delete/${id}`);
};

export const restoreMeasurementUnitService = async (id: number): Promise<void> => {
  await apiService.patch(`${API_ENDPOINT}/restore/${id}`);
};

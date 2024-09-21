export interface MeasurementUnit {
  id: number;
  name: string;
  prefix?: string;
  description?: string;
  status: boolean;
}

export interface MeasurementUnitResponse {
  data: MeasurementUnit[];
  totalPages: number;
  pageIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type MeasurementUnitFormData = Omit<MeasurementUnit, 'id' | 'status'>;

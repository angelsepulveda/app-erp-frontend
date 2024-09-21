import { EndPointMeasurementUnitDatagrid } from '@/app/(routes)/(warehouses)/measurement-units/components/utils';
import { MeasurementUnit, MeasurementUnitResponse } from '@/models';
import { fetchMeasurementUnits } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import * as z from 'zod';

import { Column } from '@/components';

export const useMeasurementUnit = () => {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMeasurementUnit, setEditingMeasurementUnit] = useState<MeasurementUnit | null>(null);
  const [deletingMeasurementUnit, setDeletingMeasurementUnit] = useState<MeasurementUnit | null>(null);
  const [restoreMeasurementUnit, setRestoreMeasurementUnit] = useState<MeasurementUnit | null>(null);
  const pageSize = 5;

  const measurementUnitSchema = z.object({
    name: z
      .string()
      .min(2, 'Nombre debe tener al menos 2 caracteres')
      .max(50, 'Nombre no debe superar los 50 caracteres'),
    prefix: z.string().max(6, 'Descripción no debe superar los 6 caracteres'),
    description: z.string().max(255, 'Descripción no debe superar los 255 caracteres'),
  });

  type MeasurementUnitFormData = z.infer<typeof measurementUnitSchema>;

  const form = useForm<MeasurementUnitFormData>({
    resolver: zodResolver(measurementUnitSchema),
    defaultValues: {
      name: '',
      prefix: '',
      description: '',
    },
  });

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  const { data, error, isLoading } = useSWR<MeasurementUnitResponse>(EndPointMeasurementUnitDatagrid, () =>
    fetchMeasurementUnits(page, pageSize, searchTerm),
  );
  useEffect(() => {
    mutate(EndPointMeasurementUnitDatagrid);
  }, [page, pageSize, searchTerm]);

  const handleEdit = (measurementUnit: MeasurementUnit) => {
    setEditingMeasurementUnit(measurementUnit);
    setIsModalOpen(true);
  };

  const columns: Column<MeasurementUnit>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'prefix', header: 'Prefijo' },
    { key: 'description', header: 'Descripcion' },
    {
      key: 'status',
      header: 'Estado',
      render: (measurementUnit: MeasurementUnit) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            measurementUnit.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {measurementUnit.status ? 'Activo' : 'Desactivado'}
        </span>
      ),
    },
  ];

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingMeasurementUnit(null);
    }
  };

  const handleDelete = (measurementUnit: MeasurementUnit) => {
    setDeletingMeasurementUnit(measurementUnit);
    setIsDeleteModalOpen(true);
  };

  const handleActivate = (measurementUnit: MeasurementUnit) => {
    setRestoreMeasurementUnit(measurementUnit);
    setIsRestoreModalOpen(true);
  };

  return {
    handleActivate,
    handleDelete,
    handleModalOpenChange,
    handleEdit,
    data,
    error,
    isLoading,
    isModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    editingMeasurementUnit,
    restoreMeasurementUnit,
    deletingMeasurementUnit,
    page,
    form,
    setPage,
    setSearchTerm,
    columns,
    pageSize,
    setEditingMeasurementUnit,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setRestoreMeasurementUnit,
    setDeletingMeasurementUnit,
    handleSearch,
  };
};

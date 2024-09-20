import { Brand, BrandResponse } from '@/models';
import { fetchBrands } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import * as z from 'zod';

import { Column } from '@/components';

import { EndPointBrandDatagrid } from '../utils';

export const useBrand = () => {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<Brand | null>(null);
  const [restoreBrand, setRestoreBrand] = useState<Brand | null>(null);
  const pageSize = 5;

  const brandSchema = z.object({
    name: z
      .string()
      .min(2, 'Nombre debe tener al menos 2 caracteres')
      .max(50, 'Nombre no debe superar los 50 caracteres'),
    description: z.string().max(255, 'Descripción no debe superar los 255 caracteres'),
  });

  type BrandFormData = z.infer<typeof brandSchema>;

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  const { data, error, isLoading } = useSWR<BrandResponse>(EndPointBrandDatagrid, () =>
    fetchBrands(page, pageSize, searchTerm),
  );
  useEffect(() => {
    mutate(EndPointBrandDatagrid);
  }, [page, pageSize, searchTerm]);

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const columns: Column<Brand>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'description', header: 'Descripcion' },
    {
      key: 'status',
      header: 'Estado',
      render: (brand: Brand) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            brand.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {brand.status ? 'Activo' : 'Desactivado'}
        </span>
      ),
    },
  ];

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingBrand(null);
    }
  };

  const handleDelete = (brand: Brand) => {
    setDeletingBrand(brand);
    setIsDeleteModalOpen(true);
  };

  const handleActivate = (brand: Brand) => {
    setRestoreBrand(brand);
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
    editingBrand,
    restoreBrand,
    deletingBrand,
    page,
    form,
    setPage,
    setSearchTerm,
    columns,
    pageSize,
    setEditingBrand,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setRestoreBrand,
    setDeletingBrand,
    handleSearch,
  };
};

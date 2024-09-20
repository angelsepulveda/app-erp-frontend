import { Category, CategoryResponse } from '@/models';
import { fetchCategories } from '@/services/warehouses/categoryService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import * as z from 'zod';

import { Column } from '@/components';

import { EndPointCategoryDatagrid } from '../utils';

export const useCategory = () => {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [restoreCategory, setRestoreCategory] = useState<Category | null>(null);
  const pageSize = 5;

  const categorySchema = z.object({
    name: z
      .string()
      .min(2, 'Nombre debe tener al menos 2 caracteres')
      .max(50, 'Nombre no debe superar los 50 caracteres'),
    description: z.string().max(255, 'Descripción no debe superar los 255 caracteres'),
  });

  type CategoryFormData = z.infer<typeof categorySchema>;

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  const { data, error, isLoading } = useSWR<CategoryResponse>(EndPointCategoryDatagrid, () =>
    fetchCategories(page, pageSize, searchTerm),
  );
  useEffect(() => {
    mutate(EndPointCategoryDatagrid);
  }, [page, pageSize, searchTerm]);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const columns: Column<Category>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'description', header: 'Descripcion' },
    {
      key: 'status',
      header: 'Estado',
      render: (category: Category) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            category.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {category.status ? 'Activo' : 'Desactivado'}
        </span>
      ),
    },
  ];

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingCategory(null);
    }
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleActivate = (category: Category) => {
    setRestoreCategory(category);
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
    editingCategory,
    restoreCategory,
    deletingCategory,
    page,
    form,
    setPage,
    setSearchTerm,
    columns,
    pageSize,
    setEditingCategory,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setRestoreCategory,
    setDeletingCategory,
    handleSearch,
  };
};

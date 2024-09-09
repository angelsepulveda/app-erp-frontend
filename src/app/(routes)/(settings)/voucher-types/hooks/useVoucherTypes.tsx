import { EndPointVoucherTypeDatagrid } from '@/app/(routes)/(settings)/voucher-types/utils';
import { VoucherType, VoucherTypeResponse } from '@/models';
import { fetchDocumentTypes, fetchVoucherTypesService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import * as z from 'zod';

import { Column } from '@/components';

export const UseVoucherTypes = () => {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState<VoucherType | null>(null);
  const [deleting, setDeleting] = useState<VoucherType | null>(null);
  const [restore, setRestore] = useState<VoucherType | null>(null);
  const pageSize = 5;

  const voucherTypeSchema = z.object({
    name: z
      .string()
      .min(2, 'Nombre debe tener al menos 2 caracteres')
      .max(20, 'Nombre no debe superar los 20 caracteres'),
    description: z.string().max(255, 'Descripción no debe superar los 255 caracteres'),
    code: z.string().max(10, 'El codigo no debe superar los 10 caracteres'),
  });

  type VoucherTypeFormData = z.infer<typeof voucherTypeSchema>;

  const form = useForm<VoucherTypeFormData>({
    resolver: zodResolver(voucherTypeSchema),
    defaultValues: {
      name: '',
      description: '',
      code: '',
    },
  });

  const { data, error, isLoading } = useSWR<VoucherTypeResponse>(EndPointVoucherTypeDatagrid, () =>
    fetchVoucherTypesService(page, pageSize, searchTerm),
  );

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  useEffect(() => {
    // Fetch new data when page or search term changes
    mutate(EndPointVoucherTypeDatagrid);
  }, [page, pageSize, searchTerm]);

  const handleEdit = (voucherType: VoucherType) => {
    setEditing(voucherType);
    setIsModalOpen(true);
  };

  const columns: Column<VoucherType>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'code', header: 'Codigo' },
    { key: 'description', header: 'Descripcion' },
    {
      key: 'status',
      header: 'Estado',
      render: (voucherType) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            voucherType.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {voucherType.status ? 'Activo' : 'Desactivado'}
        </span>
      ),
    },
  ];

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditing(null);
    }
  };

  const handleDelete = (voucherType: VoucherType) => {
    setDeleting(voucherType);
    setIsDeleteModalOpen(true);
  };

  const handleActivate = (voucherType: VoucherType) => {
    setRestore(voucherType);
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
    editing,
    restore,
    deleting,
    page,
    form,
    setPage,
    setSearchTerm,
    columns,
    pageSize,
    setEditing,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setRestore,
    setDeleting,
    handleSearch,
  };
};

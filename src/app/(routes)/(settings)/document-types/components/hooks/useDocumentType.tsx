import { EndPointDocumentTypeDatagrid } from '@/app/(routes)/(settings)/document-types/components/utils';
import { DocumentType, DocumentTypeResponse } from '@/models/settings/documentType';
import { fetchDocumentTypes } from '@/services/settings/useService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import * as z from 'zod';

import { Column } from '@/components';

export const useDocumentType = () => {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDocumentType, setEditingDocumentType] = useState<DocumentType | null>(null);
  const [deletingDocumentType, setDeletingDocumentType] = useState<DocumentType | null>(null);
  const [restoreDocumentType, setRestoreDocumentType] = useState<DocumentType | null>(null);
  const pageSize = 5;

  const documentTypeSchema = z.object({
    name: z
      .string()
      .min(2, 'Nombre debe tener al menos 2 caracteres')
      .max(20, 'Nombre no debe superar los 20 caracteres'),
    description: z.string().max(255, 'Descripción no debe superar los 255 caracteres'),
    code: z.string().max(10, 'El codigo no debe superar los 10 caracteres'),
  });

  type DocumentTypeFormData = z.infer<typeof documentTypeSchema>;

  const form = useForm<DocumentTypeFormData>({
    resolver: zodResolver(documentTypeSchema),
    defaultValues: {
      name: '',
      description: '',
      code: '',
    },
  });

  const { data, error, isLoading } = useSWR<DocumentTypeResponse>(EndPointDocumentTypeDatagrid, () =>
    fetchDocumentTypes(page, pageSize, searchTerm),
  );

  useEffect(() => {
    // Fetch new data when page or search term changes
    mutate(EndPointDocumentTypeDatagrid);
  }, [page, pageSize, searchTerm]);

  const handleEdit = (documentType: DocumentType) => {
    setEditingDocumentType(documentType);
    setIsModalOpen(true);
  };

  const columns: Column<DocumentType>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'code', header: 'Codigo' },
    { key: 'description', header: 'Descripcion' },
    {
      key: 'status',
      header: 'Estado',
      render: (documentType) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            documentType.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {documentType.status ? 'Activo' : 'Desactivado'}
        </span>
      ),
    },
  ];

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingDocumentType(null);
    }
  };

  const handleDelete = (user: DocumentType) => {
    setDeletingDocumentType(user);
    setIsDeleteModalOpen(true);
  };

  const handleActivate = (user: DocumentType) => {
    setRestoreDocumentType(user);
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
    editingDocumentType,
    restoreDocumentType,
    deletingDocumentType,
    page,
    form,
    setPage,
    setSearchTerm,
    columns,
    pageSize,
    setEditingDocumentType,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setRestoreDocumentType,
    setDeletingDocumentType,
  };
};

'use client';

import { DocumentType } from '@/models/settings/documentType';
import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';

import { Button, Column, DataGrid } from '@/components';

import { DeleteDocumentType, FormDocumentType, RestoreDocumentType } from './partials';

interface ApiResponse {
  data: DocumentType[];
  totalPages: number;
  pageIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface Request {
  pageIndex: number;
  pageSize: number;
}

const fetcher = (url: string, { arg }: { arg: Request }) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());

export const DocumentTypes = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDocumentType, setEditingDocumentType] = useState<DocumentType | null>(null);
  const [deletingDocumentType, setDeletingDocumentType] = useState<DocumentType | null>(null);
  const [restoreDocumentType, setRestoreDocumentType] = useState<DocumentType | null>(null);
  const pageSize = 5;
  const form = useForm<Omit<DocumentType, 'id' | 'status'>>();

  const { data, error, isLoading } = useSWR<ApiResponse>(
    'https://localhost:7120/api/v1/document-types/pagination',
    (url: string) =>
      fetcher(url, {
        arg: { pageIndex: page, pageSize },
      }),
  );

  useEffect(() => {
    // Fetch new data when page or search term changes
    mutate('https://localhost:7120/api/v1/document-types/pagination');
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

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <FormDocumentType
          isModalOpen={isModalOpen}
          handleModalOpenChange={handleModalOpenChange}
          editingDocumentType={editingDocumentType}
          setEditingDocumentType={setEditingDocumentType}
          form={form}
          mutate={mutate}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <DataGrid<DocumentType>
        columns={columns}
        data={data?.data || []}
        total={data?.totalPages || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onSearch={setSearchTerm}
        isLoading={isLoading}
        actions={(item) => (
          <>
            <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="mr-2">
              <PencilIcon className="mr-1 h-4 w-4" />
              Editar
            </Button>
            {item.status ? (
              <Button variant="outline" size="sm" onClick={() => handleDelete(item)}>
                <TrashIcon className="mr-1 h-4 w-4" />
                Eliminar
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleActivate(item)}>
                <CheckIcon className="mr-1 h-4 w-4" />
                Activar
              </Button>
            )}
          </>
        )}
      />
      <DeleteDocumentType
        deletingDocumentType={deletingDocumentType}
        setDeletingDocumentType={setDeletingDocumentType}
        mutate={mutate}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <RestoreDocumentType
        restoreDocumentType={restoreDocumentType}
        setRestoreDocumentType={setRestoreDocumentType}
        mutate={mutate}
        isRestoreModalOpen={isRestoreModalOpen}
        setIsRestoreModalOpen={setIsRestoreModalOpen}
      />
    </div>
  );
};

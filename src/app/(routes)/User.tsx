'use client';

import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';

import {
  Column,
  DataGrid,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  DialogTrigger,
  Form,
} from '@/components';

interface User {
  id: number;
  name: string;
  code?: string;
  description?: string;
  status: boolean;
}

interface ApiResponse {
  data: User[];
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

export default function UserComponent() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 5;
  const form = useForm<Omit<User, 'id' | 'status'>>();
  const apiEndpoint = 'https://localhost:7120/api/v1/document-types/register';

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

  const columns: Column<User>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'code', header: 'Codigo' },
    { key: 'description', header: 'Descripcion' },
    {
      key: 'status',
      header: 'Estado',
      render: (user) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            user.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {user.status ? 'Activo' : 'Desactivado'}
        </span>
      ),
    },
  ];

  const handleEdit = (id: number) => {
    console.log(`Edit item with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete item with id: ${id}`);
  };

  const onSubmit = async (formData: Omit<User, 'id' | 'status'>) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        form.reset();
        // Revalidate the data
        mutate('https://localhost:7120/api/v1/document-types/pagination');
      } else {
        console.error('Failed to add new record');
      }
    } catch (error) {
      console.error('Error adding new record:', error);
    }
  };

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar nuevo registro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo registro</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DataGrid<User>
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
            <Button variant="outline" size="sm" onClick={() => handleEdit(item.id)} className="mr-2">
              <PencilIcon className="mr-1 h-4 w-4" />
              Editar
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
              <TrashIcon className="mr-1 h-4 w-4" />
              Eliminar
            </Button>
          </>
        )}
      />
    </div>
  );
}

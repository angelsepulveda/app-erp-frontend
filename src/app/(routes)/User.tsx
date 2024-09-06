'use client';

import { CheckIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
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
  DialogFooter,
  DialogDescription,
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivingModalOpen, setIsActivingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [activingUser, setActivingUser] = useState<User | null>(null);
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

  useEffect(() => {
    if (editingUser) {
      form.reset({
        name: editingUser.name,
        code: editingUser.code,
        description: editingUser.description,
      });
    } else {
      form.reset({
        name: '',
        code: '',
        description: '',
      });
    }
  }, [editingUser, form, isModalOpen]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

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

  const onSubmit = async (formData: Omit<User, 'id' | 'status'>) => {
    try {
      const url = editingUser ? `https://localhost:7120/api/v1/document-types/update` : apiEndpoint;
      const method = editingUser ? 'PUT' : 'POST';
      const body = editingUser ? { ...formData, id: editingUser.id } : { ...formData };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingUser(null);
        form.reset();
        await mutate('https://localhost:7120/api/v1/document-types/pagination');
      } else {
        console.error('Failed to save record');
      }
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingUser(null);
    }
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleActivate = (user: User) => {
    setActivingUser(user);
    setIsActivingModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingUser) {
      try {
        const response = await fetch(`https://localhost:7120/api/v1/document-types/delete/${deletingUser.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setIsDeleteModalOpen(false);
          setDeletingUser(null);
          await mutate('https://localhost:7120/api/v1/document-types/pagination');
        } else {
          console.error('Failed to delete record');
        }
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const confirmActivate = async () => {
    if (activingUser) {
      try {
        const response = await fetch(`https://localhost:7120/api/v1/document-types/restore/${activingUser.id}`, {
          method: 'PATCH',
        });

        if (response.ok) {
          setIsActivingModalOpen(false);
          setActivingUser(null);
          await mutate('https://localhost:7120/api/v1/document-types/pagination');
        } else {
          console.error('Failed to delete record');
        }
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const handleDeleteModalOpenChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setDeletingUser(null);
    }
  };

  const handleActivateModalOpenChange = (open: boolean) => {
    setIsActivingModalOpen(open);
    if (!open) {
      setDeletingUser(null);
    }
  };

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
          <DialogTrigger asChild>
            <Button variant="default">
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar nuevo registro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Editar registro' : 'Agregar nuevo registro'}</DialogTitle>
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
      <Dialog open={isDeleteModalOpen} onOpenChange={handleDeleteModalOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>¿Esta seguro de eliminar el tipo de documento: {deletingUser?.name}?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isActivingModalOpen} onOpenChange={handleActivateModalOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar restauración</DialogTitle>
            <DialogDescription>¿Esta seguro de restaurar el tipo de documento: {deletingUser?.name}?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsActivingModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="default" onClick={confirmActivate}>
              Activar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

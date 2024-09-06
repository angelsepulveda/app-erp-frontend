'use client';

import { DocumentType } from '@/models/settings/documentType';
import { PlusIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScopedMutator } from 'swr/_internal';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@/components';

type TFormDocumentTypeProps = {
  isModalOpen: boolean;
  handleModalOpenChange: (open: boolean) => void;
  editingDocumentType: DocumentType | null;
  setEditingDocumentType: Dispatch<SetStateAction<DocumentType | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const FormDocumentType = ({
  editingDocumentType,
  handleModalOpenChange,
  isModalOpen,
  form,
  mutate,
  setIsModalOpen,
  setEditingDocumentType,
}: TFormDocumentTypeProps) => {
  const onSubmit = async (formData: Omit<DocumentType, 'id' | 'status'>) => {
    try {
      const url = editingDocumentType
        ? `https://localhost:7120/api/v1/document-types/update`
        : 'https://localhost:7120/api/v1/document-types/register';
      const method = editingDocumentType ? 'PUT' : 'POST';
      const body = editingDocumentType ? { ...formData, id: editingDocumentType.id } : { ...formData };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingDocumentType(null);
        form.reset();
        await mutate('https://localhost:7120/api/v1/document-types/pagination');
      } else {
        console.error('Failed to save record');
      }
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  useEffect(() => {
    if (editingDocumentType) {
      form.reset({
        name: editingDocumentType.name,
        code: editingDocumentType.code,
        description: editingDocumentType.description,
      });
    } else {
      form.reset({
        name: '',
        code: '',
        description: '',
      });
    }
  }, [editingDocumentType, form, isModalOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="mr-2 h-4 w-4" />
          Agregar nuevo registro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingDocumentType ? 'Editar registro' : 'Agregar nuevo registro'}</DialogTitle>
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
  );
};

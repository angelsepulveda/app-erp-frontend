'use client';

import { Brand } from '@/models';
import { PlusIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
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
  FormMessage,
  Input,
} from '@/components';

import { useFormBrand } from '../hooks';

type TFormBrandProps = {
  isModalOpen: boolean;
  handleModalOpenChange: (open: boolean) => void;
  editingBrand: Brand | null;
  setEditingBrand: Dispatch<SetStateAction<Brand | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const FormBrand = ({
  editingBrand,
  handleModalOpenChange,
  isModalOpen,
  form,
  mutate,
  setIsModalOpen,
  setEditingBrand,
}: TFormBrandProps) => {
  const dataUse = {
    editingBrand,
    isModalOpen,
    form,
    mutate,
    setIsModalOpen,
    setEditingBrand,
  };

  const { onSubmit } = useFormBrand(dataUse);

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
          <DialogTitle>{editingBrand ? 'Editar registro' : 'Agregar nuevo registro'}</DialogTitle>
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
                  <FormMessage />
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
                  <FormMessage />
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

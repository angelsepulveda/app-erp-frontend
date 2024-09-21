'use client';

import { MeasurementUnit } from '@/models';
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

import { useFormMeasurementUnit } from '../hooks';

type TFormMeasurementUnitProps = {
  isModalOpen: boolean;
  handleModalOpenChange: (open: boolean) => void;
  editingMeasurementUnit: MeasurementUnit | null;
  setEditingMeasurementUnit: Dispatch<SetStateAction<MeasurementUnit | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const FormMeasurementUnit = ({
  editingMeasurementUnit,
  handleModalOpenChange,
  isModalOpen,
  form,
  mutate,
  setIsModalOpen,
  setEditingMeasurementUnit,
}: TFormMeasurementUnitProps) => {
  const dataUse = {
    editingMeasurementUnit,
    isModalOpen,
    form,
    mutate,
    setIsModalOpen,
    setEditingMeasurementUnit,
  };

  const { onSubmit } = useFormMeasurementUnit(dataUse);

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
          <DialogTitle>{editingMeasurementUnit ? 'Editar registro' : 'Agregar nuevo registro'}</DialogTitle>
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
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prefijo</FormLabel>
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

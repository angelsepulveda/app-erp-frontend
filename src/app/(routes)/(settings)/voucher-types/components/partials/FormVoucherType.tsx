import { UseFormVoucherType } from '@/app/(routes)/(settings)/voucher-types/hooks';
import { VoucherType } from '@/models';
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

type TFormVoucherTypeProps = {
  isModalOpen: boolean;
  handleModalOpenChange: (open: boolean) => void;
  editing: VoucherType | null;
  setEditing: Dispatch<SetStateAction<VoucherType | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const FormVoucherType = ({
  editing,
  handleModalOpenChange,
  isModalOpen,
  form,
  mutate,
  setIsModalOpen,
  setEditing,
}: TFormVoucherTypeProps) => {
  const dataUse = {
    editing,
    isModalOpen,
    form,
    mutate,
    setIsModalOpen,
    setEditing,
  };

  const { onSubmit } = UseFormVoucherType(dataUse);

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
          <DialogTitle>{editing ? 'Editar registro' : 'Agregar nuevo registro'}</DialogTitle>
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
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

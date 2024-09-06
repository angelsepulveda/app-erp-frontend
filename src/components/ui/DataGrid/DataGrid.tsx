'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Input,
} from '@/components';

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  onSearch: (term: string) => void;
  isLoading: boolean;
  actions?: (item: T) => React.ReactNode;
}

export function DataGrid<T extends { id: number | string }>({
  columns,
  data,
  total,
  page,
  onPageChange,
  onSearch,
  isLoading,
  actions,
}: DataGridProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const totalPages = total;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === page ? 'default' : 'outline'}
          onClick={() => onPageChange(i)}
          className="h-10 w-10 p-0"
        >
          {i}
        </Button>,
      );
    }

    return buttons;
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Input placeholder="Search..." value={searchTerm} onChange={handleSearch} className="max-w-sm" />
      </div>

      {/* Table view for larger screens */}
      <div className="hidden rounded-md border xl:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>{column.header}</TableHead>
              ))}
              {actions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>
                    {column.render ? column.render(item) : String(item[column.key])}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(item)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card view for mobile screens */}
      <div className="grid grid-cols-1 gap-4 xl:hidden">
        {data.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{String(item[columns[0].key])}</CardTitle>
            </CardHeader>
            <CardContent>
              {columns.slice(1).map((column) => (
                <p key={String(column.key)} className="mb-2 text-sm text-muted-foreground">
                  {column.header}: {column.render ? column.render(item) : String(item[column.key])}
                </p>
              ))}
              {actions && <div className="mt-4 flex space-x-2">{actions(item)}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Button variant="outline" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          {renderPaginationButtons()}
          <Button variant="outline" onClick={() => onPageChange(Math.min(page + 1))} disabled={page === totalPages}>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </div>
      )}
    </div>
  );
}

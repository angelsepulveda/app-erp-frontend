import { Skeleton } from '@/components';

type TSkeletonDataGridProps = {
  columns: number;
  rows: number;
};

export const SkeletonDataGrid = ({ columns, rows }: TSkeletonDataGridProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <div className="bg-gray-100 p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array(columns)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-6" />
              ))}
          </div>
        </div>
        <div className="divide-y">
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <div key={rowIndex} className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  {Array(columns)
                    .fill(0)
                    .map((_, colIndex) => (
                      <Skeleton key={colIndex} className="h-6" />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[100px]" />
        <div className="flex space-x-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 w-10" />
            ))}
        </div>
      </div>
    </div>
  );
};

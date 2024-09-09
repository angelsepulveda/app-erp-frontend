import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@/components';

type TSkeletonDataGridMobileProps = {
  count: number;
};

export const SkeletonDataGridMobile = ({ count }: TSkeletonDataGridMobileProps) => {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

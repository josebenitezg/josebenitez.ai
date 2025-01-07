import { Card, Skeleton } from "@nextui-org/react";

export default function PaperSkeleton() {
  return (
    <Card className="w-full p-4 space-y-5 glassmorphism neural-glow" radius="lg">
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full">
            <div className="h-8 w-8 rounded-full bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-24 rounded-lg">
            <div className="h-4 w-24 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="w-full rounded-lg">
          <div className="h-4 w-full rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-16 rounded-full">
            <div className="h-6 w-16 rounded-full bg-default-200"></div>
          </Skeleton>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Skeleton className="w-24 rounded-lg">
          <div className="h-4 w-24 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-24 rounded-lg">
          <div className="h-4 w-24 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
} 
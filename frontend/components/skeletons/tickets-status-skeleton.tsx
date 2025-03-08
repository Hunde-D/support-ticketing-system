import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TicketStatusSkeleton() {
  return (
    <Card className="rounded-lg border-none shadow-none max-sm:hidden p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-24" />
      </div>
      <div className="mt-4 space-y-2">
        {/* Open status skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-yellow-500 opacity-40"></div>
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-5 w-6" />
        </div>

        {/* In-Progress status skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-blue-500 opacity-40"></div>
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-5 w-6" />
        </div>

        {/* Closed status skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 opacity-40"></div>
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-5 w-6" />
        </div>
      </div>
    </Card>
  );
}

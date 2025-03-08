import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TicketItemSkeleton() {
  const skeletonItems = Array.from({ length: 3 }, (_, i) => i);

  return (
    <>
      {skeletonItems.map((item) => (
        <Card key={item} className="h-fit w-full">
          <CardContent className="py-4">
            <div className="flex gap-6">
              <div className="flex-1 space-y-3">
                {/* Title skeleton */}
                <Skeleton className="h-6 w-3/4" />

                {/* Description skeleton - two lines */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                {/* Badge skeleton */}
                <div className="mt-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

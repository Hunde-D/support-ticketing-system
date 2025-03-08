import { getTickets } from "@/actions/ticket-action";
import Filters from "@/components/filters";
import Header from "@/components/header";
import { MobileMenu } from "@/components/mobile-menu";
import { TicketItemSkeleton } from "@/components/skeletons/ticket-skeleton";
import { TicketStatusSkeleton } from "@/components/skeletons/tickets-status-skeleton";
import TicketItem from "@/components/tickets/ticket-item";
import TicketStatus from "@/components/tickets/tickets-status";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function TicketPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-screen mx-auto container grid content-start md:gap-6 md:flex p-5">
        <div className="space-y-6">
          <div className="rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold">Support Ticketing System</h1>
                <p className="text-sm opacity-90">Ticket Board</p>
              </div>
              <MobileMenu />
            </div>
          </div>
          {/* ticket status */}
          <Suspense fallback={<TicketStatusSkeleton />}>
            <TicketStatus />
          </Suspense>
        </div>
        <div className="grid content-start space-y-4 h-full overflow-hidden">
          {/* header */}
          <Header />
          {/* filters */}
          <Suspense fallback={<div>loading</div>}>
            <Filters />
          </Suspense>
          <div className=" h-full overflow-y-auto  grid gap-4">
            {/* ticket */}
            <Suspense fallback={<TicketItemSkeleton />}>
              <TicketItem />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}

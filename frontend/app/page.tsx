import { getTickets } from "@/actions/server-ticket-action";
import Filters from "@/components/filters";
import Header from "@/components/header";
import TicketItem from "@/components/ticket-item";
import TicketStatus from "@/components/tickets-status";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function TicketPage() {
  // const tickets = await getTickets();
  const queryClient = getQueryClient();

  // look ma, no await
  queryClient.prefetchQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-screen mx-auto container grid content-start md:gap-6 md:flex p-5">
        <div className="space-y-6">
          <div className="rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-6 text-white">
            <h1 className="text-lg font-bold">Support Ticketing System</h1>
            <p className="text-sm opacity-90">Ticket Board</p>
          </div>
          <TicketStatus />
        </div>
        <div className="grid content-start space-y-4 h-full overflow-hidden">
          <Header />
          <Filters />
          <div className=" h-full overflow-y-auto  grid gap-4">
            <TicketItem />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}

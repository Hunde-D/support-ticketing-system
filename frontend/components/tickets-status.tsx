"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { getTickets } from "@/actions/ticket-action";
import { Ticket } from "@/lib/types";

const TicketStatus = () => {
  const { data: tickets } = useSuspenseQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });
  const openCount = tickets.filter(
    (ticket: Ticket) => ticket.status.toLowerCase() === "open"
  ).length;
  const inProgressCount = tickets.filter(
    (ticket: Ticket) => ticket.status.toLowerCase() === "in-progress"
  ).length;
  const closedCount = tickets.filter(
    (ticket: Ticket) => ticket.status.toLowerCase() === "closed"
  ).length;

  return (
    <Card className="rounded-lg border-none shadow-none max-sm:hidden p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold cursor-pointer">Tickets</h2>
      </div>
      <div className="mt-4 space-y-2 text-muted-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <span className="">Open</span>
          </div>
          <span className=" ">{openCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="">In-Progress</span>
          </div>
          <span className=" ">{inProgressCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span className="">Closed</span>
          </div>
          <span className=" text-muted-foreground">{closedCount}</span>
        </div>
      </div>
    </Card>
  );
};

export default TicketStatus;

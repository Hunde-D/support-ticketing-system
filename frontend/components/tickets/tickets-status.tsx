"use client";
import { useTickets } from "@/hooks/useTickets";
import { Card } from "../ui/card";

const TicketStatus = () => {
  const { openCount, inProgressCount, closedCount } = useTickets();

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

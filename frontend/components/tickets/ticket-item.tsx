"use client";
import { Fragment, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { TicketDialog } from "./ticket-dialog";
import { useTickets } from "@/hooks/useTickets";
import { getCategoryColor } from "@/lib/utils";
import { Ticket } from "@/lib/types";
import { useUpdateTicket } from "@/hooks/useUpdateTickets";
import { EmptyState } from "../skeletons/no-ticket-skeleton";

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const updateTicket = useUpdateTicket(() => setIsDialogOpen(false));

  return (
    <>
      <Card
        className="h-fit w-full cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent>
          <div className="flex gap-6">
            <div className="flex-1">
              <h3 className="font-bold">{ticket.title}</h3>
              <p className="mt-1 text-muted-foreground text-wrap">
                {ticket.description}
              </p>
              <div className="mt-3">
                <Badge variant="outline" className="rounded-full gap-1.5 py-1">
                  <span
                    className={`size-1.5 rounded-full ${getCategoryColor(
                      ticket.status
                    )}`}
                    aria-hidden="true"
                  ></span>
                  <span className="capitalize">{ticket.status}</span>
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <TicketDialog
        ticket={ticket}
        open={isDialogOpen}
        onChangeAction={setIsDialogOpen}
        onSaveAction={updateTicket}
      />
    </>
  );
};

const TicketItem = () => {
  const { filteredTickets, status } = useTickets();

  if (filteredTickets.length === 0) return <EmptyState status={status} />;

  return (
    <>
      {filteredTickets.map((ticket: Ticket) => (
        <Fragment key={ticket._id}>
          <TicketCard ticket={ticket} />
        </Fragment>
      ))}
    </>
  );
};

export default TicketItem;

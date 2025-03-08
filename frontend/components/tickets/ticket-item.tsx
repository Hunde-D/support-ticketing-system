"use client";
import { Fragment, useState } from "react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { getTickets, updateTicket } from "@/actions/ticket-action";
import { Ticket } from "@/lib/types";
import { TicketDialog } from "./ticket-dialog";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { getCategoryColor } from "@/lib/utils";
import { TicketIcon } from "lucide-react";

const TicketItem = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = getQueryClient();

  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";

  const { data: tickets } = useSuspenseQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const filteredTickets = tickets?.filter((ticket: Ticket) => {
    if (status === "all") return true;
    console.log("=>", ticket.status, status);
    return ticket.status.toLowerCase() === status.toLowerCase();
  });

  const { mutateAsync: mutateTicket } = useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Support ticket updated successfully!");
      setIsDialogOpen(false);
    },
  });
  if (filteredTickets.length === 0) {
    return (
      <Card className="w-full h-64 flex items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <TicketIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {status === "all"
              ? "You don't have any support tickets yet. Create your first ticket to get started."
              : `No tickets with status "${status}" were found. Try changing your filter or create a new ticket.`}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {filteredTickets?.map((ticket: Ticket) => (
        <Fragment key={ticket._id}>
          <Card
            className="h-fit w-full cursor-pointer"
            key={ticket._id}
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="">
              <div className="flex gap-6">
                <div className="flex-1">
                  <h3 className="font-bold">{ticket.title}</h3>
                  <p className="mt-1 text-muted-foreground text-wrap">
                    {ticket.description}
                  </p>
                  <div className="mt-3">
                    <Badge
                      variant="outline"
                      className="rounded-full gap-1.5 py-1 "
                    >
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
            onSaveAction={mutateTicket}
          />
        </Fragment>
      ))}
    </>
  );
};

export default TicketItem;

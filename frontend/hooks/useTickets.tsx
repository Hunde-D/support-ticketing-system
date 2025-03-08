"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTickets } from "@/actions/ticket-action";
import { useSearchParams } from "next/navigation";
import { Ticket } from "@/lib/types";

export const useTickets = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";

  const { data: tickets = [] } = useSuspenseQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const filteredTickets = tickets.filter((ticket: Ticket) =>
    status === "all"
      ? true
      : ticket.status.toLowerCase() === status.toLowerCase()
  );

  const openCount = tickets.filter(
    (ticket: Ticket) => ticket.status.toLowerCase() === "open"
  ).length;
  const inProgressCount = tickets.filter(
    (ticket: Ticket) => ticket.status.toLowerCase() === "in-progress"
  ).length;
  const closedCount = tickets.filter(
    (ticket: Ticket) => ticket.status.toLowerCase() === "closed"
  ).length;

  return {
    filteredTickets,
    status,
    tickets,
    openCount,
    inProgressCount,
    closedCount,
  };
};

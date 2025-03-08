"use client";
import { useMutation } from "@tanstack/react-query";
import { updateTicket } from "@/actions/ticket-action";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { toast } from "sonner";

export const useUpdateTicket = (onSuccessCallback?: () => void) => {
  const queryClient = getQueryClient();

  const { mutateAsync: updateTicketMutation } = useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Support ticket updated successfully!");
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  return updateTicketMutation;
};

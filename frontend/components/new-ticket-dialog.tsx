"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketSchema } from "@/lib/types";
import { createTicket } from "@/actions/server-ticket-action";

function AddNew() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      toast.success("Support ticket created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tickets"] }); // Refresh ticket list
      form.reset();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Ticket creation error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create ticket. Please try again."
      );
    },
  });

  const onSubmit = (values: z.infer<typeof ticketSchema>) => {
    mutateAsync(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="linkHover2"
          size="sm"
          className="border hover:bg-muted"
        >
          + Add Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Support Ticket</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit a new support ticket. Our team
            will respond as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief description of your issue"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details about your issue"
                      rows={4}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row sm:justify-end">
              <Button
                type="submit"
                className="rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
                disabled={isPending}
                aria-live="polite"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Creating ticket...</span>
                  </>
                ) : (
                  "Send feedback"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { AddNew };

"use client";
import { useState } from "react";
import { CalendarIcon, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";
interface TicketDialogProps {
  ticket: Ticket;
  open: boolean;
  onChangeAction: (open: boolean) => void;
  onSaveAction: ({ id, status }: { id: string; status: string }) => void;
}

export function TicketDialog({
  ticket,
  open,
  onChangeAction,
  onSaveAction,
}: TicketDialogProps) {
  const [editedTicket, setEditedTicket] = useState<Ticket>({ ...ticket });

  const handleSave = () => {
    onSaveAction({ id: editedTicket._id, status: editedTicket.status });
    onChangeAction(false);
  };

  return (
    <Dialog open={open} onOpenChange={onChangeAction}>
      <DialogContent className="max-w-2xl text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Ticket Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-4 rounded-md  p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Ticket ID:
              </span>
              <span className="text-sm text-gray-300">{editedTicket._id}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Created: {formatDate(editedTicket.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Time: {formatTime(editedTicket.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                {editedTicket.user?.email}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editedTicket.status}
                onValueChange={(value) =>
                  setEditedTicket({ ...editedTicket, status: value })
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="open">
                    <span
                      className="size-1.5 rounded-full bg-yellow-500"
                      aria-hidden="true"
                    ></span>
                    Open
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <span
                      className="size-1.5 rounded-full bg-blue-500"
                      aria-hidden="true"
                    ></span>
                    In Progress
                  </SelectItem>
                  <SelectItem value="closed">
                    <span
                      className="size-1.5 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    ></span>
                    Closed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedTicket.title}
                onChange={(e) =>
                  setEditedTicket({ ...editedTicket, title: e.target.value })
                }
                className="disabled:hover:opacity-75 disabled:opacity-50"
                disabled
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedTicket.description}
                onChange={(e) =>
                  setEditedTicket({
                    ...editedTicket,
                    description: e.target.value,
                  })
                }
                className="min-h-[100px] disabled:opacity-50 disabled:hover:opacity-75"
                disabled
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="updated">Last Updated</Label>
              <div className="rounded-md  p-2 text-sm text-gray-400">
                {formatDate(editedTicket.updatedAt)} at{" "}
                {formatTime(editedTicket.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onChangeAction(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

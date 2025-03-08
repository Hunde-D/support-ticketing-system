import { Card, CardContent } from "../ui/card";
import { TicketIcon } from "lucide-react";

export const EmptyState = ({ status }: { status: string }) => (
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

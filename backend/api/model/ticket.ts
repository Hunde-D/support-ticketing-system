import mongoose, { Document, ObjectId, Schema } from "mongoose";

export enum TicketStatus {
  Open = "open",
  InProgress = "in-progress",
  Closed = "closed",
}

export interface ITicket extends Document {
  title: string;
  description: string;
  status: TicketStatus;
  user: ObjectId;
}

const TicketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: TicketStatus.Open,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Indexing for optimized queries
TicketSchema.index({ user: 1 });

export default mongoose.model<ITicket>("Ticket", TicketSchema);

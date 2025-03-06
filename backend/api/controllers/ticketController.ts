import Ticket, { ITicket } from "@/model/ticket";
import { Request, Response } from "express";
import { UserToken } from "@/types/type";

export const createTicket = async (
  req: Request & { user?: UserToken },
  res: Response
) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;

    if (!title || !description) {
      return res.status(400).send("Title and description are required");
    }

    const ticket = await Ticket.create({
      title,
      description,
      user: userId,
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create Ticket Error:", err);
    if (err instanceof Error) {
      res.status(400).send(`Create Ticket Error: ${err.message}`);
    } else {
      res.status(400).send("Failed to Create Ticket");
    }
  }
};

export const getTickets = async (
  req: Request & { user?: UserToken },
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    let tickets: ITicket[];
    if (userRole === "admin") {
      tickets = await Ticket.find().populate("user", "email"); // Admins see all tickets
    } else {
      tickets = await Ticket.find({ user: userId }); // Users see only their tickets
    }

    res.json(tickets);
  } catch (err) {
    console.error("Get Tickets Error:", err);
    if (err instanceof Error) {
      res.status(400).send(`Failed to Get Tickets: ${err.message}`);
    } else {
      res.status(400).send("Failed to Get Tickets");
    }
  }
};
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.json(ticket);
  } catch (err) {
    console.error("Update Ticket Status Error:", err);
    if (err instanceof Error) {
      res.status(400).send(`Failed to update ticket: ${err.message}`);
    } else {
      res.status(400).send("Failed to update ticket");
    }
  }
};

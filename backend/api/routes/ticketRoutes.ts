import {
  createTicket,
  getTickets,
  updateTicket,
} from "@/controllers/ticketController";
import express from "express";
import { adminOnly, protect } from "@/middleware/authMiddleware";
const router: express.Router = express.Router();

router.post("/tickets", protect, createTicket);
router.get("/tickets", protect, getTickets);
router.put("/tickets/:id", protect, adminOnly, updateTicket);

export default router;

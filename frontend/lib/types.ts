import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const signupSchema = z.object({
  email: loginSchema.shape.email,
  password: loginSchema.shape.password,
  role: z.enum(["user", "admin"], {
    required_error: "Please select a user role",
  }),
});

export const ticketSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

export type Ticket = {
  title: string;
  description: string;
  status: string;
  user: {
    email: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  _id: string;
};

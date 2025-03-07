import { Request } from "express";

export type UserToken = {
  id: string;
  role: string;
  email: string;
};

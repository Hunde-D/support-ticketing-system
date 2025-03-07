import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserToken } from "@/types/type";

export const protect = async (
  req: Request & {
    user?: UserToken;
  },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. Unauthorized");
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as UserToken;
    next();
  } catch (err) {
    return res.status(403).send("Invalid token.");
  }
};

export const adminOnly = (
  req: Request & { user?: UserToken },
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send("Access Denied. Admins only.");
  }
  next();
};

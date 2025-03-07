import jwt from "jsonwebtoken";
export const generateToken = (
  id: string,
  role: string,
  email: string
): string => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

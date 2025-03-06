import { UserToken } from "@/types/type";
import User, { IUser } from "@/model/user";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateToken } from "@/lib/utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please fill all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      role,
      authentication: { password: hashedPassword, salt },
    });

    if (user) {
      const token = generateToken(user.id as string, user.role);

      res.cookie("support_ticket", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        _id: user.id,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).send("Invalid user data");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send("Server error. Please try again later.");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email }).select(
      "+authentication.password"
    );

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
      password,
      user.authentication?.password!
    );
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }
    const token = generateToken(user.id as string, user.role);

    res.cookie("support_ticket", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      _id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Server error. Please try again later.");
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("support_ticket", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).send("Logged out successfully.");
};

export const currentUser = async (
  req: Request & { user?: UserToken },
  res: Response
) => {
  try {
    const user = await User.findById(req.user?.id).select("email role _id");
    if (!user) {
      return res.status(404).send("No logged-in user found");
    }
    res.json(user);
  } catch (error) {
    console.error("Current User Error:", error);
    res.status(500).send("Server error. Please try again later.");
  }
};

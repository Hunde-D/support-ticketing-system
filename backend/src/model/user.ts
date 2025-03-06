import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export interface IUser extends Document {
  email: string;
  role: UserRole;
  authentication?: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User,
    },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);

// Hide sensitive fields when returning JSON
UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.authentication?.password;
    delete ret.authentication?.salt;
    delete ret.authentication?.sessionToken;
    return ret;
  },
});

export default mongoose.model<IUser>("User", UserSchema);

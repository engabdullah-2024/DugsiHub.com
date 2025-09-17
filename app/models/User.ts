import { Schema, models, model } from "mongoose";

export type UserDoc = {
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: "superadmin";
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDoc>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    username:  { type: String, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, index: true },
    phone:     { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["superadmin"], default: "superadmin" },
  },
  { timestamps: true }
);

export const User = models.User || model<UserDoc>("User", UserSchema);

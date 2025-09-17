// models/Admin.ts
import { Schema, model, models } from "mongoose";

export interface AdminDoc {
  _id: string;
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminSchema = new Schema<AdminDoc>({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export default models.Admin || model<AdminDoc>("Admin", AdminSchema);

// /models/Paper.ts
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const PaperSchema = new Schema(
  {
    subject: { type: String, required: true, trim: true, maxlength: 120 },
    pages: { type: Number, required: true, min: 1, max: 2000 },
    fileUrl: { type: String, required: true },
    fileKey: { type: String }, // if using Vercel Blob/S3
    fileName: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export type PaperDoc = InferSchemaType<typeof PaperSchema>;

// IMPORTANT: reference through mongoose.models to avoid undefined
export const Paper: Model<PaperDoc> =
  (mongoose.models?.Paper as Model<PaperDoc>) ||
  mongoose.model<PaperDoc>("Paper", PaperSchema);

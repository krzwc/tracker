import mongoose from "mongoose";

export type GpxModel = mongoose.Document & {
  content: string;
  _id: string;
};

const GpxSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

export const Gpx = mongoose.model<GpxModel>("gpx", GpxSchema);

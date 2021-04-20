import mongoose from "mongoose";

export type XmlModel = mongoose.Document & {
  content: string;
  _id: string;
};

const xmlSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

export const Xml = mongoose.model<XmlModel>("xml", xmlSchema);

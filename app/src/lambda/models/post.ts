import mongoose from "mongoose";

export type PostModel = mongoose.Document & {
  title: string;
  content: string;
};

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model<PostModel>("post", postSchema);

export default Post;

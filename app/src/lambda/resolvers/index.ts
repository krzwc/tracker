import { IResolvers } from "apollo-server-lambda";

const resolvers: IResolvers = {
  Query: {
    post: async (parent, { id }, { models }, info) => {
      const post = await models.Post.findById({ _id: id }).exec();
      return post;
    },
    posts: async (parent, args, { models }, info) => {
      const posts = await models.Post.find().exec();
      return posts;
    },
  },
  Mutation: {
    createPost: async (parent, { title, content }, { models }, info) => {
      const post = await models.Post.create({ title, content });
      return post;
    },
  },
};

export default resolvers;

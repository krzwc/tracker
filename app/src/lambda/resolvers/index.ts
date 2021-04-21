import { IResolvers } from "apollo-server-lambda";

const resolvers: IResolvers = {
  Query: {
    gpx: async (parent, { id }, { models }, info) => {
      const gpx = await models.Gpx.findById(id).exec();
      return gpx;
    },
    gpxs: async (parent, args, { models }, info) => {
      const gpxs = await models.Gpx.find({}).exec();
      return gpxs;
    },
  },
  Mutation: {
    createGpx: async (parent, { content, title }, { models }, info) => {
      const gpx = await models.Gpx.create({ content, title });
      return gpx;
    },
  },
};

export default resolvers;

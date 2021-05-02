import { IResolvers } from 'apollo-server-lambda';

const resolvers: IResolvers = {
  Query: {
    gpx: async (parent, { id }, { models }) => {
      const gpx = await models.Gpx.findById(id).exec();
      return gpx;
    },
    gpxs: async (parent, args, { models }) => {
      const gpxs = await models.Gpx.find({}).exec();
      return gpxs;
    },
  },
  Mutation: {
    createGpx: async (parent, { content, title }, { models }) => {
      const gpx = await models.Gpx.create({ content, title });
      return gpx;
    },
    deleteGpx: async (parent, { id }, { models }) => {
      const gpx = await models.Gpx.findOneAndDelete({ _id: id }).exec();
      return gpx._id;
    },
  },
};

export default resolvers;

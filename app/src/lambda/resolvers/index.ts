import { IResolvers } from "apollo-server-lambda";

const resolvers: IResolvers = {
  Query: {
    xml: async (parent, { id }, { models }, info) => {
      const xml = await models.Xml.findById(id).exec();
      return xml;
    },
    xmls: async (parent, args, { models }, info) => {
      const xmls = await models.Xml.find({}).exec();
      return xmls;
    },
  },
  Mutation: {
    createXml: async (parent, { content }, { models }, info) => {
      const xml = await models.Xml.create({ content });
      return xml;
    },
  },
};

export default resolvers;

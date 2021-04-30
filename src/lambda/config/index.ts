export const isDev = process.env.NODE_ENV === "development";

export const DATABASE_URL = isDev
  ? "mongodb://root:example@localhost:27017"
  : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gpnvx.mongodb.net/test`;

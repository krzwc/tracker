export const isDev = process.env.NODE_ENV === "development";

export const DATABASE_URL = isDev
  ? "mongodb://root:example@localhost:27017"
  : "";

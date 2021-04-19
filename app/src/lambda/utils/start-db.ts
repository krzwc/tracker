import * as mongoose from "mongoose";
import { DATABASE_URL } from "../config";
import { models } from "../models";
import { populateDB } from "./populate-db";

const eraseDatabaseOnSync = true;

export const startDB = (url = DATABASE_URL) => {
  return mongoose
    .connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      if (eraseDatabaseOnSync) {
        await Promise.all([models.Post.deleteMany({})]);
      }
      populateDB();
    });
};

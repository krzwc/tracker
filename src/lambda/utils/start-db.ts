import { config } from 'dotenv';
config();

import mongoose from 'mongoose';
import { DATABASE_URL } from '../config';
import { models } from '../models';

const eraseDatabaseOnSync = false;

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
        await Promise.all([models.Gpx.deleteMany({})]);
      }
    });
};

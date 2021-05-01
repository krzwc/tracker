export const isDev = process.env.NODE_ENV === 'development';

export const productionURL = 'https://cocky-joliot-9e0c46.netlify.app';
export const URL = isDev ? 'http://localhost:3000' : productionURL;

export const DATABASE_URL = isDev
  ? 'mongodb://root:example@localhost:27017'
  : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gpnvx.mongodb.net/test`;

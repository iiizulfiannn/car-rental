export default {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PORT: parseInt(process.env.DB_PORT!!),
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME,
};

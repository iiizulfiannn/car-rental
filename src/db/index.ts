import mysql from "mysql2";
import dbConfig from "../config/db.config";

export default mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

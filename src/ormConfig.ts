import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config({ path: "./../.env" });

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "efufluqe",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DATA_BASE_HOST,
  username: process.env.DATA_BASE_USER_NAME,
  password: process.env.DATA_BASE_USER_PASSWORD,
};

export default connectionOptions;

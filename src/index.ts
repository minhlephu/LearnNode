import express from "express";
import router from "./apiRouter";
import dotenv from "dotenv";
import { createConnection, Connection } from "typeorm";
import path from "path";
var app = express();

const initEnvironments = (): void => {
  dotenv.config({
    path: path.join(process.cwd(), "environments", ".env.common"),
  });
  dotenv.config({
    path: path.join(
      process.cwd(),
      "environments",
      `.env.${process.env.NODE_ENV}`,
    ),
  });
};
initEnvironments();
const initPostgresConnection = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_TCP_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "admin123456",
    database: process.env.POSTGRES_DATABASE || "demo",
    entities: [__dirname + "/entities/*.{js,ts}"],
    synchronize: true,
  });
  return connection;
};
setImmediate(async () => {
  try {
    await initPostgresConnection();
    console.log("Database connected");
    // await ProjectSyncJob.syncProject();
    // await CreateMetricReportJob.createMetricReport();
  } catch (dbConnectError) {
    let errorMsg = "";
    if (typeof dbConnectError === "string") {
      errorMsg = dbConnectError;
    } else if (dbConnectError && typeof dbConnectError === "object") {
      errorMsg = dbConnectError.toString();
    }
    console.log("First start failed to connect to DB", errorMsg);
  } finally {
    app.use("/api", router);
    app.listen(3001, () => {
      console.log("App listening on", `http://localhost:3001`);
    });
  }
});

import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://agastech:agastech123@cluster0.cyqsa.mongodb.net/bookapi?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    mongoose.connect(DB_CONNECTION_STRING, {});
    logger.info("Connected to the database");
  } catch (error) {
    logger.error(error, "fail to connect to the db");
    process.exit();
  }
}

export async function disconnectFromDatabase() {
  await mongoose.Connection.prototype.close();
  logger.info("Disconnected from database");
  return;
}

import "dotenv/config";

import mongoose from "mongoose";

export default async function connect() {
  console.log("Connecting to MongoDB database...");

  const mongoDB = process.env.REMOTE || "";

  return mongoose
    .connect(mongoDB)
    .then((database) =>
      console.log("Connected to MongoDB database successfully")
    )
    .catch((error) => console.log(error));
}

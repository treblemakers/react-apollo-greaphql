import dotenv from "dotenv"
dotenv.config()

import express from "express";
import mongoose from "mongoose";

import server from "./server";

const createServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cst-3icgb.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    );
    mongoose.set('useFindAndModify', false);

    const app = express();

    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

createServer();

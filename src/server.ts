import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { schema } from "./graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { generateMediaConfig } from "@src/utils";
import fs from "fs";
import path from "path";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
dotenv.config();

const app = express();

const mediaConfigBuffer = fs.readFileSync("./media_config.json");

const mediaConfig = generateMediaConfig(mediaConfigBuffer);

app.use(cors());
app.use(express.json());

app.use("/ping", (_, res) => res.json("pong"));

const uploadsPath = path.join(
  process.cwd(),
  mediaConfig.read_directory,
  mediaConfig.serve_route
);

app.use(mediaConfig.serve_route, express.static(uploadsPath));

const startServer = async () => {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) =>
      Helpers.Subgraph.GenerateContext({
        req,
        inject: { config: mediaConfig },
      }),
  });

  await apolloServer.start();
  app.use(graphqlUploadExpress());
  apolloServer.applyMiddleware({ app });
};

startServer();

const DB = process.env.MONGO_URI;

if (DB) {
  mongoose
    .connect(DB)
    .then(() => console.log("Media DB Connected to Media Service!"))
    .catch((err) => console.log(err));
} else {
  console.log("Mongo DB Not Connected -- Missing Mongo URI.");
}

console.log(`Image proxy enabled: ${process.env.ENABLE_IMGPROXY}`);

const port = process.env.BACKEND_PORT || 5006;

app.listen(port, () => console.log(`Media service ready at port ${port}!`));

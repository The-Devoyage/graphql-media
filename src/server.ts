import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { schema } from "./graphql";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { generateMediaConfig } from "@src/helpers";
import fs from "fs";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
dotenv.config();

const app = express();

const mediaConfigBuffer = fs.readFileSync("./media_config.json");

const mediaConfig = generateMediaConfig(mediaConfigBuffer);

app.use(cors());
app.use(express.json());

app.use(mediaConfig.express_route, express.static(mediaConfig.read_directory));

let apolloServer;

const startServer = async () => {
  apolloServer = new ApolloServer({
    schema: applyMiddleware(schema),
    context: ({ req }) => {
      Helpers.Service.GenerateContext({ req, custom: { config: mediaConfig } });
    },
  });

  await apolloServer.start();
  app.use(graphqlUploadExpress());
  apolloServer.applyMiddleware({ app });
};

startServer();

let DB = process.env.MONGO_URI!;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Media DB Connected to Media Service!"))
  .catch((err) => console.log(err));

const port = process.env.BACKEND_PORT || 5006;

app.listen(port, () => console.log(`Media service ready at port ${port}!`));

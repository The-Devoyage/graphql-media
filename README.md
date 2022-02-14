# The Devoyage - GraphQL Media

The `@the-devoyage/graphql-media` microservice is a file uploading server that can be added as a ready-to-production file upload server or used as a starting base for your own media uploading server.

## Features

Enable file uploading of static assets such as images, video, audio, text documents, and pdfs. Each asset that is uploaded also creates a reference record of type `Media` , saved to a mongo db instance.

```graphql
type Media {
  _id: ObjectID!
  createdAt: String!
  updatedAt: String!
  path: String!
  mimetype: String!
  created_by: User!
  title: String!
}
```

### Resolvers

- Get Media - Get a paginated and filterable list of media. You can filter by any property of media.

- Single File Upload - Upload a single file directly to the "Gateway" server, which then routes the file to this media server.

### Configuration Options

Configure the media server with a simple json file located in the root of the project, `media_config.json`. Change the name of the express upload route, mime types accepted, and location of saved files and more.

By default files are saved in an organized manner in the `/uploads/MIMETYPE/` directory. Each file is timestamped and saved with the user id as a name.

## Usage

### Install Dependencies

1. Login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

If you are using docker to build and run this server, you will need to pass the github token along to the build process.

Assign an environment variable to the Github Token on the Host Machine, as the Dockerfile will check environment variables for the token at build time. Be sure to expire tokens after use.

```bash
export GITHUB_TOKEN=mytoken
```

For docker, you can run:

```bash
docker build -t --build-arg GTIHUB_TOKEN=${GITHUB_TOKEN} .
```

### Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

### Run The Server

In Development

```
npm run dev
```

In Production

```
npm start
```

## Querying the Server

The server should sit behind a federated gateway. Query the gateway to query the server. Use the Apollo Sandbox for generated documentation on available resolvers and queries.

**Required Headers**

All routes within this service require a `context` header to be passed with the request. The `context` header should be stringified JSON of the type Context. Be sure to include the `auth` property.

```ts
interface Context extends Record<string, any> {
  auth: {
    account: { _id: string; email: string } | null;
    user: {
      _id: string;
      role: number;
      email: string;
    } | null;
    isAuth: boolean;
  };
  // ...context
}
```

## Recommended Services

- `@the-devoyage/graphql-gateway` - An apollo gateway server with pre-configured features such as user authorization, file routing/file upload routing, and supergraph configuration. This repo is compatible with this service and can act as the gateway for this service. [Purchase Access](https://basetools.io/checkout/XGUVNNGr)

- `@the-devoyage/graphql-accounts` - An accounts service that handles account creation, authentication, and verification. It is compatible with this service out and can handle supplying the requirements for the `account` property of the token above. [Purchase Access](https://basetools.io/checkout/v0cv56df)

- `@the-devoyage/graphql-users` - A Users Microservice to manage the members of accounts. This service is compatible with the mailer, and can handle supplying the `user` information for the token above. [Purchase Access](https://basetools.io/checkout/dQe81uv0)

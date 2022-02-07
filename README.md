# The Devoyage - GraphQL Media

The `@the-devoyage/graphql-media` microservice is a file uploading server that can be added as a ready-to-production file upload server or used as a starting base for your own media uploading server.

## Features

### Media

Save information about each file upload in type `media`:

```graphql
type Media {
  _id: ObjectID!
  createdAt: String!
  updatedAt: String!
  path: String!
  mimetype: String!
  created_by: User! # External Service, Details below
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

1. Required External Dependencies

- `@the-devoyage/mongo-filter-generator` - Adds the pagination and filtering abilities to the service. [Purchase Access](https://basetools.io/checkout/vyOL9ATx)

2. Once you have access to the required repos above, be sure to login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

3. Install Dependencies

```
npm install
```

If you are using docker to build and run this server, you will need to pass the github token along to the build process.

Assign an environment variable to the Github Token locally:

```bash
export GITHUB_TOKEN=mytoken
```

For docker, you can run:

```bash
docker build -t --build-arg GTIHUB_TOKEN=${GITHUB_TOKEN} .
```

4. Configure Environment Variables

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

Query the server as you would any other GraphQL server. Try using the sandbox/graphql playground located at the gateway's graphql url.

**Required Headers**

The gateway is responsible to pass headers to this micro-service. In general, the gateway will receive a encrypted JSON Web Token, decrypt it, and verify that is valid. If it is valid, the request is then sent to the external micro-services as headers.

The microservice then can parse the headers and pass them as context to the resolvers, allowing the application to securely grant authorization at a resolver level.

1. token: TokenContext as stringified json
2. isauth: boolean as stringified json

```ts
interface DecodedToken {
  account?: { _id: string; email: string };
  user?: {
    _id?: string;
    role?: number;
    email?: string;
  };
}
```

## Recommended Services

- `@the-devoyage/graphql-gateway` - An apollo gateway server with pre-configured features such as user authorization, file routing/file upload routing, and supergraph configuration. This repo is compatible with this service and can act as the gateway for this service. [Purchase Access](https://basetools.io/checkout/XGUVNNGr)

- `@the-devoyage/graphql-accounts` - An accounts service that handles account creation, authentication, and verification. It is compatible with this service out and can handle supplying the requirements for the `account` property of the token above. [Purchase Access](https://basetools.io/checkout/v0cv56df)

- `@the-devoyage/graphql-users` - A Users Microservice to manage the members of accounts. This service is compatible with the mailer, and can handle supplying the `user` information for the token above. [Purchase Access](https://basetools.io/checkout/dQe81uv0)

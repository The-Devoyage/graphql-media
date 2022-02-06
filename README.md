# The Devoyage - GraphQL Media

The `@the-devoyage/graphql-media` microservice is a file uploading server that can be added as a ready-to-production file upload server or used as a starting base for your own media uploading server.

## Features

### Media

Upload files directly through a gateway server, which is easily directed to this server. Media is created and save in a Mongo DB - you can specify the URI in the environment variables.

```graphql
type Media @key(fields: "_id") {
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

- getMedia - Get a list of mongoose documents (Media) that contain references to the location of the file that was uploaded. All queries are filterable by all properties of media, and are paginated by default.

- singleFileUpload - Upload a single file directly to the "Gateway" server that redirects to this media upload service.

### Uploading Details

Proxy routes from your gateway server to the media server to handle file uploads. This can be done by default with the [`@the-devoyage/graphql-gateway`](https://basetools.io/checkout/XGUVNNGr) service.

Configure the media servere with a simple json file located in the root of the project, `media_config.json`. Change the name of the express upload route, mime types accepted, and location of saved files and more.

By default files are saved in an organized manner in the `/public/uploads/MIMETYPE/` directory. Each file is timestamped and saved with the user id as a name.

## Usage

### Required External Dependencies

First, gain access to required private dependencies and repos:

- Gateway Server - Always place microservices behind a gateway server. The [`@the-devoyage/graphql-gateway` Service](https://basetools.io/checkout/XGUVNNGr) is a ready to go gateway server which is compatible with this service out of the box.

- Accounts Service - Handles base authentication and authorization. The [`@the-devoyage/graphql-accounts` Service](https://basetools.io/checkout/v0cv56df) is compatible with this service out of the box.

- Users Service - Handles the relation between media objects and the creator of the media object. The [`@the-devoyage/graphql-users` Service](https://basetools.io/checkout/dQe81uv0) is compatible with this service out of the box.

- Mongo-Filter-Generator - A required Private NPM Package to handle Filtering and Pagination within this service. [Purchase Access](https://basetools.io/checkout/vyOL9ATx) to use this package.

### Install Dependencies

Log into the Github Registry

```bash
npm login --registry=https://npm.pkg.github.com
```

Install NPM Packages

If you are using Docker, set the github token as a temporary environment variable to grant the Docker Build Process access to the repositories and registries. Be sure to expire the token after you have built.

```bash
export GITHUB_TOKEN=mytoken
```

```
npm install
```

### Set Environment Variables and Configure Media Server

Copy the `.env.example` file to `.env` and fill in the appropriate variables.

Edit the `media_config.json` file to set up valid mime-types, express routes, and read/write directories.

### Run The Server

In Development

```
npm run dev
```

In Production

```
npm start
```

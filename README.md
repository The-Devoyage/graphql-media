# The Devoyage - GraphQL Media

The `@the-devoyage/graphql-media` microservice is a file uploading server that can be added as a ready-to-production file upload server or used as a starting base for your own media uploading server.

## Features

### GraphQL File Uploading
Enable file uploading of static assets such as images, video, audio, text documents, and pdfs with a standard graphql mutation request. 

### Track Uploaded Media
Each asset that is uploaded also creates a reference of type `Media`, saved to a mongodb instance.

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

### Serve Files

Once uploaded, files may be served directly from this service or through a proxy/gateway combination. Simply fetch the `Media` record and request the path from the service. 

```ts
const photoURI = `http://media_server:MEDIA_SERVER_PORT/${path}`
```

## License

This repository provides a GPL License by default. If you want to use this product in a private commericial setting, you may purchase the MIT Licensed Version [Here!](https://thedevoyage.gumroad.com/l/graphql-users)

### Resolvers

- Get Media - Get a paginated and filterable list of media. You can filter by any property type media provides.

- Single File Upload - Upload a single file directly to the "Gateway" server, which then routes the file to this media server.

### Configuration Options

Configure the media server with a simple json file located in the root of the project, `media_config.json`. Change the name of the express upload route, mime types accepted, and location of saved files and more.

By default files are saved in an organized manner in the `/uploads/MIMETYPE/` directory. Each file is timestamped and saved with the user id as a name.

## Usage

### Install Dependencies

Install with NPM

```
npm install
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

### Extended Properties/Required Services

The media service extends federated entities from external services. The following federated services and properties are required in order to run this service.

User

- \_id

If you want to run this service without the `User` entity, it is possible with minimal updating to the code base.

## Usage

### 1. Upload file to server

Create a mutation request to the resolver 'singleFileUpload' with the following variables:

```ts
export type SingleFileUploadInput = {
  file: File;
  title: string;
};
```

### 2. Get Media Records

Once uploaded you can fetch `Media` using the `getMedia` query. Type `Media` represents the record of the media in the mongodb, including the path. 

### 3. Fetch Media Asset

Once you have the file path, the `graphql-media` server can serve the file with a HTTP request. The default endpoint is `/uploads`, but this can be configured in the `media_config.json` file.

```ts
  const photoURI = `http://media_server:MEDIA_SERVER_PORT/${path}`
```

## File Storage

Files are stored in the `uploads` directory in the root of the project. This can be configured within the `media_config.json` file.

# The Devoyage - GraphQL Media

A Federated GraphQL File Uploading and Serving API.

## Docs

[The Devoyage - GraphQL Media](https://www.thedevoyage.com/media/intro)

## Quick Start

1. Login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

For docker, you can run:

```bash
docker build -t . --build-arg GTIHUB_TOKEN=$GITHUB_TOKEN
```

3. Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

4. Run The Server

In Development

```
npm run dev
```

In Production

```
npm start
```

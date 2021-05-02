## Tracker - GPX viewer

GPX file viewer with serverless GraphQL and REST APIs (deployable solely via Netlify).
App state stored in MongoDB.

All credit for setting up local and prod config of Apollo GraphQL Server with Netlify Functions and TS to https://github.com/pushkar8723/apollo-graphql-typescript.

## Demo

https://cocky-joliot-9e0c46.netlify.app

## Local deployment

Install netlify globally

```bash
npm i -g netlify-cli
```

Install npm dependencies

```bash
npm i
```

Start db

```bash
docker-compose up
```

Start netlify dev server in another terminal window

```bash
netlify dev
```

Locally deployed version will ba available at http://localhost:3000.
Local GraphQL playground: http://localhost:3000/.netlify/functions/graphql

# Backlog

- refactor
- maptiler key to env vars
- title edition
- optimistic response
- more responsive ui
- microfrontend arch

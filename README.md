# Petfinder Next.js Application

Live Demo: https://petfinder-nextjs.vercel.app/

![](https://www.dl.dropboxusercontent.com/s/j7nri43hz6xacuu/Screen%20Shot%202022-02-09%20at%204.06.16%20PM.png)

![](https://www.dl.dropboxusercontent.com/s/vi4u19fpi0vs1gm/Screen%20Shot%202022-02-09%20at%204.06.27%20PM.png)

![](https://www.dl.dropboxusercontent.com/s/hv6ku9cd4o1tvm3/Screen%20Shot%202022-02-09%20at%204.07.26%20PM.png)

A statically generated Next.js application built with TypeScript and the Petfinder API. The application uses the Petfinder API to fetch listings of recently adopted pets and pets currently available for adoption. For styling, the application Tailwind CSS framework.

Using the `getStaticProps` function, most of the application's content gets generated at build time. This reduces the number of requests sent to the Petfinder API, which limits each account to 1000 daily requests and 50 requests per second, and delivers both an improved user experience and better SEO results.

Visit the [master branch](https://github.com/newline-sandbox/petfinder-nextjs) of this repository for the final version of this application.

## Project Setup

Install the dependencies.

```shell
$ npm install
```

Create a `.env` file in the root of the project directory. Add the following environment variables to this file:

(`.env`)

```
NEXT_PUBLIC_PETFINDER_API_URL=https://api.petfinder.com/v2
NEXT_PUBLIC_PETFINDER_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_PETFINDER_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_URL=http://localhost:3000
```

Set `NEXT_PUBLIC_PETFINDER_CLIENT_ID` to the API key found under your Petfinder account's developer settings.

Set `NEXT_PUBLIC_PETFINDER_CLIENT_SECRET` to the secret found under your Petfinder account's developer settings.

## Running in Development Environment

Run the application for local development:

```shell
$ make dev
```

Naivgate to [localhost:3000](localhost:3000). You should see your application running. The application [fast refreshes](https://nextjs.org/docs/basic-features/fast-refresh) on all file changes.

## Building for Production

Build for application for deployment to a production environment:

```shell
$ make build
```

_Note_: Add a `-s` option to tell `make` to suppress echoing the access token received from the Petfinder API within the terminal.

## Available npm Scripts

- `dev` - Run the development environment (on port 3000 by default). With [fast refresh](https://nextjs.org/blog/next-9-4#fast-refresh), each time you edit the application's source code, the change instantly gets reflected in the running application, all while preserving the application's current state. This fast feedback loop keeps you productive and uninterrupted during development.
- `build` - Build an optimized version of the application and generate the pre-rendered pages.
- `start` - Spin up the application in production mode.
- `lint` - Runs ESLint on the codebase.

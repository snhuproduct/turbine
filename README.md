# TobogganWs

This README file contains instructions regarding our main project dependencies (Nx, storybook and etc) and also some common issues troubleshooting.

## Overview

- [Environment Setup Review](https://drive.google.com/file/d/1gbKBwPrOcju0hHzaR9aFWiOdxlxPf0ie/view)

## Requirements

- This project requires you to have a .npmrc file on the root path with your credentials setup. It should look similar to this:

```
//npm.pkg.github.com/:_authToken=ASK_THIS_TOKEN_IN_OUR_SLACK_CHANNEL
@snhuproduct:registry=https://npm.pkg.github.com/

//npm.pkg.github.com/:_authToken=GITHUB_PERSONAL_ACCESS_TOKEN_HERE
```

- The `@snhuproduct` key can also be found on 1password vault as secret: [TobogganWs @snhuproduct NPM package key
  ](https://sada-systems.1password.com/vaults/n6wqz5ifq5v57w4nrevk6viqka/allitems/tbvuohgdqy3aygl36q5opro4ji)

- If this is not setup properly, you'll have a 401 error while running npm install, due to our toboggan-ui module.

- This application has active integration with [GlidePath-Core API](https://snhu-glidepath-dev-api.cloudpssolutions.com/docs/data_glossary). This requires the secrets to be stored in an `.env` file. **Ensure that the proper `.env` file is placed at this project's root for it to run properly**.
  - [`.env_POC_Auth` in SNHU 1password vault](https://sada-systems.1password.com/vaults/n6wqz5ifq5v57w4nrevk6viqka/allitems/sc43rfsiajcj7hggdyorag3xra)
  - Make sure that the `.env` file above has all the keys in `.env.example` in this project's root

## Running the project

- Run the API (back-end) server:

```
npm run start:api
```

- Run the app (front-end) server:

```
npm run start:app
```

## Storybook

#### Importing toboggan-ui from local:

The following should be run in your toboggan-ui project:

- nx run stories:build-storybook
- cd to dist/libs/stories
- npm pack --> this will create file
- snhuproduct-toboggan-ui-components-library-1.4.1.tgz
- In the toboggan-ws do npm install [full path to tgz file]

## Nx

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/react-tutorial/01-create-application)

#### Useful extensions for VSCode:

- [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
  - Easily generate NX Commands

#### Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

#### Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@toboggan-ws/mylib`.

#### Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

#### Generate a component

- nx generate @nrwl/angular:component user/components/create-user --project=toboggan-app

#### Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

#### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `ng e2e my-app --watch` to execute the end-to-end tests in the UI

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

#### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

#### Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

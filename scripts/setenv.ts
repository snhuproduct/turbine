const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environments variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const isEnableCache = true;
const targetPath = isProduction
  ? `./apps/toboggan-app/src/environments/environment.prod.ts`
  : `./apps/toboggan-app/src/environments/environment.ts`;
const targetPathApi = isProduction
  ? `./apps/toboggan-api/src/environments/environment.prod.ts`
  : `./apps/toboggan-api/src/environments/environment.ts`;
// we have access to our environments variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   enableCache: ${isEnableCache},
   baseApiUrl: 'http://localhost:3333/api',
   firebase: {
      apiKey: "${process.env.FIREBASE_API_KEY}",
      authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}"
   },
   providerID: "${process.env.OAUTH_PROVIDER_ID}"
};
`;
const environmentFileContentApi = `
export const environment = {
   production: ${isProduction},
   enableCache: ${isEnableCache},
   baseApiUrl: 'http://localhost:3333/api',
   provider: {
      apiKey: "${process.env.PROVIDER_API_KEY}",
      authDomain: "${process.env.PROVIDER_AUTH_DOMAIN}",
    },
    identitytoolkit: {
       url: "${process.env.IDENTITY_TOOLKIT_URL}",
       providerID: "google.com"
    },
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
// write the content to the respective file
writeFile(targetPathApi, environmentFileContentApi, function (err: any) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPathApi}`);
});

const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environments variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const isGCP = process.env.GCP || false;
const isEnableCache = true;
const targetPath = isProduction
  ? `./apps/toboggan-app/src/environments/environment.prod.ts`
  : `./apps/toboggan-app/src/environments/environment.ts`;
const targetPathApi = isProduction
  ? `./apps/toboggan-api/src/environments/environment.prod.ts`
  : `./apps/toboggan-api/src/environments/environment.ts`;
// we have access to our environments variables
// in the process.env object thanks to dotenv

// use production url for backend if needed
let host = isProduction
  ? `snhu-toboggan-poc-demo-szcuip2d6a-ue.a.run.app`
  : `localhost`;

// if this is not a GCP/Docker deployment (ngnix routed), use specific port
host += !isGCP ? ':3333' : ':8080';

// printout env
console.log('setting up environment: ');
console.log('\t env: ', environment);
console.log('\t gcp: ', isGCP);
console.log('\t host: ', host);

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   enableCache: ${isEnableCache},
   baseApiUrl: 'http://${host}/api',
   firebase: {
      apiKey: "${process.env.FIREBASE_API_KEY}",
      authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}"
   },
   providerID: "${process.env.OAUTH_PROVIDER_ID}",
   cypressTestEmail: "${process.env.CYPRESS_TEST_EMAIL}",
   cypressTestPassword: "${process.env.CYPRESS_TEST_PASSWORD}",
};
`;
const environmentFileContentApi = `
export const environment = {
   production: ${isProduction},
   enableCache: ${isEnableCache},
   baseApiUrl: 'http://${host}/api',
   provider: {
      apiKey: "${process.env.PROVIDER_API_KEY}",
      authDomain: "${process.env.PROVIDER_AUTH_DOMAIN}",
    },
    GPCoreBaseUrl: "${process.env.GPCORE_BASEURL}",
    GCloudCDNBaseUrl: "${process.env.GDRIVE_BASEURL}",
    identitytoolkit: {
       url: "${process.env.IDENTITY_TOOLKIT_URL}",
       providerID: "google.com"
    },
    learnosity: {
      domain: "${process.env.LEARNOSITY_DOMAIN}",
      devItemBankConsumerKey: "${process.env.LEARNOSITY_DEV_CONSUMER_KEY}",
      devItemBankConsumerSecret: "${process.env.LEARNOSITY_DEV_CONSUMER_SECRET}",
      qsItemBankConsumerKey: "${process.env.LEARNOSITY_QS_CONSUMER_KEY}",
      qsItemBankConsumerSecret: "${process.env.LEARNOSITY_QS_CONSUMER_SECRET}"
    }
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

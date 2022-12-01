import { environment } from '../../../environments/environment';

export const LearnosityDefaultSecurityCredentials = {
  consumer_key: environment.learnosity.devItemBankConsumerKey,
  domain: environment.learnosity.domain,
};

// temporary solution, should come from gp-core api
export const itemBankTempMap = {
  quickstart_examples_activity_001: {
    templateId: 'quickstart_examples_activity_template_001',
    consumerKey: environment.learnosity.qsItemBankConsumerKey,
    consumerSecret: environment.learnosity.qsItemBankConsumerSecret,
  },
  'NS_Test Summative Assessment': {
    templateId: 'NS_Test Summative Assessment',
    consumerKey: environment.learnosity.devItemBankConsumerKey,
    consumerSecret: environment.learnosity.devItemBankConsumerSecret,
  },
  'NS_Sample Autograded Items': {
    templateId: 'NS_Sample Autograded Items',
    consumerKey: environment.learnosity.devItemBankConsumerKey,
    consumerSecret: environment.learnosity.devItemBankConsumerSecret,
  },
  '254af40b-15d0-4ef2-8534-1a319da86a7d': {
    templateId: '254af40b-15d0-4ef2-8534-1a319da86a7d',
    consumerKey: environment.learnosity.devItemBankConsumerKey,
    consumerSecret: environment.learnosity.devItemBankConsumerSecret,
  },
  DemoTest_DemoSiteExample: {
    templateId: 'FEEDBACK_DEMO_TEST',
    consumerKey: environment.learnosity.qsItemBankConsumerKey,
    consumerSecret: environment.learnosity.qsItemBankConsumerSecret,
  },
};

const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path')
const defaultTemplates = path.join(__dirname, './_templates');
const webpush = require('web-push');
const chalk = require('chalk');
const caniuse = require('caniuse-api');


module.exports = async (feature) => {
  if(!feature) {
    console.error('No feature defined');
    return;
  }

  const vapidKeys = webpush.generateVAPIDKeys();

  await runner(`${feature} with-prompt`, {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    debug: !!process.env.DEBUG,
    createPrompter: () => require('inquirer'),
    helpers: {
      vapidKey: vapidKeys.publicKey
    }
  });

  if(feature == 'push') {
    console.log(`


    ${chalk.yellow('=======================================')}

    The following keys are your application keys. Keep them and pass them on the the push service developer.

    ${chalk.yellow('=======================================')}

    Public Key:
    ${vapidKeys.publicKey}

    Private Key:
    ${vapidKeys.privateKey}

    ${chalk.yellow('=======================================')}
    `)
  }

  if(feature == 'browser') {

    const matched = x => ({
      on: () => matched(x),
      otherwise: () => x,
    })

    const match = x => ({  
      on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
      otherwise: fn => fn(x),
    })

    const allowedBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'ie', 'and_chr', 'ios_saf'];

    const browserNameMap = {
      'chrome': 'Chrome',
      'firefox': 'Firebox',
      'safari': 'Safari',
      'edge': 'Edge',
      'ie': 'Internet Explorer',
      'and_chr': 'Android Chrome',
      'ios_saf': 'iOS Safari',
    }

    const featureNameMap = {
      'web-app-manifest': 'Web Application Manifest',
      'serviceworkers': 'Service Workers',
      'offline-apps': 'Offline Web Application'
    }

    const getNameForBrowser = (key) => browserNameMap[key] || key;
    const getNameForFeature = (key) => featureNameMap[key] || key;

    const hasKey = (key) => (obj) => obj[key];
    
    const isSupported = hasKey('y');
    const isPartiallySupported = hasKey('a');
    const isSupportedWithPrefix = hasKey('x');
    const isNotSupported = hasKey('n');
    
    const logSupport = (browser, color, message, key) => (version) => console.log(getNameForBrowser(browser) + ' ' + chalk[color](message + ' ' +  version[key]));

    const getFeatureSupportFor = (allowedBrowsers) => (featureName) => {
      const feature = caniuse.getSupport(featureName);
      const mappedFeatureName = getNameForFeature(featureName);
      console.log(`
        ${mappedFeatureName}
        ${chalk.yellow('=======================================')}
      `)
      Object.keys(feature).filter(browser => allowedBrowsers.indexOf(browser) !== -1).map(browser => {
        match(feature[browser])
          .on(isSupported, logSupport(browser, 'green', 'supported ≥', 'y'))
          .on(isPartiallySupported, logSupport(browser, 'yellow', 'partially supported ≥', 'a'))
          .on(isSupportedWithPrefix, logSupport(browser, 'magenta', 'supported with prefix ≥', 'x'))
          .on(isNotSupported, logSupport(browser, 'red', 'not supported ≤', 'n'))
          .otherwise(() => console.log('no value'))
      });
    }

    const getFeatureSupportForAllowedBrowsers = getFeatureSupportFor(allowedBrowsers);

    getFeatureSupportForAllowedBrowsers('web-app-manifest');
    getFeatureSupportForAllowedBrowsers('serviceworkers');
    getFeatureSupportForAllowedBrowsers('offline-apps');
  }

};
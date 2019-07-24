const chalk = require('chalk');
const caniuse = require('caniuse-api');

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
  'offline-apps': 'Offline Web Application',
  'push-api': 'Push Notifications'
}

const getNameForBrowser = (key) => browserNameMap[key] || key;
const getNameForFeature = (key) => featureNameMap[key] || key;

const hasKey = (key) => (obj) => obj[key];

const isSupported = hasKey('y');
const isPartiallySupported = hasKey('a');
const isSupportedWithPrefix = hasKey('x');
const isNotSupported = hasKey('n');

const logSupport = (browser, color, message, key) => (version) => console.log(getNameForBrowser(browser) + ' ' + chalk[color](message + ' ' + version[key]));

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

module.exports = getFeatureSupportFor(allowedBrowsers);
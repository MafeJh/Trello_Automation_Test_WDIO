import chai from "chai";

const browser = (process.env.BROWSER || "chrome").trim();
const retry = process.env.RETRY || 0;
const maxInstances = process.env.MAX_INSTANCES || 1;

// Language setting
const LANGUAGE = 'es'; // Set the desired language here

// Chrome Configuration
const CHROME_CONFIG = {
  browserName: "chrome",
  acceptInsecureCerts: true,
  "goog:chromeOptions": {
    args: [`--lang=${LANGUAGE}`], // Set language to Spanish
  },
};

const CHROME_HEADLESS_CONFIG = {
  ...CHROME_CONFIG,
  "goog:chromeOptions": {
    args: ["--headless", "--disable-gpu", `--lang=${LANGUAGE}`], // Set language to Spanish
  },
};

// Firefox Configuration
const FIREFOX_CONFIG = {
  browserName: "firefox",
  acceptInsecureCerts: true,
};

const FIREFOX_HEADLESS_CONFIG = {
  ...FIREFOX_CONFIG,
  "moz:firefoxOptions": {
    args: ["-headless"],
    prefs: {
      'intl.accept_languages': LANGUAGE, // Set language to Spanish
    },
  },
};

// Safari Configuration
const SAFARI_CONFIG = {
  browserName: "safari",
  acceptInsecureCerts: true,
  // Note: Language settings for Safari cannot be set directly through WebDriver
};

const CAPABILITIES = {
  all: [CHROME_CONFIG, FIREFOX_CONFIG, SAFARI_CONFIG],
  all_headless: [CHROME_HEADLESS_CONFIG, FIREFOX_HEADLESS_CONFIG],
  chrome: [CHROME_CONFIG],
  chrome_headless: [CHROME_HEADLESS_CONFIG],
  firefox: [FIREFOX_CONFIG],
  firefox_headless: [FIREFOX_HEADLESS_CONFIG],
  safari: [SAFARI_CONFIG],
};

export const config = {
  runner: "local",

  specs: ["../**/*.feature"],

  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances,

  capabilities: CAPABILITIES[browser],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "info",
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/lighthouse-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: "https://trello.com",
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts

  reporters: ["spec"],

  services: ["chromedriver", "geckodriver"],

  framework: "cucumber",

  cucumberOpts: {
    require: ["./**/*.step.js"],
    retry,
    timeout: 60000,
    ignoreUndefinedDefinitions: true,
    tags: "",
  },

  before: async () => {
    const wdioExpect = global.expect;

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    global.wdioExpect = wdioExpect;
  },
};

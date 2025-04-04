import chai from "chai";
import { ReportAggregator, HtmlReporter } from "wdio-html-nice-reporter";

const browser = (process.env.BROWSER || "chrome").trim();
const retry = process.env.RETRY || 0;
const maxInstances = process.env.MAX_INSTANCES || 1;
// Report Aggregator Instance
let reportAggregator = null;

// Language setting
const LANGUAGE = "es"; // Set the desired language here

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
      "intl.accept_languages": LANGUAGE, // Set language to Spanish
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

CAPABILITIES[browser];

export const config = {
  runner: "local",

  specs: ["../**/*.feature"],

  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances,

  capabilities: CAPABILITIES[browser],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "error",
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

  reporters: [
    [
      "spec",
      {
        onlyFailures: false, // Muestra todos los logs, no solo los fallidos
        addConsoleLogs: true, // Incluye los logs de console.log() en el reporte
        showPreface: false, // Oculta el prefacio del reportero para hacer el reporte más limpio
        sauceLabsSharableLinks: false, // No genera enlaces compartibles en SauceLabs
        realtimeReporting: true, // Habilita la actualización en tiempo real del reporte
        symbols: {
          passed: "[PASS]", // Personaliza el prefijo de pruebas pasadas
          failed: "[FAIL]", // Personaliza el prefijo de pruebas fallidas
        },
      },
    ],
    [
      HtmlReporter,
      {
        debug: true,
        outputDir: "./@reports/html-reports/", // Directorio donde se guardarán los reportes
        filename: "report.html", // Nombre del archivo HTML generado
        reportTitle: "HTML Report", // Título del reporte
        linkScreenshots: true, // Habilita enlaces a capturas de pantalla en el reporte
        showInBrowser: true, // Abre el reporte en el navegador después de la ejecución
        collapseTests: false, // Muestra todas las pruebas expandidas en el reporte
        useOnAfterCommandForScreenshot: false, // Desactiva capturas automáticas después de cada comando
      },
    ],
  ],

  onPrepare: function (config, capabilities) {
    reportAggregator = new ReportAggregator({
      outputDir: "./@reports/html-reports/",
      filename: "report.html",
      reportTitle: "HTML Report",
      browserName: capabilities.browserName,
      collapseTests: true,
    });
    reportAggregator.clean();
  },

  onComplete: async function () {// exitCode, config, capabilities, results
    if (reportAggregator) {
      try {
        await reportAggregator.createReport();
      } catch (error) {
        console.error("Error al generar el reporte:", error);
      }
    } else {
      console.error("ReportAggregator no está inicializado.");
    }
  },

  services: ["chromedriver", "geckodriver"],

  framework: "cucumber",

  cucumberOpts: {
    require: ["./**/*.step.js"],
    retry,
    timeout: 60000,
    ignoreUndefinedDefinitions: true,
    tagExpression: "@NavigatingInTrello",
  },

  before: async () => {
    const wdioExpect = global.expect;

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    global.wdioExpect = wdioExpect;
  },
};

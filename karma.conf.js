// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    remapIstanbulReporter: {
      dir : 'reports/test-results/coverage',
      reports: {
        html: 'coverage',
        lcovonly: 'reports/test-results/coverage/coverage.lcov'
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'reports/coverage/app-contra'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml','junit', 'sonarqube'],
    htmlReporter: {
      outputFile: 'reports/unit/units.html',

      // Optional 
      pageTitle: 'Vida - Tests Unitarios',
      subPageTitle: 'Presentacion HTML de los test unitarios',
      dir: 'reports/html/'
    },
    junitReporter: {
      outputDir: 'reports/unit',
      outputFile: 'test-results.xml',
      suite: '',
      useBrowserName: false
   },
   sonarqubeReporter: {
    basePath: 'src/app',        // test files folder
    filePattern: '**/*spec.ts', // test files glob pattern
    encoding: 'utf-8',          // test files encoding
    outputFolder: 'reports/unit',    // report destination
    legacyMode: false,          // report for Sonarqube < 6.2 (disabled)
    reportName: 'test-sonar.xml'
  },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};

/**
 * @fileoverview Unit tests config for the Coding with Chrome suite.
 *
 * @license Copyright 2020 The Coding with Chrome Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mbordihn@google.com (Markus Bordihn)
 */

import webpackConfig from '../../build/webpack.config.test.babel.js';

// Display unhandled rejections and process errors.
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection', reason);
});
process.on('infrastructure_error', (error) => {
  console.error('infrastructure_error', error);
  process.exit(1);
});

// Setup ENV with Playwright
import playwright from 'playwright';
process.env.CHROMIUM_BIN = playwright.chromium.executablePath();
process.env.FIREFOX_BIN = playwright.firefox.executablePath();
process.env.WEBKIT_HEADLESS_BIN = playwright.webkit.executablePath();

// Karma Test Config
export default (config) => {
  config.set({
    basePath: '../..',
    browserConsoleLogOptions: { level: 'warn' },
    browsers: ['ChromiumHeadless', 'FirefoxHeadless', 'WebkitHeadless'],
    autoWatch: false,
    singleRun: true,
    frameworks: ['jasmine'],
    files: [
      {
        pattern: 'src/**/*_test.js',
        watched: false,
      },
    ],
    preprocessors: {
      'src/**/*_test.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha', 'coverage-istanbul'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
    coverageIstanbulReporter: {
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      'report-config': {
        html: {
          subdir: 'html',
        },
      },
      reports: ['html', 'lcovonly', 'text'],
    },
  });
};

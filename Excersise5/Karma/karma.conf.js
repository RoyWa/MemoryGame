// Karma configuration
// Generated on Tue Jun 02 2015 12:53:25 GMT+0300 (IDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

        '/Users/roy.wallerstein/code/snc/geneva/app-automation/glide-workflow/src/main/plugins/com.glideapp.workflow/ui.html/scripts/angular.js',
        '/Users/roy.wallerstein/code/snc/geneva/glide/glide-ng/src/main/plugins/com.glide.ui.angular/ui.html/scripts/angular/angular-mocks.js',
        '/Users/roy.wallerstein/Documents/WORK/Learning/HandsOn/MemoryGame/Excersise5/Karma/KarmaUnitTest.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9999,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};

module.exports = function (config) {
    var dependencies = require('../package.json').dependencies;
    var excludedDependencies = [];
    var configuration = {
        basePath: '..',

        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        reporters: ['progress'],

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/nools/nools.js',
            // 'config/karma-test-shim.js',
            'app/**/*.js',
            'test/**/*.js'

        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            "/config/": "/base/config/",
            "/app/": "/base/app/",
            "/test/": "/base/test/",
            "/node_modules/": "/base/node_modules/"
        },

        exclude: [
            "src/**/*.e2e.*"
        ],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true
    };

    Object.keys(dependencies).forEach(function (key) {
        if (excludedDependencies.indexOf(key) >= 0) {
            return;
        }

        configuration.files.push({
                                     pattern: 'node_modules/' + key + '/**/*.js',
                                     included: false,
                                     watched: false
                                 });
    });

    if (process.env.APPVEYOR) {
        configuration.browsers = ['IE'];
        configuration.singleRun = true;
        configuration.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
    }

    config.set(configuration);
};

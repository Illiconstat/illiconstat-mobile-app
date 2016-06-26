module.exports = function (config) {
    var dependencies = require('../bower.json').dependencies;
    var excludedDependencies = [];
    var configuration = {
        basePath: '..',

        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        reporters: ['progress'],

        files: [
            'www/lib/angular/angular.js',
            'www/lib/angular-mocks/angular-mocks.js',
            'www/lib/browserify-bundle.js',
            'www/app/**/*.js',
            'test/**/*.js'
        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            "/config/": "/base/config/",
            "/www/": "/base/www/",
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

    if (dependencies) {
        Object.keys(dependencies).forEach(function (key) {
            if (excludedDependencies.indexOf(key) >= 0) {
                return;
            }

            configuration.files.push({
                                         pattern: 'www/lib/' + key + '/**/*.js',
                                         included: false,
                                         watched: false
                                     });
        });
    }

    if (process.env.APPVEYOR) {
        configuration.browsers = ['IE'];
        configuration.singleRun = true;
        configuration.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
    }

    config.set(configuration);
};

module.exports = function (config) {
    var configuration = {
        basePath: '..',

        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        reporters: ['progress'],

        files: [
            'www/lib/angular/angular.js',
            'www/lib/angular-ui-router/release/angular-ui-router.js',
            'www/lib/nools/nools.js',
            'www/lib/browserify-bundle.js',
            'www/lib/angular-mocks/angular-mocks.js',
            'www/app/**/*.module.js',
            'www/app/**/!(*.module)+(.js)',
            // 'config/karma-test-shim.js',
            'test/**/*.js'
        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            "/config/": "/base/config/",
            "/www/": "/base/www/",
            "/test/": "/base/test/"
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

    if (process.env.APPVEYOR) {
        configuration.browsers = ['IE'];
        configuration.singleRun = true;
        configuration.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
    }

    config.set(configuration);
};

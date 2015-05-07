module.exports = function (config) {
  config.set( {
    basePath : '../',

    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks : ['jasmine'],

    browsers : ['Firefox'],

    plugins : [ 'karma-firefox-launcher',
                'karma-jasmine' ],

    junitReporter : {
      outputFile : 'test_out/unit.xml',
      suite : 'unit'
    }

  });
};

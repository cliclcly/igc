module.exports = function (config) {
  config.set( {
    basePath : '../',

    files : [
      'lib/angular.js',
      'lib/angular-ui-router.min.js',
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

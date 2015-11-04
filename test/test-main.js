var allTestFiles = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
       allTestFiles.push(file);
    }
  }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/dist/javascript',

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,

  paths: {
      'angular':            'vendor/angular',
      'angular-bing-maps':  'vendor/angular-bing-maps',
      'angular-chart':      'vendor/angular-chart',
      'angular-route':      'vendor/angular-route',
      'angular-sanitize':   'vendor/angular-sanitize',
      'angularjs-viewhead': 'vendor/angularjs-viewhead',
      'autosize':           'vendor/autosize.min',
      'canvasRenderer':     'vendor/CanvasRenderer',
      'chart':              'vendor/Chart',
      'jquery':             'vendor/jquery',
      'i18next':            'vendor/i18next',
      'mapcontrol':         '//ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0',
      'ng-i18next':         'vendor/ng-i18next',
      'projector':          'vendor/Projector',
      'three':              'vendor/three.min',
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'angular-bing-maps':  ['angular', 'mapcontrol'],
      'angular-chart':      ['chart', 'angular'],
      'angular-route':      ['angular'],
      'angular-sanitize':   ['angular'],
      'angularjs-viewhead': ['angular'],
      'autosize':           ['jquery'],
      'canvasRenderer':     ['three'],
      'i18next':            ['jquery'],
      'loader':             ['angular-bing-maps', 'angular-chart', 'angular-route', 'angular-sanitize', 'angularjs-viewhead', 'ng-i18next'],
      'ng-i18next':         ['angular', 'i18next'],
      'projector':          ['three']
  }
});

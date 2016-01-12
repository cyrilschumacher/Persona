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
        "angular": "vendor/angular",
        "angular-google-analytics": "vendor/angular-google-analytics",
        "angular-route": "vendor/angular-route",
        "angular-resource": "vendor/angular-resource",
        "angular-sanitize": "vendor/angular-sanitize",
        "angular-scroll": "vendor/angular-scroll",
        "angular-translate": "vendor/angular-translate",
        "angularjs-viewhead": "vendor/angularjs-viewhead",
        "autosize": "vendor/autosize",
        "borderMenu": "vendor/borderMenu",
        "canvasRenderer": "vendor/CanvasRenderer",
        "classie": "vendor/classie",
        "i18next": "vendor/i18next",
        "jquery": "vendor/jquery",
        "ng-i18next": "vendor/ng-i18next",
        "projector": "vendor/Projector",
        "tmhDynamicLocale": "vendor/tmhDynamicLocale",
        "three": "vendor/three",
        "reCaptcha": "https://www.google.com/recaptcha/api"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-google-analytics": ["angular"],
        "angular-route": ["angular"],
        "angular-resource": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-scroll": ["angular"],
        "angular-translate": ["angular"],
        "angularjs-viewhead": ["angular"],
        "tmhDynamicLocale": ["angular", "angular-translate"],
        "autosize": ["jquery"],
        "borderMenu": ["classie"],
        "canvasRenderer": ["three"],
        "i18next": ["jquery"],
        "ng-i18next": ["angular", "i18next"],
        "projector": ["three"]
    }
});

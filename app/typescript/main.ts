/// <reference path="../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

requirejs.config({
    baseUrl: '/scripts/',
    paths: {
        'jquery':                     'vendors/jquery/dist/jquery',
        'jquery-ui':                  'vendors/jquery-ui/jquery-ui',
        'angular':                    'vendors/angular/angular',
        'angular-animate':            'vendors/angular-animate/angular-animate',
        'angular-route':              'vendors/angular-route/angular-route',
        'angular-route-styles':       'vendors/angular-route-styles/route-styles',
        'angular-ui-router':          'vendors/angular-ui-router/release/angular-ui-router',
        'i18next':                    'vendors/i18next/i18next',
        'ng-i18next':                 'vendors/ng-i18next/dist/ng-i18next',
        
        'app':                        'app',
        'persona':                    'persona',
        
        'i18nextConfiguration':       'configuration/i18nextConfiguration',
        'routeConfiguration':         'configuration/routeConfiguration',
        'homeController':             'controllers/homeController',
        'contactController':          'controllers/contactController',
        'scrollToDirective':          'directives/scrollToDirective',
        'fullHeightWindowDirective':  'directives/fullHeightWindowDirective',
        'resumeService':              'services/resumeService',
        'worksService':               'services/worksService',
        
        'jquery.fadeonscroll':        'librairies/jquery.fadeonscroll/jquery.fadeonscroll'
    },
    shim: {
        'angular-animate':      ['angular'],
        'angular-route':        ['angular'],
        'angular-route-styles': ['angular'],
        'angular-ui-router':    ['angular'],
        'i18next':              ['jquery'],
        'jquery-ui':            ['jquery'],
        'ng-i18next':           ['angular', 'i18next'],
        'persona':              ['angular-animate', 'angular-route', 'angular-route-styles', 'ng-i18next']
    },
    priority: ['angular'],
    deps: ['app']
});
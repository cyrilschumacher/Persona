/// <reference path="../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

requirejs.config({
    baseUrl: '/scripts/',
    paths: {
        // Librairies.
        // JQuery.
        jquery:                     'vendors/jquery/dist/jquery',
        jqueryUi:                   'vendors/jquery-ui/jquery-ui',
        // AngularJS.
        angular:                    'vendors/angular/angular',
        angularRoute:               'vendors/angular-route/angular-route',
        angularRouteStyles:         'vendors/angular-route-styles/route-styles',
        angularUiRouter:            'vendors/angular-ui-router/release/angular-ui-router',
        angularAnimate:             'vendors/angular-animate/angular-animate',
        // i18next.
        i18next:                    'vendors/i18next/i18next',
        ngI18next:                  'vendors/ng-i18next/dist/ng-i18next',
        
        // Application.
        application:                'app',
        
        // Configuration.
        i18n:                       'configuration/internationalization',
        route:                      'configuration/route',
        
        // Directives.
        scrollToDirective:          'directives/scrollToDirective',
        fullHeightWindowDirective:  'directives/fullHeightWindowDirective',
        
        // Controllers.
        homeController:             'controllers/homeController',
        contactController:          'controllers/contactController',
        
        // Services.
        resumeService:              'services/resumeService',
        worksService:               'services/worksService',
        
        // Librairies.
        jqueryFadeOnScroll:         'librairies/jquery.fadeonscroll/jquery.fadeonscroll'
    },
    shim: {
        // Librairies.
        angularRoute:       ['angular'],
        angularRouteStyles: ['angular'],
        angularUiRouter:    ['angular'],
        angularAnimate:     ['angular'],
        ngI18next:          ['angular', 'i18next']
    },
    priority: ['angular'],
    deps: ['application']
});
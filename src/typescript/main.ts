/* The MIT License (MIT)
 * 
 * Copyright (c) 2014 Cyril Schumacher.fr
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/// <reference path="../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

require.config({
    baseUrl: '/scripts/',
    urlArgs: 'v=1.0',
    paths: {
        // Vendors.
        'jquery':                     'vendors/jquery/dist/jquery',
        'jquery-ui':                  'vendors/jquery-ui/jquery-ui',
        'jquery-autosize':            'vendors/jquery-autosize/jquery.autosize',
        'angular':                    'vendors/angular/angular',
        'angular-animate':            'vendors/angular-animate/angular-animate',
        'angular-route':              'vendors/angular-route/angular-route',
        'angular-route-styles':       'vendors/angular-route-styles/route-styles',
        'angular-ui-router':          'vendors/angular-ui-router/release/angular-ui-router',
        'i18next':                    'vendors/i18next/i18next',
        'ng-i18next':                 'vendors/ng-i18next/dist/ng-i18next',
        
        // Application.
        'app':                        'app',
        'persona':                    'persona',
        
        // Configurations.
        'i18nextConfiguration':       'configuration/i18nextConfiguration',
        'routeConfiguration':         'configuration/routeConfiguration',
        
        // Controllers.
        'aboutController':            'controllers/aboutController',
        'contactController':          'controllers/contactController',
        'homeController':             'controllers/homeController',
        
        // Directives.
        'scrollToDirective':          'directives/scrollToDirective',
        'fullHeightWindowDirective':  'directives/fullHeightWindowDirective',
        
        // Services.
        'profileService':             'services/profileService',
        'resumeService':              'services/resumeService',
        'worksService':               'services/worksService',
        
        // Librairies.
        'jquery.fadeonscroll':        'librairies/jquery.fadeonscroll/jquery.fadeonscroll',
        
        // Utilities.
        'routeResolver':              'utils/routeResolver'
    },
    shim: {
        'angular-animate':      ['angular'],
        'angular-route':        ['angular'],
        'angular-route-styles': ['angular'],
        'angular-ui-router':    ['angular'],
        'i18next':              ['jquery'],
        'jquery-ui':            ['jquery'],
        'jquery-autosize':      ['jquery'],
        'ng-i18next':           ['angular', 'i18next'],
    },
    deps: ['app']
});
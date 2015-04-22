/* The MIT License (MIT)
 * 
 * Copyright (c) 2015 Cyril Schumacher.fr
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

/// <reference path="../../bower_components/DefinitelyTyped/requirejs/require.d.ts" />

require.config({
    urlArgs: 'v=1.0',
    
    paths: {
        // Vendors.
        angular:                'vendor/angular/angular',
        angularAnimate:         'vendor/angular-animate/angular-animate',
        angularjsViewhead:      'vendor/angularjs-viewhead/angularjs-viewhead',
        angularRoute:           'vendor/angular-route/angular-route',
        angularRouteStyles:     'vendor/angular-route-styles/route-styles',
        angularUiRouter:        'vendor/angular-ui-router/release/angular-ui-router',
        jquery:                 'vendor/jquery/dist/jquery',
        jqueryUi:               'vendor/jquery-ui/jquery-ui',
        jqueryAutosize:         'vendor/jquery-autosize/jquery.autosize',
        jqueryFadebyscroll:     'vendor/jquery.fadebyscroll/dist/jquery.fadebyscroll',
        i18next:                'vendor/i18next/i18next',
        ngI18next:              'vendor/ng-i18next/dist/ng-i18next',
        velocity:               'vendor/velocity/velocity',
        
        // Loader.
        loader:                 'loader'
    },
    
    shim: {
        // Vendors.
        angularjsViewhead:  ['angular'],
        angularRoute:       ['angular'],
        angularRouteStyles: ['angular'],
        bootstrap:          ['jquery'],
        i18next:            ['jquery'],
        jqueryAutosize:     ['jquery'],
        jqueryUi:           ['jquery'],
        ngI18next:          ['angular', 'i18next'],
        
        // Loader.
        loader:             ['angularjsViewhead', 'angularRoute', 'angularRouteStyles']
    }
});

require(['loader']);
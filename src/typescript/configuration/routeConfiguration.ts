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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts"/>

module Application.Configuration {

    /**
     * @summary Persona routing configuration.
     * @author  Cyril Schumacher
     * @class
     */
    export class RouteConfiguration {
        /**
         * @summary Constructor.
         * @param {IRouteProvider} $routeProvier Route provider.
         */
        public constructor(private $routeProvider: ng.route.IRouteProvider) {
            this._init($routeProvider);
        }
        
        /**
         * @summary Create a route.
         * @param {IRouteProvider} $routeProvier Route provider.
         * @param {string} path Route path.
         * @param {string} controllerName Controller name.
         * @param {string} cssPath Path to CSS file.
         * @param {string} templatePath Path to template file.
         */
        private _createRoute = ($routeProvider: ng.route.IRouteProvider, path: string, controllerName: string, cssPath: string, templatePath: string) => {
            $routeProvider.when(path, {controller: controllerName, css: '/stylesheets/' + cssPath, templateUrl: '/views/' + templatePath});
        }

        /**
         * @summary Initialize route.
         * @param {IRouteProvider} $routeProvier Route provider.
         */
        private _init = ($routeProvider: ng.route.IRouteProvider) => { 
            this._createRoute($routeProvider, '/', 'homeController', 'home.css', 'home.html');
            this._createRoute($routeProvider, '/contact', 'contactController', 'contact.css', 'contact.html');
            $routeProvider.otherwise({redirectTo: '/'});
        }
    }

    RouteConfiguration.$inject = ['$routeProvider'];
}
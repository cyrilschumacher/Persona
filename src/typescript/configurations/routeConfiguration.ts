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

module Application.Configuration {
    /**
     * @summary Persona routing configuration.
     * @author  Cyril Schumacher
     * @class
     */
    export class RouteConfiguration {
        'use strict';
    
        /**
         * @summary Dependencies injection.
         */
        public static $inject: Array<String> = ['$routeProvider'];
    
        /**
         * @summary Constructor.
         * @param {IRouteProvider} $routeProvier Route provider.
         */
        public constructor(private $routeProvider: ng.route.IRouteProvider) {
            var routeResolver = new RouteResolver('/scripts/controllers/', '/stylesheets/', '/views/');
            $routeProvider.when('/', routeResolver.resolve('home'))
                          .when('/about', routeResolver.resolve('about'))
                          .when('/works', routeResolver.resolve('works'))
                          .when('/contact', routeResolver.resolve('contact'))
                          .otherwise({redirectTo: '/'});
        }
    }
}
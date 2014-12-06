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

/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

module Application {
    /**
     * @summary Persona application.
     * @author  Cyril Schumacher
     * @class
     */
    export class Persona {
        'use strict';
    
        /**
         * @summary Angular module.
         * @member {IModule}
         */
        private _module: ng.IModule;
    
        /**
         * Gets the angular module.
         */
        public get module():ng.IModule {
            return this._module;
        } 

        /**
         * @summary Constructor.
         */
        public constructor() {
            this._module = angular.module('persona', ['ngRoute', 'routeStyles', 'jm.i18next']);
            this._initConfigurations();
        }

        /**
         * @summary Initialize configuration.
         */
        private _initConfigurations() {
            this._module.config(Application.Configuration.RouteConfiguration)
                     .config(Application.Configuration.i18nextConfiguration)
                     .config(['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 
                              ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) => {
                         this._module.register = { 
                             controller: $controllerProvider.register, 
                             directive: $compileProvider.directive, 
                             filter: $filterProvider.register, 
                             factory: $provide.factory, 
                             service: $provide.service
                         }; 
                     }]);
        }
    }

    define(['angular-route', 'angular-route-styles', 'i18next', 'routeResolver', 'routeConfiguration', 'i18nextConfiguration', 'ng-i18next'], () => new Persona);
}
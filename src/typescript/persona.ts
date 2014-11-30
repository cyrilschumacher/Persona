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
    'use strict';
    
    /**
     * @summary Persona application.
     * @author  Cyril Schumacher
     * @class
     */
    export class Persona {
        /**
         * @summary Application.
         * @member {string}
         */
        private _app: ng.IModule;

        /**
         * @summary Constructor.
         */
        public constructor() {
            this._app = angular.module('persona', ['ngRoute', 'ngAnimate', 'routeStyles', 'jm.i18next']);
            
            this._initConfigurations();
            this._initControllers();
            this._initServices();
            this._initDirectives();
        }

        /**
         * @summary Initialize configuration.
         */
        private _initConfigurations() {
            this._app.config(Application.Configuration.RouteConfiguration)
                     .config(Application.Configuration.i18nextConfiguration);
        }

        /**
         * @summary Initialize controllers.
         */
        private _initControllers() {
            this._app.controller("homeController", ["$scope", "$i18next", "worksService", ($scope, $i18next, $worksService) => new Controllers.HomeController($scope, $i18next, $worksService)])
                     .controller("contactController", ["$scope", "$i18next", "profileService", ($scope, $i18next, $profileService) => new Controllers.ContactController($scope, $i18next, $profileService)]);
        }
    
    
        /**
         * @summary Initialize directives.
         */
        private _initDirectives() {
            this._app.directive('ngScrollTo', () => new Directives.ScrollToDirective())
                     .directive('ngFullHeightWindow', () => new Directives.FullHeightWindowDirective());
        }
    
        /**
         * @summary Initialize services.
         */
        private _initServices() {
            this._app.factory('profileService', ["$http", ($http) => new Services.ProfileService()])
                     .factory('resumeService', ["$http", ($http) => new Services.ResumeService()])
                     .factory('worksService', ["$http", ($http) => new Services.WorksService()]);
        }
    }
}
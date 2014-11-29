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
         * @param {Array<string>} modules Modules to load.
         */
        public constructor(angular: ng.IAngularStatic) {
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
            this._app.config(Application.Configuration.RouteConfiguration);
            this._app.config(Application.Configuration.i18nextConfiguration);
        }

        /**
         * @summary Initialize controllers.
         */
        private _initControllers() {
            this._app.controller("homeController", ["$scope", "$i18next", "worksService", ($scope, $i18next, $worksService) => new Controllers.HomeController($scope, $i18next, $worksService)])
                     .controller("contactController", ["$scope", "$i18next", ($scope, $i18next) => new Controllers.ContactController($scope, $i18next)]);
        }
    
    
        /**
         * @summary Initialize directives.
         */
        private _initDirectives() {
            this._app.directive('ngScrollTo', () => new Directives.ScrollToDirective());
            this._app.directive('ngFullHeightWindow', () => new Directives.FullHeightWindowDirective());
        }
    
        /**
         * @summary Initialize services.
         */
        private _initServices() {
            this._app.factory('worksService', ["$http", ($http) => new Services.WorksService()]);
        }
    }
}
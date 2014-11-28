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
        private _app: any;

        /**
         * @summary Constructor.
         * @param {Array<string>} modules Modules to load.
         */
        public constructor(modules: Array<string>) {
            modules = modules ? modules : [''];
            this._app = this._createAppModule(modules);
        }

        /**
         * @summary Create a application module.
         * @param {Array<string>} modules Modules.
         */
        private _createAppModule(modules: Array<string>) {
            return angular.module('persona', modules);
        }

        /**
         * @summary Initialize configuration.
         * @param {Object} config Angular configuration.
         */
        private _initConfig(config: Array<Object>) {
            for (var index in config) {
                this._app.config(config[index]);
            }
        }

        /**
         * @summary Initialize controllers.
         */
        private _initControllers() {
            this._app.controller("homeController", ["$scope", "$i18next", "worksService",
                ($scope, $i18next, $worksService) => new Controllers.HomeController($scope, $i18next, $worksService)
            ]);
            this._app.controller("contactController", [
                "$scope", "$i18next", ($scope, $i18next) => new Controllers.ContactController($scope, $i18next)
            ]);
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
    
        /**
         * @summary Initialize class.
         * @param {Object} route Angular routing.
         */
        public init(config: Array<Object>) {
            this._initConfig(config);
            this._initControllers();
            this._initServices();
            this._initDirectives();
        }
    }
}
    
require(['angularAnimate', 'angularRoute', 'angularRouteStyles', 'ngI18next', 'i18n', 'route', 'fullHeightWindowDirective', 'scrollToDirective', 'jqueryFadeOnScroll', 'homeController', 'contactController', 'worksService'], function () {
    var modules: Array<string> = ['ngRoute', 'ngAnimate', 'routeStyles', 'jm.i18next'];
    var persona: Persona = new Application.Persona(modules);
    var config: Array = [Application.Configuration.Route, Application.Configuration.Internationalization];
    persona.init(config);
});
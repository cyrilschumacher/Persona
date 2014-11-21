/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

module Application {
    'use strict';

    /**
     * @summary Persona application.
     * @author  Cyril Schumacher
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
        private _initAngularConfig(config: Object) {
            this._app.config(config); 
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
         * @summary Initialize services.
         */
        private _initServices() {
            this._app.factory('worksService', ["$http", ($http) => new Services.WorksService()]);
        }
    
        /**
         * @summary Initialize class.
         * @param {Object} config Angular configuration.
         */
        public init(config: Object) {
            this._initAngularConfig(Config);
            this._initControllers();
            this._initServices();
        }
    }
}
    
require(['angularAnimate', 'angularRoute', 'angularRouteStyles', 'ngI18next', 'configuration', 'homeController', 'contactController', 'worksService'], function () {
    var modules: Array<string> = ['ngRoute', 'ngAnimate', 'routeStyles', 'jm.i18next'];
    var persona = new Application.Persona(modules);
    persona.init(Application.Config);
});
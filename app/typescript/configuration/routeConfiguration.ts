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
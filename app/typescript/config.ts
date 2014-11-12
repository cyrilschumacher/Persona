/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts"/>

module Application {

    /**
     * @summary Persona configuration.
     * @author  Cyril Schumacher
     */
    export class Config {
        /**
         * @summary Constructor.
         * @param {IRouteProvider} $routeProvier Route provider.
         * @param {any} $i18nextProvider i18next provider.
         */
        public constructor(private $routeProvider: ng.route.IRouteProvider, private $i18nextProvider: any) {
            this._initRoute($routeProvider);
            this._initI18next($i18nextProvider);
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
        private _initRoute = ($routeProvider: ng.route.IRouteProvider) => { 
            this._createRoute($routeProvider, '/', 'homeController', 'home.css', 'home.html');
            this._createRoute($routeProvider, '/contact', '', 'contact.css', 'contact.html');
            $routeProvider.otherwise({redirectTo: '/'});
        }

        /**
         * @summary Initialize i18next plugin.
         * @param {any} $i18nextProvider i18next provider.
         */
        private _initI18next = ($i18nextProvider: any) => {
            $i18nextProvider.options = {
                debug: true,
                fallbackLng: 'dev',
                lng: 'dev',
                resGetPath: '/scripts/locales/__ns__-__lng__.json',
                useCookie: false,
                useLocalStorage: false
            };
        }
    }

    Config.$inject = ['$routeProvider', '$i18nextProvider'];
}
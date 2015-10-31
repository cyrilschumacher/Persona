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

/// <reference path="../typing/angularjs/angular-route.d.ts" />

/**
 * @summary Application routing configuration block.
 * @author  Cyril Schumacher
 * @class
 */
class RouteConfiguration {
    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ["$routeProvider", "appConfigRoute"];

    /**
     * @summary Constructor.
     * @constructs
     * @param {IRouteProvider} $routeProvier Route provider.
     * @param {Object}         appConfig     The application configuration.
     */
    public constructor(private $routeProvider: ng.route.IRouteProvider, private appConfigRoute: Object) {
        $routeProvider.when("/",                          this._addRoute("home"))
                      .when("/about",                     this._addRoute("about"))
                      .when("/works",                     this._addRoute("works"))
                      .when("/contact",                   this._addRoute("contact"))
                      .when("/:language",                 this._addRoute("home"))
                      .when("/:language/about",           this._addRoute("about"))
                      .when("/:language/works",           this._addRoute("works"))
                      .when("/:language/contact",         this._addRoute("contact"))
                      .otherwise({redirectTo: '/'});
    }

    /**
     * Adds route.
     * @private
     * @param   {string}            viewName        View name.
     * @param   {string}            controllerName  Controller name. Optional.
     * @param   {string|string[]}   stylesheetName  Stylesheet name. Optional.
     * @return  {IRoute}                            A route definition.
     */
     private _addRoute = (viewName: string, controllerName?: string, stylesheetName?: string|Array<string>): ng.route.IRoute => {
        controllerName = controllerName ? controllerName : viewName;

        var controllerNameWithPrefix    = controllerName.concat('Controller');
        var templateFile                = this.appConfigRoute["viewPath"].concat(viewName, ".html");
        var controllerFile              = this.appConfigRoute["controllerPath"].concat(controllerName, ".js");

        return {
            controller:     controllerNameWithPrefix,
            resolve:        this._resolve(controllerFile),
            templateUrl:    templateFile
        };
     }

    /**
     * @summary Resolve route.
     * @private
     * @param   {string|Array<string>} viewName View name.
     * @return  {any}                           Resolve object.
     */
    private _resolve = (controllerFile: string|Array<string>): any => {
        var dependencies: Array<string> = (typeof controllerFile === "string") ? [controllerFile] : controllerFile;
        return { load: ["$q", "$rootScope", ($q: ng.IQService, $rootScope: ng.IRootScopeService) => this._resolveDependencies($q, $rootScope, dependencies)] };
    }

    /**
     * @summary Resolve dependencies.
     * @private
     * @param   {IQService}         $q           Q service.
     * @param   {IRootScopeService} $rootScope   Root scope service.
     * @param   {Array<string>}     dependencies Dependencies.
     * @return  {IPromise<any>}                  Promise.
     */
    private _resolveDependencies = ($q: ng.IQService, $rootScope: ng.IRootScopeService, dependencies: Array<string>): ng.IPromise<any> => {
        var defer = $q.defer();

        require(dependencies, () => {
            defer.resolve();
            $rootScope.$apply();
        });

        return defer.promise;
    }
}

export = RouteConfiguration;

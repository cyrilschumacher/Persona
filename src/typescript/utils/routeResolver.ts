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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts"/>

class RouteResolver {
    /**
     * @summary Constructor.
     * @param   {string} controllerPath   Path to controller files.
     * @param   {string} stylesheetPath   Path to stylesheet files.
     * @param   {string} viewPath         Path to view files.
     */
    public constructor(private controllerPath: string, private stylesheetPath: string, private viewPath: string) {}

    /**
     * @summary Resolve dependencies.
     * @param   {IQService}         $q           Q service.
     * @param   {IRootScopeService} $rootScope   Root scope service.
     * @param   {Array<string>}     dependencies Dependencies.
     * @return  {IPromise<any>}     Promise.  
     */
    private _resolveDependencies = ($q: ng.IQService, $rootScope: ng.IRootScopeService, dependencies: Array<string>): ng.IPromise<any> => {
        var defer = $q.defer();
        require(dependencies, () => {
            defer.resolve();
            $rootScope.$apply();
        });

        return defer.promise;
    }

    /**
     * @summary Resolve route.
     * @param   {string} viewName         View name.
     * @param   {string} stylesheetName   Stylesheet name. Optional.
     * @param   {string} controllerName   Controller name. Optional.
     * @return  {IRoute} A route definition.
     */
    public resolve = (viewName: string, stylesheetName?: string, controllerName?: string): ng.route.IRoute => {
        controllerName = (controllerName) ? controllerName : viewName;
        stylesheetName = (stylesheetName) ? stylesheetName : viewName;
        return {
            css: this.stylesheetPath + stylesheetName + '.css',
            controller: controllerName + 'Controller',
            templateUrl: this.viewPath + viewName + '.html',
            resolve: {
                load: ['$q', '$rootScope', ($q, $rootScope) => {
                    var dependencies = [this.controllerPath + controllerName + 'Controller.js'];
                    return this._resolveDependencies($q, $rootScope, dependencies);
                }]
            }
        };
    }
}
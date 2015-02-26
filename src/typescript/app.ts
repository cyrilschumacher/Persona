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

/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />

/// <amd-dependency path="ngI18next"/>

import routeConfiguration = require('configuration/routeConfiguration');
import i18nextConfiguration = require('configuration/i18nextConfiguration');
import loadingRun = require('run/loadingRun');

/**
 * @summary Application.
 * @author  Cyril Schumacher
 * @class
 */
class Application {
    /**
     * @summary Instance.
     * @private
     * @type {Application}
     */
    private static _instance: Application;
    
    /**
     * @summary Angular module.
     * @private
     * @type {IModule}
     */
    private _module: ng.IModule;
    
    /**
     * @summary Gets the angular module.
     * @public
     * @returns {IModule} Module.
     */
    public get module(): ng.IModule {
        return this._module;
    }

    /**
     * @summary Gets the instance of class.
     * @public
     * @returns {Application} Instance of class.
     */
    public static get instance(): Application
    {
        if(!Application._instance) {
            Application._instance = new Application();
        }
        
        return Application._instance;
    }

    /**
     * @summary Constructor.
     * @constructs
     * @private
     */
    constructor() {
        // Initialize module.
        this._initModule();
    }

    /**
     * @summary Initialize class.
     * @public
     */
    public initialize = (): void => {
        // Initialize constants, configuration and run blocks.
        this._initConstants();
        this._initConfigurations();
        this._initRun();
    }
        
    /**
     * @summary Initialize configuration blocks.
     * @private
     */
    private _initConfigurations = (): void => {
        this._module.config(routeConfiguration)
                    .config(i18nextConfiguration)
                    .config(['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', this._register]);
    }
    
    /**
     * @summary Initialize run blocks.
     * @private
     */
    private _initRun = (): void => {
        this._module.run(loadingRun);   
    }
        
    /**
     * @summary Initialize constants.
     * @private
     */
    private _initConstants = (): void => {
        // Creates an application configuration.
        var appConfig: Object = {
            'route': {
                'controllerPath': 'scripts/controller/',
                'cssPath': 'css/',
                'viewPath': 'content/view/'
            }
        };
        
        this._module.constant('appConfig', appConfig)
    }

    /**
     * @summary Initialize module.
     * @private
     */
    private _initModule = (): void => {
        this._module = angular.module('app', ['ngRoute', 'routeStyles', 'jm.i18next']);
    }

    /**
     * @summary Register providers.
     * @private
     * @param {IRouteProvider}      $routeProvider      Route provider.
     * @param {IControllerProvider} $controllerProvider Controller provider.
     * @param {ICompileProvider}    $compileProvider    Compile provider.
     * @param {IFilterProvider}     $filterProvider     Filter provider.
     * @param {any}                 $provide            Provide.
     */
    private _register = ($routeProvider: ng.route.IRouteProvider, $controllerProvider: ng.IControllerProvider, $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider, $provide: any) => {
        this._module['register'] = { 
            controller: $controllerProvider.register, 
            directive: $compileProvider.directive, 
            filter: $filterProvider.register, 
            factory: $provide.factory, 
            service: $provide.service
        };
    }
}

export = Application;
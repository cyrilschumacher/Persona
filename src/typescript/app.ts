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

import configurationProviderService = require('service/configurationProviderService');
import i18nextConfiguration = require('configuration/i18nextConfiguration');
import locationConfiguration = require('configuration/locationConfiguration');
import routeConfiguration = require('configuration/routeConfiguration');
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
    public static get instance(): Application {
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
        this._initializeModule();
    }

    /**
     * @summary Initialize class.
     * @public
     */
    public initialize = (): void => {
        // Initialize constants, configuration and run blocks.
        this._initializeConstants();
        this._initializeProvider();
        this._initializeConfigurations();
        this._initializeRun();
    }
        
    /**
     * @summary Initialize configuration blocks.
     * @private
     */
    private _initializeConfigurations = (): void => {
        this._module.config(['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', this._register])
                    .config(i18nextConfiguration)
                    .config(routeConfiguration)
                    .config(locationConfiguration);
    }
    
    /**
     * @summary Initialize run blocks.
     * @private
     */
    private _initializeRun = (): void => {
        this._module.run(loadingRun);
    }
        
    /**
     * @summary Initialize providers.
     * @private
     */
    private _initializeProvider = (): void => {
        var provide = new configurationProviderService(this._module, 'scripts/configuration.json');
        this._module.provider('appConfig', provide);
    }
        
    /**
     * @summary Initialize constants.
     * @private
     */
    private _initializeConstants = (): void => {      
        var appConfigRoute: Object = { 
            'controllerPath':   'scripts/controller/', 
            'cssPath':          'css/', 
            'viewPath':         'content/view/'
        }; 

        this._module.constant('appConfigRoute', appConfigRoute);
    }

    /**
     * @summary Initialize module.
     * @private
     */
    private _initializeModule = (): void => {
        const MODULE_NAME = 'persona';
        this._module = angular.module(MODULE_NAME, ['ngRoute', 'routeStyles', 'jm.i18next', 'viewhead']);
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
            directive:  $compileProvider.directive, 
            filter:     $filterProvider.register, 
            factory:    $provide.factory, 
            service:    $provide.service
        };
    }
}

export = Application;

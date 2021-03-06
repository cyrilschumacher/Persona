/* The MIT License (MIT)
 *
 * Copyright (c) 2016 Cyril Schumacher.fr
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

///<amd-dependency path="angular-google-analytics"/>
///<amd-dependency path="angular-route"/>
///<amd-dependency path="angular-resource"/>
///<amd-dependency path="angular-sanitize"/>
///<amd-dependency path="angular-scroll"/>
///<amd-dependency path="angularjs-viewhead"/>
///<amd-dependency path="ng-i18next"/>
///<amd-dependency path="tmhDynamicLocale"/>

// Provider
import ConfigurationProvider = require("./provider/configuration");

// Configuration
import GoogleAnalyticsConfiguration = require("./configuration/googleAnalytics");
import i18nextConfiguration = require("./configuration/i18next");
import RegisterConfiguration = require("./configuration/register");
import RouteConfiguration = require("./configuration/route");
import LocationConfiguration = require("./configuration/location");
import TranslationConfiguration = require("./configuration/translation");

// Run
import GoogleAnalytics = require("./run/googleAnalytics");
import TemplateCacheRun = require("./run/templateCache");

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
     * @returns {IModule} The module.
     */
    public get module(): ng.IModule {
        return this._module;
    }

    /**
     * @summary Gets the application name.
     * @returns {string} The application name.
     */
    public get name(): string {
        return "persona";
    }

    /**
     * @summary Gets the instance of class.
     * @returns {Application} Instance of class.
     */
    public static get instance(): Application {
        if (!Application._instance) {
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
     * @summary Initializes configuration blocks.
     * @private
     */
    private _initializeConfigurations = (): void => {
        this._module.config(GoogleAnalyticsConfiguration)
                    .config(i18nextConfiguration)
                    .config(LocationConfiguration)
                    .config(RegisterConfiguration)
                    .config(RouteConfiguration)
                    .config(TranslationConfiguration);
    };

    /**
     * @summary Initializes run blocks.
     * @private
     */
    private _initializeRun = (): void => {
        this._module.run(TemplateCacheRun)
                    .run(GoogleAnalytics);
    };

    /**
     * @summary Initializes providers.
     * @private
     */
    private _initializeProvider = (): void => {
        this._module.provider("appConfig", ConfigurationProvider);
    };

    /**
     * @summary Initializes constants.
     * @private
     */
    private _initializeConstants = (): void => {
        const appConfigRoute: Object = {
            "controllerPath":   "controller/",
            "cssPath":          "css/",
            "viewPath":         "content/view/"
        };

        this._module.constant("appConfigRoute", appConfigRoute);
    };

    /**
     * @summary Initializes module.
     * @private
     */
    private _initializeModule = (): void => {
        const requires = ["tmh.dynamicLocale", "angular-google-analytics", "jm.i18next", "ngRoute", "viewhead", "duScroll", "ngResource"];
        this._module = angular.module(this.name, requires);
    };

    /**
     * @summary Initializes class.
     */
    public initialize = (): void => {
        this._initializeProvider();
        this._initializeConstants();
        this._initializeConfigurations();
        this._initializeRun();
    };

    public setConfiguration = (configuration: Object): void => {
        this._module.config(['appConfigProvider', (appConfigProvider: ConfigurationProvider) => {
            appConfigProvider.set(configuration);
        }]);
    }
}

export = Application.instance;

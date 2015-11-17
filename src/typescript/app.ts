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

import ConfigurationProvider = require("./provider/configuration");
import i18nextConfiguration = require("./configuration/i18next");
import RegisterConfiguration = require("./configuration/register");
import RouteConfiguration = require("./configuration/route");
import LocationConfiguration = require("./configuration/location");
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
        this._initializeProvider();
        this._initializeConstants();
        this._initializeConfigurations();
        this._initializeRun();
    };

    /**
     * @summary Initialize configuration blocks.
     * @private
     */
    private _initializeConfigurations = (): void => {
        this._module.config(i18nextConfiguration)
                    .config(LocationConfiguration)
                    .config(RegisterConfiguration)
                    .config(RouteConfiguration);
    };

    /**
     * @summary Initialize run blocks.
     * @private
     */
    private _initializeRun = (): void => {
        this._module.run(TemplateCacheRun);
    };

    /**
     * @summary Initialize providers.
     * @private
     */
    private _initializeProvider = (): void => {
        const provider = new ConfigurationProvider(this._module, "scripts/configuration.json");
        this._module.provider("appConfig", provider);
    };

    /**
     * @summary Initialize constants.
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
     * @summary Initialize module.
     * @private
     */
    private _initializeModule = (): void => {
        const requires = ["jm.i18next", "ngRoute", "viewhead"];
        this._module = angular.module(this.name, requires);
    };
}

export = Application.instance;

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

/**
 * Configuration for register.
 * @author  Cyril Schumacher
 * @class
 */
class RegisterConfiguration {
    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ["$controllerProvider", "$compileProvider", "$filterProvider", "$provide"];

    /**
     * @summary Constructor.
     * @constructor
     * @param {any}       angularBingMapsProvider The angular bing maps provider.
     * @param {Object}    appConfig               The application configuration.
     */
    public constructor(private $controllerProvider: ng.IControllerService,
                       private $compileProvider: ng.ICompileService,
                       private $filterProvider: ng.IFilterService,
                       private $provide: ng.IServiceProvider) {
        this._initializeRegister();
    }

    /**
     * @summary Initializes register.
     * @private
     */
    private _initializeRegister = (): void => {
        const module = angular.module("persona");

        module.controller = this.$controllerProvider["register"];
        module.directive = this.$compileProvider["directive"];
        module.filter = this.$filterProvider["register"];
        module.factory = this.$provide["factory"];
        module.service = this.$provide["service"];
    };
}

export = RegisterConfiguration;

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
 * @summary Controller base.
 * @author  Cyril Schumacher
 * @abstract
 * @class
 */
abstract class ControllerBase {
    /**
     * @summary Constructor.
     * @constructor
     * @param {string}                  viewName            The view name.
     * @param {IScope}                  $scope              The model.
     * @param {IRootScopeService}       $rootScope          The root scope
     * @param {IRouteParamsService}     $routeParams        The route parameters.
     * @param {ILocationService}        $location           The location service.
     * @param {I18nextProvider}         $i18next            The i18next provider.
     * @param {tmhDynamicLocaleService} tmhDynamicLocale    The angular dynamic locale.
     */
    public constructor(
        public viewName: string,
        public $scope: ng.IScope,
        public $rootScope: ng.IRootScopeService,
        public $routeParams: angular.route.IRouteParamsService,
        public $location: angular.ILocationService,
        public $i18next: angular.i18next.I18nextProvider,
        public tmhDynamicLocale: angular.dynamicLocale.tmhDynamicLocaleService) {
        // Function
        this.$rootScope["navigateTo"] = this._navigateTo;

        // Variable
        this.$rootScope["viewName"] = viewName;
        this.$rootScope["currentPath"] = this.$location.absUrl();

        // Event
        this.$scope.$on("$viewContentLoaded", this._onViewContentLoaded);
    }

    /**
     * @summary Gets the hostname extension.
     * @return {string} The extension.
     */
    private _getHostnameExtension = (): string => {
        const host = this.$location.host();
        const elements = host.split(".");

        return elements[elements.length - 1];
    };

    /**
     * @summary Initializes localization.
     * @private
     */
    private _initializeLocalization = (): void => {
        const hostnameExtension = this._getHostnameExtension();
        let language = hostnameExtension;

        if ((hostnameExtension === "com") || ((hostnameExtension !== "fr") || (hostnameExtension !== "en"))) {
            language = this.$routeParams["language"];
            if (!language) {
                const navigatorLanguage = navigator.language || navigator.userLanguage;
                language = navigatorLanguage.substr(0, 2);
            }
        }

        this.$rootScope["language"] = language;
        this.$i18next.options.lng = language;
        this.tmhDynamicLocale.set(language);
    };

    /**
     * @summary Initializes status.
     * @private
     */
    private _initializeStatus = (): void => {
        this.$rootScope["status"] = "ready";
    };

    /**
     * @summary Navigates to page.
     * @private
     * @param {string} path The path.
     */
    private _navigateTo = (path: string): void => {
        this.$location.path(path);
    };

    /**
     * @summary Initializes controller.
     * @private
     * @private
     */
    private _onViewContentLoaded = (): void => {
        this._initializeLocalization();
        this._initializeStatus();
    };
}

export = ControllerBase;

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

/**
 * @summary Controller base.
 * @author  Cyril Schumacher
 * @class
 */
abstract class ControllerBase {
    /**
     * @summary Constructor.
     * @constructor
     * @param {string}                 viewName        The view name.
     * @param {IScope}                 $scope          The model.
     * @param {IRootScopeService}      $rootScope      The root scope
     * @param {IRouteParamsService}    $routeParams    The route parameters.
     * @param {ILocationService}       $location       The location service.
     * @param {I18nextProvider}        $i18next        The i18next provider.
     */
    public constructor(public viewName: string, public $scope: ng.IScope, public $rootScope: ng.IRootScopeService, public $routeParams: angular.route.IRouteParamsService, public $location: angular.ILocationService, public $i18next: angular.i18next.I18nextProvider) {
        this.$rootScope["viewName"] = viewName;
        this.$rootScope["navigateTo"] = this._navigateTo;

        this.$scope.$on("$viewContentLoaded", this._onViewContentLoaded);
    }

    /**
     * @summary Initializes controller.
     * @private
     */
    private _onViewContentLoaded = (): void => {
        this._initializeLocalization();
        this._initializeStatus();
    }

    /**
     * @summary Initializes localization.
     * @private
     */
    private _initializeLocalization = (): void => {
        var language = this.$routeParams["language"];
        if (!language) {
            var navigatorLanguage = navigator.language || navigator.userLanguage;
            language = navigatorLanguage.substr(0,2);
        }

        this.$rootScope["language"] = language;
        this.$i18next.options.lng = language;
    }

    /**
     * @summary Navigates to page.
     * @param {string} path The path.
     */
    private _navigateTo = (path: string): void => {
        this.$location.path(path);
    }

    /**
     * @summary Initializes status.
     * @private
     */
    private _initializeStatus = (): void => {
        this.$rootScope["status"] = "ready";
    }
}

export = ControllerBase;

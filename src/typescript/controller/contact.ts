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

///<amd-dependency path="directive/autosize"/>
///<amd-dependency path="directive/isFilled"/>

import app = require("../app");
import baseController = require("../controller/base");

/**
 * @summary Controller for contact page.
 * @author  Cyril Schumacher
 * @class
 */
class ContactController extends baseController {
    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = [
        "$scope",
        "$rootScope",
        "$routeParams",
        "$location",
        "$i18next",
        "tmhDynamicLocale"
    ];

    /**
     * @summary Constructor.
     * @constructs
     * @param {IScope}                  $scope              The model.
     * @param {IRootScopeService}       $rootScope          The root scope
     * @param {IRouteParamsService}     $routeParams        The route parameters.
     * @param {ILocationService}        $location           The location service.
     * @param {I18nextProvider}         $i18next            The i18next provider.
     * @param {tmhDynamicLocaleService} tmhDynamicLocale    The angular dynamic locale.
     */
    public constructor(
        public $scope: ng.IScope,
        public $rootScope: ng.IRootScopeService,
        public $routeParams: angular.route.IRouteParamsService,
        public $location: angular.ILocationService,
        public $i18next: angular.i18next.I18nextProvider,
        public tmhDynamicLocale: angular.dynamicLocale.tmhDynamicLocaleService) {
        super("contact", $scope, $rootScope, $routeParams, $location, $i18next, tmhDynamicLocale);
    };
}

export = ContactController;
app.module.controller("contactController", ContactController);

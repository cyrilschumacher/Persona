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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <amd-dependency path="directive/fullHeightWindowDirective"/>

import app = require('app');
import controllerBase = require('controller/controllerBase');
/**
 * @summary Mail sent controller.
 * @author  Cyril Schumacher
 * @class
 * @extends ControllerBase
 */
class MailSentController extends controllerBase {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ['$scope', '$rootScope', '$i18next'];
    
    /**
     * @summary Constructor.
     * @constructor
     * @public
     * @param $scope            {IScope}                Scope.
     * @param $rootScope        {IRootScopeService}     Root scope.
     * @param $routeParams      {IRouteParamsService}   Route parameters.
     * @param $i18nextProvider  {I18nextProvider}       i18next provider.
     */
    public constructor(public $scope: ng.IScope,
                       public $rootScope: ng.IRootScopeService,
                       public $routeParams: angular.route.IRouteParamsService,
                       public $i18next: angular.i18next.I18nextProvider) {
        super($scope, $rootScope, $routeParams, $i18next);

        // Initialize header.
        this.initializeHead($i18next('contact.head.description'), $i18next('contact.head.keywords'));
    }
}

export = MailSentController;
app.instance.module['register'].controller('mailSentController', MailSentController);

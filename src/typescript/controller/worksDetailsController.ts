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
/// <amd-dependency path="directive/fadeByScrollDirective"/>
/// <amd-dependency path="directive/fullHeightWindowDirective"/>
/// <amd-dependency path="service/messengerService"/>
/// <amd-dependency path="service/api/worksService"/>

import app = require('app');
import controllerBase = require('controller/controllerBase');
import messengerService = require('service/messengerService');
import worksService = require('service/api/worksService');

/**
 * @summary Works details controller.
 * @author  Cyril Schumacher
 * @class
 * @extends ControllerBase
 */
class WorksDetailsController extends controllerBase {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ['$scope', '$rootScope', '$routeParams', '$i18next', '$location', 'worksService', 'messengerService'];
    
    /**
     * @summary Constructor.
     * @constructor
     * @public
     * @param $scope            {IScope}                Scope.
     * @param $rootScope        {IRootScopeService}     Root scope.
     * @param $routeParams      {IRouteParamsService}   Route parameters.
     * @param $i18next          {I18nextProvider}       i18next provider.
     * @param $location         {ILocationProvider}   Location service.
     * @param worksService      {WorksService}        Works service.
     * @param messengerService  {MessengerService}    Messenging service.
     */
    public constructor(public $scope: ng.IScope,
                       public $rootScope: ng.IRootScopeService,
                       public $routeParams: angular.route.IRouteParamsService,
                       public $i18next: angular.i18next.I18nextProvider,
                       private $location: ng.ILocationService,
                       private worksService: worksService,
                       private messengerService: messengerService) {
        super($scope, $rootScope, $routeParams, $i18next);
        
        this.$scope['init'] = this._initialize;
    }

    /**
     * @summary Initialize controller.
     * @private
     */
    private _initialize = (): void => {
        var id: string = this.$routeParams['id'];
        
        // Checks if the work identifier exists and
        // if the work object exists in the messenger service.
        if (id && this.messengerService.exists(id)) {
            this.$scope['work'] = this.messengerService.get(id);
        } else if(id) {
            // Otherwise, it download the work object.
            this._initializeWorks(id); 
        } else {
            this._redirect();
        }
    }

    /**
     * @summary Initialize works.
     * @private
     * @param id {string} Work identifier.
     */
    private _initializeWorks = (id: string): void => {
        this.worksService.getWorks().then(works => {
            // It obtain, only, the work object by its identifier.
            var result: Array<Object> = $.grep(works, (e) => e['id'] == id);

            if (result.length > 0) {
                this.$scope['work'] = result[0];
            } else {
                this._redirect();
            }
        });
    }

    /**
     * @summary Redirect the user to the home page.
     * @private
     */
    private _redirect = (): void => {
        this.$location.path('/');
    }
}

export = WorksDetailsController;
app.instance.module['register'].controller('worksDetailsController', WorksDetailsController);

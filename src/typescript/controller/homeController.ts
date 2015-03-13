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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />
/// <amd-dependency path="directive/fadeByScrollDirective"/>
/// <amd-dependency path="directive/fullHeightWindowDirective"/>
/// <amd-dependency path="directive/scrollToDirective"/>
/// <amd-dependency path="service/worksService"/>

import app = require('app');
import worksService = require('service/worksService');

/**
 * @summary Custom controller.
 * @author  Cyril Schumacher
 * @class
 */
class HomeController {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<String> = ['$scope', 'worksService'];
    
    /**
     * @summary Constructor.
     * @constructor
     * @public
     * @param $scope        {IScope}        Model.
     * @param worksService  {WorksService}  Service.
     */
    public constructor(private $scope: ng.IScope, private worksService: worksService) {
        $scope['init'] = this._initialize;
    }
    
    /**
     * @summary Initialize controller.
     * @private
     */
    private _initialize = (): void => {
        this._initializeWorks();
    }

    /**
     * @summary Initialize works.
     * @private
     */
    private _initializeWorks() {
        this.worksService.getWorks().then(works => {
            this.$scope['works'] = works.sort(() => { return 0.5 - Math.random() });
        });
    }
}

export = HomeController;
app.instance.module['register'].controller('homeController', HomeController);
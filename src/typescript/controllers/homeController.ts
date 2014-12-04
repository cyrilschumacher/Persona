/* The MIT License (MIT)
 * 
 * Copyright (c) 2014 Cyril Schumacher.fr
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

import persona = require('persona');
module Application.Controllers {
    /**
     * @summary Controller for home.
     * @author  Cyril Schumacher
     * @class
     */
    export class HomeController {
        'use strict';
    
        /**
         * @summary Constructor.
         * @constructs
         * @param $scope        {IScope}        Model.
         * @param $i18next      {any}           Localization.
         * @param worksService  {WorksService}  Service.
         */
        public constructor(private $scope: IScope, private $i18next: any, private worksService: Services.WorksService) {
            this._addWindowEvents();
            this._initScope();
        }
        
        /**
         * @summary Initialize angular scope.
         * @param {any}             $scope          Model.
         * @param {WorksService}    $worksService   Service.
         */
        private _initScope() {
            // Obtains works and mix.
            var works:any = this.worksService.getWorks();
            this.$scope.works = works.sort(() => { return 0.5 - Math.random() });
        }

        /**
         * @summary Adds events on window element.
         */
        private _addWindowEvents() {
            $(window).scroll(this._onWindowScroll);
        }

        /**
         * @summary Occurs when the window is scrolled.
         */
        private _onWindowScroll() {
            $('.l-header-wrapper').fadeOnScroll(25, {element: $('.l-header-wrapper .container')});
        }
    }

    HomeController.$inject = ['$scope', '$i18next', 'worksService'];
    persona.module.register.controller('homeController', ['$scope', '$i18next', 'worksService', ($scope, $i18next, worksService) => new HomeController($scope, $i18next, worksService)]);
}
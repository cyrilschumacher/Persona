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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

import persona = require('persona');
import contactModel = require('contactModel');
module Application.Controllers {
    /**
     * @summary Controller for contact.
     * @author  Cyril Schumacher
     * @class
     */
    export class ContactController {
        'use strict';
    
        /**
         * @summary Dependencies injection.
         */
        public static $inject: Array<String> = ['$scope', '$i18next', 'profileService'];
    
        /**
         * @summary Constructor.
         * @constructs
         * @param $scope            {IScope}    Model.
         * @param $i18next          {any}       Localization.
         * @param profileService    {any}       Profile service.
         */
        public constructor(private $scope: ng.IScope, private $i18next: any, private profileService) {
            this._initMap();
            this._initScope();
            this._initElements();
        }
    
        /**
         * @summary Initialize elements.
         */
        private _initElements = (): void => {
            $('#message').autosize();
        }
        
        /**
         * @summary Initialize angular scope.
         */
        private _initScope = (): void => {
            this.$scope.form = contactModel;
        }
        
        /**
         * @summary Initialize map.
         */
        private _initMap(): void {
            var mapOptions = { 
                credentials: "AiscBCv-CUb6kGw_scA6Voo8U8cO6XKiOQpNppd9lJAv_0ohATT3Vhwd2lx_RgJ_",
                disableKeyboardInput: true,
                disableZooming: true,
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                showCopyright: false,
                showDashboard: false,
                showScalebar: false,
                zoom: 12
            };
            
            var infoboxLayer = new Microsoft.Maps.EntityCollection();
            var map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
            map.entities.push(infoboxLayer);

            var location: any = this.profileService.getLocation();
            var pinLocation = new Microsoft.Maps.Location(location.coordinates.latitude, location.coordinates.longitude)
            var pin = new Microsoft.Maps.Pushpin(pinLocation, {icon: 'contents/images/pin.svg', height: 60, width: 80});
            
            map.setView({center: pinLocation});
            map.entities.push(pin);
        }
    }

    persona.module.register.controller('contactController', ContactController);
}
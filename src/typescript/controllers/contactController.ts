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

module Application.Controllers {
    /**
     * @summary Controller for home.
     * @author  Cyril Schumacher
     * @class
     */
    export class ContactController {
        'use strict';
    
        /**
         * @summary Constructor.
         * @constructs
         * @param $scope            {any}           Model.
         * @param $i18next          {any}           Localization.
         * @param $profileService   {any}           Profile service.
         */
        public constructor(private $scope: any, private $i18next: any, private $profileService) {
            var location: any = $profileService.getLocation();
            
            this._addWindowEvents();
            this._initMap(location);
            this._initScope($scope);
            $('#message').autosize();
        }

        /**
         * @summary Add events on window element.
         */
        private _addWindowEvents () {
            $(window).scroll(this._onWindowScroll);
        }
        
        /**
         * @summary Initialize angular scope.
         */
        private _initScope($scope: any) {
            $scope.form = {firstname: "", lastname: "", subject: "", emailAddress: "", message: ""};
        }
        
        /**
         * @summary Initialize map.
         */
        private _initMap(location: any): void {
            var mapOptions = { 
                credentials: "AiscBCv-CUb6kGw_scA6Voo8U8cO6XKiOQpNppd9lJAv_0ohATT3Vhwd2lx_RgJ_",
                disableKeyboardInput: true,
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                showCopyright: false,
                showDashboard: false,
                showScalebar: false,
                zoom: 15
            };
            
            var infoboxLayer = new Microsoft.Maps.EntityCollection();
            var map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
            map.entities.push(infoboxLayer);

            var pinLocation = new Microsoft.Maps.Location(location.coordinates.latitude, location.coordinates.longitude)
            var pin = new Microsoft.Maps.Pushpin(pinLocation, {});
            
            map.setView({center: pinLocation});
            map.entities.push(pin);
        }

        /**
         * @summary Occurs when the window is scrolled.
         */
        private _onWindowScroll() {
            $('.l-header-wrapper').fadeOnScroll(30);
        }
    }
}
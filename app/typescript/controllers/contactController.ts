/// <reference path="../../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

requirejs(['jquery']);

module Application.Controllers {
    'use strict';
    
    /**
     * @summary Controller for home.
     * @class
     */
    export class ContactController {
        /**
         * @summary Constructor.
         * @constructs
         * @param $scope        {any}           Model.
         * @param $i18next      {any}           Localization.
         */
        public constructor(private $scope: any, private $i18next: any) {
            var groundLoc = new Microsoft.Maps.Location(47, -122, 100, Microsoft.Maps.AltitudeReference.ground);
            var ellipsoidLoc = new Microsoft.Maps.Location(47, -122, 100, Microsoft.Maps.AltitudeReference.ellipsoid);

            var mapOptions = { 
                credentials: "AiscBCv-CUb6kGw_scA6Voo8U8cO6XKiOQpNppd9lJAv_0ohATT3Vhwd2lx_RgJ_",
                center: groundLoc,
                mapTypeId: Microsoft.Maps.MapTypeId.road ,
                showCopyright: false,
                showDashboard: false,
                showScalebar: false,
                zoom: 5
            };

            var map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
            map.entities.push(new Microsoft.Maps.Pushpin(groundLoc, {text: "G"}));
            map.entities.push(new Microsoft.Maps.Pushpin(ellipsoidLoc, {text: "E"}));
        }
    }
}
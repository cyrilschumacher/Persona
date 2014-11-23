/// <reference path="../../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

requirejs(['jquery']);

module Application.Controllers {
    'use strict';
    
    /**
     * @summary Controller for home.
     * @author  Cyril Schumacher
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
            this._addWindowEvents();
            this._initMap();
        }

        /**
         * @summary Add events on window element.
         */
        private _addWindowEvents () {
            $(window).scroll(this._windowScroll);
        }
        
        private _initMap(): void {
            var mapOptions = { 
                credentials: "AiscBCv-CUb6kGw_scA6Voo8U8cO6XKiOQpNppd9lJAv_0ohATT3Vhwd2lx_RgJ_",
                disableKeyboardInput: true,
                disableMouseInput: true,
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                showCopyright: false,
                showDashboard: false,
                showScalebar: false,
                zoom: 10
            };
            
            var map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
            map.setView({center:new Microsoft.Maps.Location(48.6833, 6.2)});
        }

        /**
         * @summary Occurs when the window is scrolled.
         */
        private _windowScroll() {
            $('.l-header-wrapper').fadeOnScroll(30);
        }
    }
}
/// <reference path="../../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

requirejs(['jquery']);

module Application.Controllers {
    'use strict';
    
    /**
     * @summary Controller for home.
     * @author  Cyril Schumacher
     * @class
     */
    export class HomeController {
        /**
         * @summary Constructor.
         * @constructs
         * @param $scope        {any}           Model.
         * @param $i18next      {any}           Localization.
         * @param $worksService {WorksService}  Service.
         */
        public constructor(private $scope: any, private $i18next: any, private $worksService: Services.WorksService) {
            // Adds window events.
            this._addWindowEvents();
            //this._onWindowResize();
            
            // Obtains works and mix.
            var works:any = $worksService.getWorks();
            $scope.works = works.sort(() => { return 0.5 - Math.random() });
        }

        /**
         * @summary Adds events on window element.
         */
        private _addWindowEvents() {
            $(window).scroll(this._onWindowScroll);
            //$(window).resize(this._onWindowResize);
        }

        /**
         * @summary Occurs when the window is resized.
         */
        private _onWindowResize() {
            $('.l-header').height($(window).height());
        }

        /**
         * @summary Occurs when the window is scrolled.
         */
        private _onWindowScroll() {
            $('.l-header-wrapper').fadeOnScroll(25, {element: $('.l-header-wrapper .container')});
        }
    }
}
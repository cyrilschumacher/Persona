/// <reference path="../../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

requirejs(['jquery']);

module Application.Controllers {
    'use strict';
    
    /**
     * @summary Controller for home.
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
            this._addWindowEvents();
            this._windowResize();
            
            $scope.scrollTo = this._scrollSmoothEffect;
            $scope.works = $worksService.getWorks().sort( () => { return Math.random() });
        }

        /**
         * @summary Add events on window element.
         */
        private _addWindowEvents = (): void => {
            $(window).scroll(this._windowScroll);
            $(window).resize(this._windowResize);
        }
        
        /**
         * @summary Changes opacity of header wrapper according to the position of the scroll.
         * @param {number} scrollPosition Scroll position.
         */
        private _changesOpacityHeaderScroll = (element: string, scrollPosition: number): void => {
            var headerContent: JQuery = $(element);
            var opacityHeaderContent: number = 1.0;
            var windowHeight: number = $(window).height();

            if ((scrollPosition > (windowHeight / 4)) && (scrollPosition < windowHeight)) {
                var progressPercent: number = (scrollPosition / windowHeight) * 100;
                var leftPercent: number = 100 - ((progressPercent - 25) * 2);
                opacityHeaderContent = leftPercent / 100;
            } else if (scrollPosition > windowHeight) {
                opacityHeaderContent = 0;
            }
            
            headerContent.css('opacity', opacityHeaderContent);
        }

        /**
         * @summary Scroll to an element by its identifier.
         * @param {string} id Element identifier.
         */
        private _scrollSmoothEffect = (id: string): void => {
            $('html, body').animate({ scrollTop: $(id).offset().top }, 'slow');  
        }

        /**
         * @summary Occurs when the window is resized.
         */
        private _windowResize = (): void => {
            $('.l-header').height($(window).height());
        }

        /**
         * @summary Occurs when the window is scrolled.
         */
        private _windowScroll = ():void => {
            var scrollPosition: number = $(window).scrollTop();
            this._changesOpacityHeaderScroll('.l-header-wrapper', scrollPosition);
        }
    }
}
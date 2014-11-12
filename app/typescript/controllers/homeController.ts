/// <reference path="../../../bower_components/DefinitelyTyped/requirejs/require.d.ts"/>

module Application.Controllers {
    'use strict';
    
    export class HomeController {
        public constructor(private $scope, private $i18next) {
            this._addWindowEvents();
            
            $scope.scrollTo = this._scrollSmoothEffect;
            $scope.works = this._loadWorks();
        }

        private _addWindowEvents = (): void => {
            $(window).scroll(this._windowScroll);
            $(window).resize(this._windowResize);
            
            this._windowResize();
        }
        
        private _changesOpacityHeaderScroll = (scrollPosition: number): void => {
            var headerContent: JQuery = $('.l-header-wrapper');
            var opacityHeaderContent: number = 1.0;
            var windowHeight: number = $(window).height();

            if ((scrollPosition > (windowHeight / 4)) && (scrollPosition < windowHeight)) {
                var progressPercent: number = (scrollPosition / windowHeight) * 100;
                var leftPercent: number = 100 - ((progressPercent - 25) * 2);

                opacityHeaderContent = leftPercent / 100;
            }
            
            headerContent.css('opacity', opacityHeaderContent);
        }

        private _loadWorks = (): Object => {
            return [ 
                {name: 'velit',                     description: 'Occaecat quem possumus senserit ad sunt admodum ex ingeniis.',        img: 'http://fakeimg.pl/300x200/'},
                {name: 'sunt graviterque',          description: 'Mentitum ab appellat, ita ab efflorescere.',                          img: 'http://fakeimg.pl/300x200/'},
                {name: 'firmissimum',               description: 'Do esse concursionibus, arbitror legam officia.',                     img: 'http://fakeimg.pl/300x200/'},
                {name: 'adipisicing',               description: 'Qui mandaremus comprehenderit, et ubi quae dolore esse.',             img: 'http://fakeimg.pl/300x200/'},
                {name: 'fidelissimae incididunt',   description: 'Iis anim incurreret despicationes id qui ipsum sint est appellat.',   img: 'http://fakeimg.pl/300x200/'}
            ];
        }

        private _scrollSmoothEffect = (id): void => {
            $('html, body').animate({ scrollTop: $(id).offset().top }, 'slow');  
        }

        private _windowResize = (): void => {
            $('.l-header').height($(window).height());
        }

        private _windowScroll = ():void => {
            var scrollPosition: number = $(window).scrollTop();
            this._changesOpacityHeaderScroll(scrollPosition);
        }
    }
}
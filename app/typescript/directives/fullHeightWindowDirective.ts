module Application.Directives {
    'use strict';
    
    /**
     * @summary Directive for scroll to an element by its identifier.
     * @author  Cyril Schumacher
     * @class
     */
    export class FullHeightWindowDirective implements ng.IDirective {
        /**
         * @summary Current element.
         */
        private _element: JQuery;
        
        /**
         * @summary Restrict option.
         */
        public restrict: String = 'A';
        
        /**
         * @summary Manipulates the DOM of the current page.
         * @param {IScope}      scope   Angular scope object.
         * @param {JQuery}      element jqLite-wrapped element that this directive matches.
         * @param {IAttributes} attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
         */
        public link = (scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): void => {
            this._element = element;
            this._onWindowResize();
            $(window).bind('resize', this._onWindowResize);
        }

        /**
         * @summary Occurs when the window is resized.
         */
        private _onWindowResize = (): void => {
            this._element.height($(window).height());
        }
    };
}
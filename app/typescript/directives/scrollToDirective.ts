module Application.Directives {
    'use strict';
    
    /**
     * @summary Directive for scroll to an element by its identifier.
     * @author  Cyril Schumacher
     * @class
     */
    export class ScrollToDirective implements ng.IDirective {
        /**
         *
         * @param {IScope}      scope   Angular scope object.
         * @param {JQuery}      element jqLite-wrapped element that this directive matches.
         * @param {IAttributes} attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
         */
        public link(scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
            element.bind('click', function () {
                var to: String = attrs.to;
                var duration = (duration) ? duration : 'slow';
                
                $('html, body').animate({ scrollTop: $(to).offset().top }, duration);  
            });
        }
    };
}
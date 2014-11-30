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

module Application.Directives {
    'use strict';
    
    /**
     * @summary Directive for scroll to an element by its identifier.
     * @author  Cyril Schumacher
     * @class
     */
    export class ScrollToDirective implements ng.IDirective {
        /**
         * @summary Restrict option.
         */
        public restrict: string = 'A';
        
        /**
         * @summary Manipulates the DOM of the current page.
         * @param {IScope}      scope   Angular scope object.
         * @param {JQuery}      element jqLite-wrapped element that this directive matches.
         * @param {IAttributes} attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
         */
        public link(scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
            element.bind('click', function () {
                var to: string = (<any>attrs).to;
                var duration = (duration) ? duration : 'slow';
                
                $('html, body').animate({ scrollTop: $(to).offset().top }, duration);  
            });
        }
    };
}
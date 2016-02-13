/* The MIT License (MIT)
 *
 * Copyright (c) 2016 Cyril Schumacher.fr
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

import app = require("../app");

/**
 * Directive for create rating progress.
 *
 * @author  Cyril Schumacher
 * @class
 */
class RatingProgressDirective implements ng.IDirective {
    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = [];

    /**
     * @summary Restrict option.
     * @type {string}
     */
    public restrict: string = "E";

    /**
     * @summary Scope.
     * @type {Object}
     */
    public scope: Object = {
        count: "=",
        max: "=",
        min: "=",
        ratingEmptyIcon: "@",
        ratingFillIcon: "@",
        value: "=",
    };

    /**
     * @summary Template.
     * @type {string}
     */
    public template: string = "<ul style='margin: 0; padding: 0'>" +
    "<li style='display: inline-block; padding: 0 1px' data-ng-repeat='i in range'>" +
    "<i data-ng-class='ratingFillIcon'></i></li>" +
    "<li style='display: inline-block; padding: 0 1px' data-ng-repeat='i in emptyRange'>" +
    "<i data-ng-class='ratingEmptyIcon'></i></li></ul>";

    /**
     * @summary Manipulates the DOM of the current page.
     * @param {IScope}      scope   Angular scope object.
     * @param {JQuery}      element jqLite-wrapped element that this directive matches.
     * @param {IAttributes} attrs   hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
     */
    public link = (scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): void => {
        const step = scope["max"] / scope["count"];
        let limit = Math.ceil(scope["value"] / step);

        scope["range"] = [];
        for (let i = 0; i < limit; i++) {
            if (i < scope["max"]) {
                scope["range"].push(i);
            }
        }

        scope["emptyRange"] = [];
        if (scope["range"].length < scope["max"]) {
            limit = scope["count"] - scope["range"].length;
            for (let i = 0; i < limit; i++) {
                scope["emptyRange"].push(i);
            }
        }
    };
}


export = RatingProgressDirective;
app.module.directive("ratingProgress", () => new RatingProgressDirective());

/* The MIT License (MIT)
 *
 * Copyright (c) 2015 Cyril Schumacher.fr
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

/// <reference path="../../typings/requirejs/require.d.ts" />

require.config({
    paths: {
        /* Vendor */
        "angular":                  "vendor/angular",
        "angular-google-analytics": "vendor/angular-google-analytics",
        "angular-route":            "vendor/angular-route",
        "angular-sanitize":         "vendor/angular-sanitize",
        "angularjs-viewhead":       "vendor/angularjs-viewhead",
        "autosize":                 "vendor/autosize",
        "classie":                  "vendor/classie",
        "borderMenu":               "vendor/borderMenu",
        "canvasRenderer":           "vendor/CanvasRenderer",
        "jquery":                   "vendor/jquery",
        "i18next":                  "vendor/i18next",
        "ng-i18next":               "vendor/ng-i18next",
        "projector":                "vendor/Projector",
        "three":                    "vendor/three",

        /* Project */
        "loader":                   "loader",

        /* Online */
        "reCaptcha":                "https://www.google.com/recaptcha/api"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-google-analytics": ["angular"],
        "angular-route":            ["angular"],
        "angular-sanitize":         ["angular"],
        "angularjs-viewhead":       ["angular"],
        "autosize":                 ["jquery"],
        "borderMenu":               ["classie"],
        "canvasRenderer":           ["three"],
        "i18next":                  ["jquery"],
        "loader":                   ["borderMenu", "angular-google-analytics", "angular-route", "angular-sanitize", "angularjs-viewhead", "ng-i18next"],
        "ng-i18next":               ["angular", "i18next"],
        "projector":                ["three"]
    }
});

// Start the application.
require(["loader"]);

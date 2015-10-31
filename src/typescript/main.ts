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

/// <reference path="typing/requirejs/require.d.ts" />

require.config({
    paths: {
        angular:                "vendor/angular",
        "angular-bing-maps":    "vendor/angular-bing-maps",
        "angular-chart":        "vendor/angular-chart",
        "angular-route":        "vendor/angular-route",
        "angular-sanitize":     "vendor/angular-sanitize",
        "autosize":             "vendor/autosize.min",
        canvasRenderer:         "vendor/CanvasRenderer",
        "chart":                "vendor/Chart",
        jquery:                 "vendor/jquery",
        i18next:                "vendor/i18next",
        mapcontrol:             "//ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0",
        "ng-i18next":           "vendor/ng-i18next",
        projector:              "vendor/Projector",
        "three":                "vendor/three.min",

        loader:                 "loader"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-bing-maps":["angular", "mapcontrol"],
        "angular-chart":    ["chart", "angular"],
        "angular-route":    ["angular"],
        "angular-sanitize": ["angular"],
        "autosize":         ["jquery"],
        canvasRenderer:     ["three"],
        i18next:            ["jquery"],
        loader:             ["angular-bing-maps", "angular-chart", "angular-route", "angular-sanitize", "ng-i18next"],
        "ng-i18next":       ["angular", "i18next"],
        projector:          ["three"]
    },
    deps: ["loader"]
});

require(['loader']);

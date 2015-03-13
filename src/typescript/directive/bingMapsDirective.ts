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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/bingmaps/Microsoft.Maps.d.ts" />

import app = require('app');

/**
 * @summary Directive for Bing Maps.
 * @author  Cyril Schumacher
 * @class
 */
class BingMapsDirective implements ng.IDirective {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {string[]}
     */
    public static $inject: Array<String> = [];
    
    /**
     * @summary Map.
     * @private
     * @type {Map}
     */
    private _map: Microsoft.Maps.Map;

    /**
     * @summary Restrict option.
     * @public
     * @type {string}
     */
    public restrict: string = 'A';
    
    /**
     * @summary Scope.
     * @public
     * @type {Object}
     */
    public scope: Object = {
        mapOptions: '=',
        pushpins: '=',
        viewOptions: '='
    };
    
    /**
     * @summary Initializes map.
     * @private
     * @param {HTMLElement} mapElement The HTML element.
     * @param {Object}      mapOptions The map options.
     */
    private _initializeMap = (mapElement: HTMLElement, mapOptions: Object): void => {
        this._map = new Microsoft.Maps.Map(mapElement, mapOptions);
    }
    
    /**
     * @summary Occurs when the "pushpins" value change.
     * @private
     * @param {Array} newValue The new value.
     * @param {Array} oldValue The old value.
     */
    private _onPushPinsChange = (newValue: Array<Microsoft.Maps.Entity>, oldValue: Array<Microsoft.Maps.Entity>): void => {
        if (newValue && (oldValue != newValue)) {
            for (var i = 0; i < newValue.length; i++) {
                var pushpin: Microsoft.Maps.Entity = newValue[i];
                this._map.entities.push(pushpin);
            }
        }
    }
    
    /**
     * @summary Occurs when the "viewOptions" value change.
     * @private
     * @param {Array} newValue The new value.
     * @param {Array} oldValue The old value.
     */
    private _onViewOptionsChange = (newValue: Object, oldValue: Object): void => {
        if (newValue && (oldValue != newValue)) {
            this._map.setView(newValue);   
        }
    }
    
    /**
     * @summary Manipulates the DOM of the current page.
     * @public
     * @param {IScope}      scope           Angular scope object.
     * @param {JQuery}      element         jqLite-wrapped element that this directive matches.
     * @param {IAttributes} attributes      hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
     */
    public link = ($scope: ng.IScope, $element: JQuery, $attributes: ng.IAttributes): void => {
        // Attach observers on properties.
        $scope.$watch('pushpins', this._onPushPinsChange);
        $scope.$watch('viewOptions', this._onViewOptionsChange);
        
        // Initialize map.
        var mapElement: HTMLElement = $element[0];
        var mapOptions: Microsoft.Maps.MapOptions = $scope['mapOptions'];
        this._initializeMap(mapElement, mapOptions);
    }
}

export = BingMapsDirective;
app.instance.module['register'].directive('ngBingMaps', () => new BingMapsDirective());
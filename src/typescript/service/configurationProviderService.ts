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
/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />

/**
 * @summary Persona external configuration block.
 * @author  Cyril Schumacher
 * @class
 */
class ConfigurationProviderService {
    /**
     * @summary Constructor.
     * @constructs
     * @public
     * @param _module   {IModule} Module.
     * @param _url      {string}  URL address to JSON configuration file.
     */
    public constructor(private _module: ng.IModule, private _url: string) {
    }
    
    /**
     * @summary Shortcut method to perform GET request.
     * @public
     */
    public $get = () => {
        var settings: JQueryAjaxSettings = {type: 'GET', url: this._url, cache: false, async: false, contentType: 'application/json', dataType: 'json'};
        var q: JQueryXHR = jQuery.ajax(settings);
        
        const HTTP_OK = 200;
        if (q.status === HTTP_OK) {
            angular.extend(this._module, angular.fromJson(q.responseText));
        }
        
        return this._module;
    }
}

export = ConfigurationProviderService;

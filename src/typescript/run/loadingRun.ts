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

/**
 * @summary Persona loading run block.
 * @author  Cyril Schumacher
 * @class
 */
class LoadingRun {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ['$rootScope', '$timeout'];
    
    /**
     * @summary Constructor.
     * @public
     * @constructs
     * @param {IRootScopeService} $rootScope    The root scope.
     * @param {ITimeoutService }  $timeout      The timeout service.
     */
    public constructor(private $rootScope: ng.IRootScopeService, private $timeout: ng.ITimeoutService) {
        $rootScope.$on('$routeChangeStart', this._start);
        $rootScope.$on('$routeChangeSuccess', this._success);
    }
    
    /**
     * @summary Occurs when the route is loaded with success.
     * @private
     */
    private _start = (): void => {
        this.$rootScope['isLoading'] = true;
    }
    
    /**
     * @summary Occurs when the route is loading.
     * @private
     */
    private _success = (): void => {
        this.$timeout(() => {
            this.$rootScope['isLoading'] = false;
        }, 1000);
    }
}

export = LoadingRun;
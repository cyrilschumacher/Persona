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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

module Application.Services {
    'use strict';
    
    /**
     * @summary Works service.
     * @class
     */
    export class WorksService {
        /**
         * @summary HTTP service.
         * @type    {IHttpService}
         * @private
         */
        private _http: ng.IHttpService;
        
        /**
         * @summary Constructor.
         * @constructs
         * @param {IHttpService} $http HTTP service.
         */
        public construct($http: ng.IHttpService) {
            this._http = $http;
        }
    
        /**
         * @summary Returns a list of works.
         * @returns {Object} List of works.
         */
        public getWorks = (): Object => {
            return [ 
                {
                    id: 'velit',
                    name: 'velit',
                    description: 'Occaecat quem possumus senserit ad sunt admodum ex ingeniis.',
                    images: ['http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/']
                },
                {
                    id: 'sunt-graviterque',
                    name: 'sunt graviterque',
                    description: 'Mentitum ab appellat, ita ab efflorescere.',
                    images: ['http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/']
                },
                {
                    id: 'firmissimum',
                    name: 'firmissimum',
                    description: 'Do esse concursionibus, arbitror legam officia.',
                    images: ['http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/']
                },
                {
                    id: 'adipisicing',
                    name: 'adipisicing',
                    description: 'Qui mandaremus comprehenderit, et ubi quae dolore esse.',
                    images: ['http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/']
                },
                {
                    id: 'fidelissimae-incididunt',
                    name: 'fidelissimae incididunt',
                    description: 'Iis anim incurreret despicationes id qui ipsum sint est appellat.',
                    images: ['http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/', 'http://fakeimg.pl/300x200/']
                }
            ];
        }
    }
}
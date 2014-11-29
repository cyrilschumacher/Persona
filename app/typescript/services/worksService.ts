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
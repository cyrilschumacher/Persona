/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

module Application.Services {
    'use strict';
    
    export class WorksService {
        private _http: ng.IHttpService;
        
        public construct($http: ng.IHttpService) {
            this._http = $http;
        }
    
        public getWorks = (): any => {
            return [ 
                {name: 'velit',                     description: 'Occaecat quem possumus senserit ad sunt admodum ex ingeniis.',        img: 'http://fakeimg.pl/300x200/'},
                {name: 'sunt graviterque',          description: 'Mentitum ab appellat, ita ab efflorescere.',                          img: 'http://fakeimg.pl/300x200/'},
                {name: 'firmissimum',               description: 'Do esse concursionibus, arbitror legam officia.',                     img: 'http://fakeimg.pl/300x200/'},
                {name: 'adipisicing',               description: 'Qui mandaremus comprehenderit, et ubi quae dolore esse.',             img: 'http://fakeimg.pl/300x200/'},
                {name: 'fidelissimae incididunt',   description: 'Iis anim incurreret despicationes id qui ipsum sint est appellat.',   img: 'http://fakeimg.pl/300x200/'}
            ];
        }
    }
}
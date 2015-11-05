'use strict';

define(['app'],
    function(app) {
        describe('RouteConfiguration', function() {
            var $httpBackend, $location, $route, $rootScope;

            beforeEach(module('persona'));
            beforeEach(inject(function(_$httpBackend_, _$location_, _$route_, _$rootScope_) {
                $httpBackend = _$httpBackend_;
                $location = _$location_;
                $route = _$route_;
                $rootScope = _$rootScope_;
            }));


            it('should map routes to controllers', function() {
                var routes = [
                    {controller: 'homeController', path: '/', templateUrl: 'content/view/home.html'},
                    {controller: 'aboutController', path: '/about', templateUrl: 'content/view/about.html'},
                    {controller: 'worksController', path: '/works', templateUrl: 'content/view/works.html'},
                    {controller: 'contactController', path: '/contact', templateUrl: 'content/view/contact.html'}
                ];

                for (var index in routes) {
                    var route = routes[index];

                    $httpBackend.expectGET(route.templateUrl).respond(200);
                    expect($route.current).toBeUndefined();

                    $location.path(route.path);
                    $rootScope.$digest();

                    expect($route.current.templateUrl).toBe(route.templateUrl);
                    expect($route.current.controller).toBe(route.controller);
                }
            });
        });
    });

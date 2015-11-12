'use strict';

define(['app'],
    function(app) {
        describe('RouteConfiguration', function() {
            var $httpBackend, $location, $route, $rootScope;
            var routes = [
                {controller: 'homeController', path: '/', templateUrl: 'content/view/home.html'},
                {controller: 'aboutController', path: '/about', templateUrl: 'content/view/about.html'},
                {controller: 'worksController', path: '/works', templateUrl: 'content/view/works.html'},
                {controller: 'contactController', path: '/contact', templateUrl: 'content/view/contact.html'}
            ];

            beforeEach(module('persona'));
            beforeEach(inject(function(_$httpBackend_, _$location_, _$route_, _$rootScope_) {
                $httpBackend = _$httpBackend_;
                $location = _$location_;
                $route = _$route_;
                $rootScope = _$rootScope_;
            }));

            it('route should be undefined', function() {
                expect($route.current).toBeUndefined();
            });

            it('should map routes to controllers', function() {
                for (var index in routes) {
                    var route = routes[index];

                    $httpBackend.expectGET(route.templateUrl).respond(200);

                    $location.path(route.path);
                    $rootScope.$digest();

                    expect($route.current.templateUrl).toBeDefined();
                    expect($route.current.templateUrl).toBe(route.templateUrl);
                    expect($route.current.controller).toBeDefined();
                    expect($route.current.controller).toBe(route.controller);
                }
            });
        });
    });

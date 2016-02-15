'use strict';

define(['app', 'controller/about', 'provider/configuration'],
    function(app, aboutController, configurationProvider) {
        var controller;

        beforeEach(module('persona'));
        beforeEach(function() {
            var configuration = {"api":{"server":"http://private-b90a0-cyrilschumacher.apiary-mock.com/","resources":{"resume":{"education":"resume/education","experience":"resume/experience","skills":"resume/skills"},"works":"works/:id?","mail":{"send":"mail/send/"}}}};
            app.setConfiguration(configuration);
        });

        describe('AboutController', function() {
            beforeEach(inject(function($rootScope, $routeParams, $location, $i18next, tmhDynamicLocale, resumeService) {
                var $scope = $rootScope.$new();
                controller = new aboutController($scope, $rootScope, $routeParams, $location, $i18next, tmhDynamicLocale, resumeService);
            }));

            it('should have a method to check if the path is active', function() {

            });
        });
    }
);

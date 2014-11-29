/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

module Application {
    'use strict';

    define([
        'angular-animate', 
        'angular-route',
        'angular-route-styles', 
        'ng-i18next',
        'i18nextConfiguration', 
        'routeConfiguration', 
        'fullHeightWindowDirective',
        'scrollToDirective', 
        'jquery.fadeonscroll',
        'homeController',
        'contactController', 
        'worksService',
        'persona'], () => {
        var persona: Persona = new Application.Persona(angular);
    });
}
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
/// <reference path="../../../bower_components/DefinitelyTyped/ng-i18next/ng-i18next.d.ts" />
/// <amd-dependency path="directive/fadeByScrollDirective"/>
/// <amd-dependency path="service/api/resume/profileService"/>
/// <amd-dependency path="service/api/resume/resumeService"/>

import app = require('app');
import controllerBase = require('controller/controllerBase');
import profileService = require('service/api/resume/profileService');
import resumeService = require('service/api/resume/resumeService');

/**
 * @summary About controller.
 * @author  Cyril Schumacher
 * @class
 * @extends ControllerBase
 */
class AboutController extends controllerBase {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ['$scope', '$rootScope', '$routeParams', '$i18next', 'profileService', 'resumeService'];
    
    /**
     * @summary Constructor.
     * @public
     * @constructs
     * @param $scope            {IScope}                Model.
     * @param $rootScope        {IRootScopeService}     Root scope
     * @param $routeParams      {IRouteParamsService}   Route parameters.
     * @param $i18next          {I18nextProvider}       i18next provider.
     * @param profileService    {ProfileService}        Profile service.
     * @param resumeService     {ResumeService}         Resume service.
     */
    public constructor(public $scope: ng.IScope,
                       public $rootScope: ng.IRootScopeService,
                       public $routeParams: angular.route.IRouteParamsService,
                       public $i18next: angular.i18next.I18nextProvider,
                       private profileService: profileService,
                       private resumeService: resumeService) {
        super($scope, $rootScope, $routeParams, $i18next);
        
        // Initialize initialize method scope.
        this.$scope['init'] = this._initialize;
    }
    
    /**
     * @summary Initialize controller.
     * @private
     */
    private _initialize = (): void => {
        // Initialize header.
        this.initializeHead(this.$i18next('about.head.description').toString(), this.$i18next('about.head.keywords').toString());
        
        // Initialize data.
        this._initializeEducation();
        this._initializeExperience();
        this._initializeProfile();
        this._initializeSkills();
    }
    
    /**
     * @summary Initialize education data.
     * @private
     */
    private _initializeEducation = (): void => {
        this.resumeService.getEducation().then(schools => {
            this.$scope['schools'] = schools;
        });
    }
    
    /**
     * @summary Initialize experience data.
     * @private
     */
    private _initializeExperience = (): void => {
        this.resumeService.getExperience().then(experiences => {
            this.$scope['experiences'] = experiences;
        });
    }
    
    /**
     * @summary Initialize profile data.
     * @private
     */
    private _initializeProfile = (): void => {
        this.profileService.getProfile().then(profile => {
            this.$scope['profile'] = profile;
        });
    }
    
    /**
     * @summary Initialize skills data.
     * @private
     */
    private _initializeSkills = (): void => {
        this.resumeService.getSkills().then(skills => {
            this.$scope['skills'] = skills;
        });
    }
}

export = AboutController;
app.instance.module['register'].controller('aboutController', AboutController);

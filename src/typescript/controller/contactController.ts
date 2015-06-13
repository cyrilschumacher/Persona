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

/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/i18next/i18next.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/velocity-animate/velocity-animate.d.ts" />
/// <amd-dependency path="directive/AutosizeDirective"/>
/// <amd-dependency path="directive/bingMapsDirective"/>
/// <amd-dependency path="directive/fadeByScrollDirective"/>
/// <amd-dependency path="jqueryAutosize"/>
/// <amd-dependency path="service/api/contactService"/>
/// <amd-dependency path="service/api/resume/profileService"/>
/// <amd-dependency path="velocity"/>

import app = require('app');
import controllerBase = require('controller/controllerBase');
import contactService = require('service/api/contactService');
import profileService = require('service/api/resume/profileService');
import contactFormModel = require('model/contactFormModel');

/**
 * @summary Contact controller.
 * @author  Cyril Schumacher
 * @class
 * @extends ControllerBase
 */
class ContactController extends controllerBase {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ['$scope', '$rootScope', '$routeParams', '$i18next', 'contactService', 'profileService'];
    
    /**
     * @summary Constructor.
     * @constructs
     * @public
     * @param $scope            {IScope}                Model.
     * @param $rootScope        {IRootScopeService}     Root scope
     * @param $routeParams      {IRouteParamsService}   Route parameters.
     * @param $i18next          {I18nextProvider}       i18next provider.
     * @param profileService    {ProfileService}        Profile service.
     */
    public constructor(public $scope: ng.IScope,
                       public $rootScope: ng.IRootScopeService,
                       public $routeParams: angular.route.IRouteParamsService,
                       public $i18next: angular.i18next.I18nextProvider,
                       private contactService: contactService,
                       private profileService: profileService) {
        super($scope, $rootScope, $routeParams, $i18next);
        
        $scope['init'] = this._initialize;
    }
    
    /**
     * @summary Initialize controller.
     * @private
     */
    private _initialize = (): void => {
        // Initialize header.
        this.initializeHead(this.$i18next('contact.head.description'), this.$i18next('contact.head.keywords'));
        
        // Initialize data.
        this._initializeScope();
        this._initializeElements();
        this._initializeEvents();
        this._initializeLocation();
        
        // Refresh captcha.
        this._refreshCaptcha();
    }
    
    /**
     * @summary Initializes elements.
     * @private
     */
    private _initializeElements = (): void => {
        // Initializes Bing Maps options.
        this.$scope['mapOptions'] = { 
            credentials: "AiscBCv-CUb6kGw_scA6Voo8U8cO6XKiOQpNppd9lJAv_0ohATT3Vhwd2lx_RgJ_",
            disableKeyboardInput: true,
            disableZooming: true,
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            showCopyright: false,
            showDashboard: false,
            showScalebar: false,
            zoom: 12
        };
    }

    /**
     * @summary Initializes events.
     * @private
     */
    private _initializeEvents = (): void => {
        this.$scope['submit'] = this._submit;
        this.$scope['refreshCaptcha'] = this._refreshCaptcha;
        this.$scope['reset'] = this._reset;
    }
    
    /**
     * @summary Initialize location data.
     * @private
     */
    private _initializeLocation = (): void => {
        this.profileService.getProfile().then(profile => {
            var pinLocation: Microsoft.Maps.Location = new Microsoft.Maps.Location(profile['coordinates']['latitude'], profile['coordinates']['longitude']);
            var pin: Microsoft.Maps.Pushpin = new Microsoft.Maps.Pushpin(pinLocation, {icon: 'content/image/pin.svg', height: 60, width: 80});

            this.$scope['pushpins'] = [pin];
            this.$scope['viewOptions'] = {
                center: pinLocation
            };
        });
    }
    
    /**
     * @summary Initialize location data.
     * @private
     */
    private _refreshCaptcha = (): void => {
        this.$scope['captcha'] = 'http://lorempixel.com/250/100/abstract/?' + new Date().getTime();
    }

    /**
     * @summary Initializes angular scope.
     * @private
     */
    private _initializeScope = (): void => {
        this.$scope['form'] = new contactFormModel();
    }

    /**
     * @summary Resets the form.
     * @private
     */
    private _reset = (): void => {
        this.$scope['form'] = this.$scope['initial'];
        
        $(".alert").velocity('reverse', { display: 'none' });
        $(".alert-content").velocity('reverse', { duration: 1000 });
    }

    /**
     * @summary Submits message.
     * @private
     */
    private _submit = (): void => {
        $(".alert").velocity({ opacity: 1 }, { display: 'block', duration: 500 });
        $(".alert-content").velocity({ translateY: [0, 500] }, { duration: 1000, easing: [70, 10] });
        $(".alert-content header, .alert-content section").velocity({ translateY: [0, 250] }, { duration: 1000, easing: [70, 10] });
    }
}

export = ContactController;
app.instance.module['register'].controller('contactController', ContactController);

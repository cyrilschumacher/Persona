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
/// <reference path="../../../bower_components/DefinitelyTyped/jquery.autosize/jquery.autosize.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/velocity-animate/velocity-animate.d.ts" />
/// <amd-dependency path="directive/bingMapsDirective"/>
/// <amd-dependency path="directive/fadeByScrollDirective"/>
/// <amd-dependency path="jqueryAutosize"/>
/// <amd-dependency path="service/profileService"/>
/// <amd-dependency path="velocity"/>

import app = require('app');
import contactFormModel = require('model/contactFormModel');

/**
 * @summary Contact controller.
 * @author  Cyril Schumacher
 * @class
 */
class ContactController {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<String> = ['$scope', '$i18next', 'profileService'];
    
    /**
     * @summary Constructor.
     * @constructs
     * @public
     * @param $scope            {IScope}    Model.
     * @param $i18next          {any}       Localization.
     * @param profileService    {any}       Profile service.
     */
    public constructor(private $scope: ng.IScope, private $i18next: any, private profileService) {
        this._initScope();
        this._initElements();
        this._initEvents();
    }
    
    /**
     * @summary Initializes elements.
     * @private
     */
    private _initElements = (): void => {
        // Adds the autosize effect on message element.
        $('#message').autosize();
        
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
        
        var location: any = this.profileService.getProfile().then(profile => {
            var pinLocation: Microsoft.Maps.Location = new Microsoft.Maps.Location(profile.coordinates.latitude, profile.coordinates.longitude)
            var pin: Microsoft.Maps.Pushpin = new Microsoft.Maps.Pushpin(pinLocation, {icon: 'content/image/pin.svg', height: 60, width: 80});

            this.$scope['pushpins'] = [pin];
            this.$scope['viewOptions'] = {
                center: pinLocation
            };
        });
    }

    /**
     * @summary Initializes events.
     * @private
     */
    private _initEvents = (): void => {
        this.$scope['submit'] = this._submit;
        this.$scope['reset'] = this._reset;
    }

    /**
     * @summary Initializes angular scope.
     * @private
     */
    private _initScope = (): void => {
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
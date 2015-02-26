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
/// <amd-dependency path="directive/fadeByScrollDirective"/>
/// <amd-dependency path="service/resumeService"/>

import app = require('app');
import resumeService = require('service/resumeService');

/**
 * @summary About controller.
 * @author  Cyril Schumacher
 * @class
 */
class AboutController {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<String> = ['$scope', '$i18next', 'resumeService'];
    
    /**
     * @summary Constructor.
     * @constructs
     * @public
     * @param $scope        {IScope}         Scope.
     * @param $i18next      {any}            Localization.
     * @param resumeService {ResumeService}  Resume service.
     */
    public constructor(private $scope: ng.IScope, private $i18next: any, private resumeService: resumeService) {
        $scope['schools'] = resumeService.getEducation();
        $scope['experience'] = resumeService.getExperience();
        $scope['skills'] = resumeService.getSkills();
    }
}

export = AboutController;
app.instance.module['register'].controller('aboutController', AboutController);
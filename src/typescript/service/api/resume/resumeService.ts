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

/// <reference path="../../../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

import app = require('app');
import httpServiceBase = require('service/httpServiceBase');

/**
 * @summary Resume service.
 * @author  Cyril Schumacher
 * @class
 */
class ResumeService extends httpServiceBase {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<String> = ['$http', 'appConfig'];

    /**
     * @summary Constructor.
     * @constructs
     * @public
     * @param {IHttpService}    $http       HTTP service.
     * @param {Object}          appConfig   Application configuration.
     */
    public constructor(private $http: ng.IHttpService, private appConfig: Object) {
        super();
    }

    /**
     * @summary Returns a list of schools.
     * @public
     * @returns {IPromise} List of schools.
     */
    public getEducation = (): ng.IPromise<Array<Object>> => {
        var url: string = this.appConfig['restServer'].concat('resume/education');
        return this.$http.get(url).then(this.getDataComplete);
    }

    /**
     * @summary Returns a list of company.
     * @public
     * @returns {IPromise} List of company.
     */
    public getExperience = (): ng.IPromise<Array<Object>> => {
        var url: string = this.appConfig['restServer'].concat('resume/experience');
        return this.$http.get(url).then(this.getDataComplete);
    }

    /**
     * @summary Returns a list of skill.
     * @public
     * @returns {IPromise} List of skill.
     */
    public getSkills = (): ng.IPromise<Array<Object>> => {
        var url: string = this.appConfig['restServer'].concat('resume/skills');
        return this.$http.get(url).then(this.getDataComplete);
    }
}

export = ResumeService;
app.instance.module['register'].service('resumeService', ResumeService);
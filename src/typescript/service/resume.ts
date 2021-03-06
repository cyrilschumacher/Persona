/* The MIT License (MIT)
 *
 * Copyright (c) 2016 Cyril Schumacher.fr
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

import app = require("../app");

/**
 * @summary Service for get resume sections.
 * @author  Cyril Schumacher
 * @class
 */
class ResumeService {
    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ["$http", "$q", "appConfig"];

    /**
     * @summary Server address.
     * @private
     * @type {string}
     */
    private _serverAddress: string;

    /**
     * @summary Constructor.
     * @constructs
     * @param {IHttpService}    $http       The HTTP service.
     * @param {IQService}       $q          The Q service.
     * @param {Object}          appConfig   The application configuration.
     */
    public constructor(private $http: ng.IHttpService, private $q: ng.IQService, private appConfig: Object) {
        this._serverAddress = this.appConfig["api"]["server"];
    }

    /**
     * @summary Callback for failure of the request.
     * @private
     * @param {IHttpPromiseCallbackArg} response The HTTP response.
     * @return {Object} The data.
     */
    private _errorCallback = (response: ng.IHttpPromiseCallbackArg<Object>): Object => {
        return this.$q.reject(response.data);
    };

    /**
     * @summary Callback for success of the request.
     * @private
     * @param {IHttpPromiseCallbackArg} response The HTTP response.
     * @return {Object} The data.
     */
    private _successCallback = (response: ng.IHttpPromiseCallbackArg<Object>): Object => {
        return response.data;
    };

    /**
     * @summary Gets the education section.
     * @return {IPromise} The promise.
     */
    public getEducationSectionAsync = (): ng.IPromise<Object> => {
        const path = this.appConfig["api"]["resources"]["resume"]["education"];
        const url = this._serverAddress.concat(path);

        return this.$http.get(url).then(this._successCallback, this._errorCallback);
    };

    /**
     * @summary Gets the experience section.
     * @return {IPromise} The promise.
     */
    public getExperienceSectionAsync = (): ng.IPromise<Object> => {
        const path = this.appConfig["api"]["resources"]["resume"]["experience"];
        const url = this._serverAddress.concat(path);

        return this.$http.get(url).then(this._successCallback, this._errorCallback);
    };

    /**
     * @summary Gets the skills section.
     * @return {IPromise} The promise.
     */
    public getSkillsSectionAsync = (): ng.IPromise<Object> => {
        const path = this.appConfig["api"]["resources"]["resume"]["skills"];
        const url = this._serverAddress.concat(path);

        return this.$http.get(url).then(this._successCallback, this._errorCallback);
    };
}

app.module.service("resumeService", ResumeService);
export = ResumeService;

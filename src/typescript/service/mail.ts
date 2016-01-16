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

class MailService {
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
     * @param {IHttpPromiseCallbackArg} response The HTTP response.
     * @return {Object} The data.
     */
    private _errorCallback = (response: ng.IHttpPromiseCallbackArg<{}>): Object => {
        return this.$q.reject(response.data);
    };

    /**
     * @summary Callback for success of the request.
     * @param {IHttpPromiseCallbackArg} response The HTTP response.
     * @return {Object} The data.
     */
    private _successCallback = (response: ng.IHttpPromiseCallbackArg<{}>): Object => {
        return response.data;
    };

    /**
     * @summary Sends e-mail.
     * @param {string}  emailAddress    The e-mail address.
     * @param {string}  subject         The subject.
     * @param {string}  message         The message.
     * @param {string}  catpcha         The captcha.
     * @return {IPromise} The promise.
     */
    public send = (emailAddress: string, subject: string, message: string, captcha: string): ng.IPromise<{}> => {
        const path = this.appConfig["api"]["resources"]["resume"]["skills"];
        const url = this._serverAddress.concat(path);
        const config: ng.IRequestShortcutConfig = {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
        const data = {
            captcha: captcha,
            emailAddress: emailAddress,
            message: message,
            subject: subject
        };

        return this.$http.post(url, data, config).then(this._successCallback, this._errorCallback);
    };
}

app.module.service("mailService", MailService);
export = MailService;

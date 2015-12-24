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

import app = require("app");

class ResumeService {
    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ["$http", "appConfig"];

    /**
     * @summary Constructor.
     * @param {IHttpService}
     */
    public constructor(private $http: ng.IHttpService, private appConfig: Object) {
    }

    /**
     * @summary Gets the education section.
     * @return {IPromise} The promise.
     */
    public getEducationSection = (): ng.IPromise<any> => {
        const url = this.appConfig["rest"].server.concat("resume/education");
        return this.$http.get(url).then(response => response.data);
    };

    /**
     * @summary Gets the experiences section.
     * @return {IPromise} The promise.
     */
    public getExperiencesSection = (): ng.IPromise<any> => {
        const url = this.appConfig["rest"].server.concat("resume/experiences");
        return this.$http.get(url).then(response => response.data);
    };
}

app.module.service("resumeService", ResumeService);

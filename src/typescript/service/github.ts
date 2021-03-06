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
 * @summary Service for get GitHub informations.
 * @author  Cyril Schumacher
 * @class
 */
class GitHubService {
    /**
     * @summary Dependencies injection.
     * @type {Array<string>}
     */
    public static $inject: Array<string> = ["$resource", "appConfig"];

    /**
     * @summary Server address.
     * @private
     * @type {string}
     */
    private _serverAddress: string;

    /**
     * @summary Constructor.
     * @constructs
     * @param {IResourceService}    $resource   The resource service.
     * @param {Object}              appConfig   The application configuration.
     */
    public constructor(private $resource: angular.resource.IResourceService, private appConfig: Object) {
        this._serverAddress = this.appConfig["github"]["server"];
    }

    /**
     * @summary List public repositories for the specified user.
     * @param {string} username The username.
     * @return {Object} The repositories.
     */
    public getUserRepositoriesAsync = (username: string): ng.IPromise<Object> => {
        const path = this.appConfig["github"]["resources"]["repositories"]["list"];
        const url = this._serverAddress.concat(path);
        const parameters = { "username": username };
        const actions = { query: { isArray: true, method: "GET"}};
        const query = this.$resource(url, parameters, actions).query();

        return query.$promise;
    };
}

app.module.service("gitHubService", GitHubService);
export = GitHubService;

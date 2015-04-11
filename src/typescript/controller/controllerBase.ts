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

import headModel = require('model/html/headModel');

/**
 * @summary Controller base.
 * @author  Cyril Schumacher
 * @class
 */
class ControllerBase {
    /**
     * @summary Constructor.
     * @constructor
     * @public
     * @param $scope        {IScope}        Model.
     * @param $rootScope    {IRootScopeService} Root scope.
     */
    public constructor(public $scope: ng.IScope, public $rootScope: ng.IRootScopeService) {
        $rootScope['head'] = new headModel();
    }
    
    /**
     * @summary Initialize head information.
     * @protected
     * @param description   {string} Description.
     * @param keywords      {string} Keywords.
     * @param title         {string} Title.
     */
    protected initializeHead = (description?: string, keywords?: string, title?: string) => {
        var head: headModel = this.$rootScope['head'];
        
        head.description = description;
        head.keywords = keywords;
        head.title = title;
    }
}

export = ControllerBase;
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

import app = require('app');

/**
 * @summary Messenger pattern.
 * @author  Cyril Schumacher
 * @class
 */
class MessengerService {
    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<string> = [];
    
    /**
     * @summary Messages.
     * @private
     * @type {Object}
     */
    private messages: { [id: string] : Object };
    
    /**
     * @summary Constructor.
     * @constructs
     * @public
     */
    constructor() {
        return this.getDirectiveInformation();
    }

    /**
     * @summary Get directive information.
     * @private
     * @return {Object} The directive information.
     */
    private getDirectiveInformation = (): Object => {
        this.messages = {};
        return { add: this.add, get: this.get };
    }

    /**
     * @summary Add a message.
     * @public
     * @type {Object} value A message.
     * @type {string} key   A key.
     */
    public add = (message: Object, key: string): void => {
        this.messages[key] = message;
    }
    
    /**
     * @summary Get the message by a key.
     * @public
     * @type {string} key A key.
     * @return {Object} The message.
     */
    private get = (key: string): Object => {
        return this.messages[key];
    }
    
    /**
     * @summary Get the message by a key and delete it.
     * @public
     * @type {string} key A key.
     * @return {Object} The message.
     */
    private getAndRemove = (key: string): void => {
        var value: Object = this.get(key);
        delete this.messages[key];
        
        return value;
    }
}

export = MessengerService;
app.instance.module['register'].factory('messengerService', MessengerService);
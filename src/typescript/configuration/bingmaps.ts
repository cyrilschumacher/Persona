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

/// <reference path="../typing/ng-i18next/ng-i18next.d.ts" />

import app = require("../app");

/**
 * Configuration for Bing Maps.
 * @author  Cyril Schumacher
 * @class
 */
class BingMapsConfiguration {
  /**
   * @summary Dependencies injection.
   * @type {Array<string>}
   */
  public static $inject: Array<string> = ["angularBingMapsProvider", "appConfigProvider"];

  /**
   * @summary Constructor.
   * @constructor
   * @param {any}       angularBingMapsProvider The angular bing maps provider.
   * @param {Object}    appConfig               The application configuration.
   */
  public constructor(private angularBingMapsProvider: any, private appConfigProvider: Object) {
    this._initializeOptions();
  }

  /**
   * @summary Initializes i18next provider.
   * @private
   */
  private _initializeOptions = (): void => {
    this.angularBingMapsProvider.setDefaultMapOptions(
        {
            credentials: "AiscBCv-CUb6kGw_scA6Voo8U8cO6XKiOQpNppd9lJAv_0ohATT3Vhwd2lx_RgJ_",
            enableClickableLogo: false,
            enableSearchLogo: false,
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            showCopyright: false,
            showDashboard: false
        }
    );
  };
}

export = BingMapsConfiguration;

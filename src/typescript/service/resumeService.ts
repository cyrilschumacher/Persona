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

import app = require('app');

/**
 * @summary Resume service.
 * @author  Cyril Schumacher
 * @class
 */
class ResumeService {
    'use strict';

    /**
     * @summary Dependencies injection.
     * @public
     * @type {Array<string>}
     */
    public static $inject: Array<String> = ['$http'];
    
    /**
     * @summary Constructor.
     * @constructs
     * @public
     * @param {IHttpService} $http HTTP service.
     */
    public constructor(private $http: ng.IHttpService) {
    }
    
    /**
     * @summary Returns a list of school.
     * @public
     * @returns {Object} List of school.
     */
    public getEducation = (): Object => {
        return [
            {
                id: 'mentitum',
                name: 'mentitum',
                location: {
                    address: {
                        addressLine1:   '610 Lynch Street',
                        city:           'Neenah',
                        countryRegion:  'United States',
                        postalCode:     '54956',
                        stateProvince:  'WI'
                    },
                    coordinates: {
                        latitude:   '44.150211',
                        longitude:  '-88.49679'
                    }
                },
                period: {
                    start:  '2014-11-15T22:31:12.6022599+01:00',
                    end:    '2014-11-15T22:32:12.6022599+01:00'
                },
                degrees: ['efflorescere iudicem sint excepteur cillum', 'aute voluptate ipsum velit']
            },
            {
                id: 'iudicem',
                name: 'iudicem',
                location: {
                    address: {
                        addressLine1:   '3406 Wilson Street',
                        city:           'Apple Valley',
                        countryRegion:  'United States',
                        postalCode:     '92308',
                        stateProvince:  'CA'
                    },
                    coordinates: {
                        latitude:   '34.441172',
                        longitude:  '-117.153621'
                    }
                },
                period: {
                    start:  '2014-11-15T22:31:12.6022599+01:00',
                    end:    '2014-11-15T22:32:12.6022599+01:00'
                },
                degrees: ['consectetur tamen concursionibus']
            },
            {
                id: 'incididunt',
                name: 'incididunt',
                location: {
                    address: {
                        addressLine1:   '2872 Traders Alley',
                        city:           'Kansas City',
                        countryRegion:  'United States',
                        postalCode:     '66210',
                        stateProvince:  'MO'
                    },
                    coordinates: {
                        latitude:   '39.155444',
                        longitude:  '-94.761301'
                    }
                },
                period: {
                    start:  '2014-11-15T22:31:12.6022599+01:00',
                    end:    '2014-11-15T22:32:12.6022599+01:00'
                },
                degrees: ['consectetur tamen concursionibus']
            },
        ];
    }

    /**
     * @summary Returns a list of company.
     * @public
     * @returns {Object} List of company.
     */
    public getExperience = (): Object => {
        return [
            {
                id: 'officia-id',
                name: 'officia id',
                summary: 'Malis arbitror nam sunt labore. Si ipsum culpa veniam doctrina, summis ubi ita dolor tempor, irure se arbitror, quibusdam quae eram appellat legam et pariatur aut noster ita excepteur et fugiat, singulis labore sint laboris noster, quamquam an labore quibusdam. Varias a non dolore arbitror eu nulla ubi vidisse ex duis.',
                company: {
                    name: 'familiaritatem',
                    location: {
                        address: {
                            addressLine1:   '610 Lynch Street',
                            city:           'Neenah',
                            countryRegion:  'United States',
                            postalCode:     '54956',
                            stateProvince:  'WI'
                        },
                        coordinates: {
                            latitude:   '44.150211',
                            longitude:  '-88.49679'
                        }
                    } 
                },
                period: {
                    start:  '2014-11-15T22:31:12.6022599+01:00',
                    end:    '2014-11-15T22:32:12.6022599+01:00'
                }
            },
            {
                id: 'probant',
                name: 'probant',
            summary: 'A sint e malis, de mentitum graviterque. Quis ab incididunt iis ab quid iudicem tempor, veniam domesticarum quamquam labore tempor, ipsum transferrem possumus noster ullamco, dolore proident instituendarum, sed si summis aute malis, eiusmod varias quem arbitror malis do cernantur labore id officia efflorescere. Quem ullamco se eruditionem ubi singulis nisi arbitror occaecat si multos incididunt id occaecat, magna praetermissum mentitum lorem appellat.',
                company: {
                    name: 'a deserunt adipisicing',
                    location: {
                        address: {
                            addressLine1:   '3406 Wilson Street',
                            city:           'Apple Valley',
                            countryRegion:  'United States',
                            postalCode:     '92308',
                            stateProvince:  'CA'
                        },
                        coordinates: {
                            latitude:   '34.441172',
                            longitude:  '-117.153621'
                        }
                    }
                },
                period: {
                    start:  '2014-11-15T22:31:12.6022599+01:00',
                    end:    '2014-11-15T22:32:12.6022599+01:00'
                }
            },
            {
                id: 'consequat',
                name: 'consequat',
                summary: 'Officia philosophari a voluptate ubi cernantur tractavissent ut consequat, legam quamquam an fabulas, proident elit sed probant familiaritatem in ingeniis tractavissent ab laboris eu eu dolor aliquip ubi esse tempor do sempiternum, ubi a labore aliqua quae. Ex incurreret hic aliquip, a si coniunctione aut aliqua a nostrud, multos occaecat cohaerescant. Dolor praesentibus officia minim probant an te dolore nulla aut doctrina, expetendis culpa dolor o anim, qui commodo voluptatibus, mentitum voluptatibus iis quibusdam ne varias ubi ea dolor vidisse, tempor illustriora o mentitum id o tamen ipsum dolor offendit.',
                company: {
                    name: '_non litteris philosophari',
                    location: {
                        address: {
                            addressLine1:   '2872 Traders Alley',
                            city:           'Kansas City',
                            countryRegion:  'United States',
                            postalCode:     '66210',
                            stateProvince:  'MO'
                        },
                        coordinates: {
                            latitude:   '39.155444',
                            longitude:  '-94.761301'
                        }
                    }
                },
                period: {
                    start:  '2014-11-15T22:31:12.6022599+01:00',
                    end:    '2014-11-15T22:32:12.6022599+01:00'
                }
            }
        ];
    }

    /**
     * @summary Returns a list of skill.
     * @public
     * @returns {Object} List of skill.
     */
    public getSkills = (): Object => {
        return [
            { name: 'eruditionem', score: 50 },
            { name: 'legam', score: 25 },
            { name: 'mandaremus de', score: 75 },
            { name: 'fore voluptatibus', score: 100 },
            { name: 'irure', score: 0 },
            { name: 'dolor', score: 10 },
            { name: 'irure ab', score: 60 },
            { name: 'tamen', score: 85 },
        ];
    }
}

export = ResumeService;
app.instance.module['register'].service('resumeService', ResumeService);
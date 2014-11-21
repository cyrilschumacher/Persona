/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

requirejs(['angular']);

module Application.Services {
    'use strict';
    
    /**
     * @summary Resume service.
     * @class
     */
    export class ResumeService {
        /**
         * @summary HTTP service.
         * @type    {IHttpService}
         * @private
         */
        private _http: ng.IHttpService;
        
        /**
         * @summary Constructor.
         * @constructs
         * @param {IHttpService} $http HTTP service.
         */
        public construct($http: ng.IHttpService) {
            this._http = $http;
        }
    
        /**
         * @summary Returns a list of school.
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
         * @returns {Object} List of company.
         */
        public getExperience = (): Object => {
            return [
                {
                    id: 'officia-id',
                    name: 'officia id',
                    summary: 'Malis arbitror nam sunt labore. Si ipsum culpa veniam doctrina, summis ubi ita dolor tempor, irure se arbitror, quibusdam quae eram appellat legam et pariatur aut noster ita excepteur et fugiat, singulis labore sint laboris noster, quamquam an labore quibusdam. Varias a non dolore arbitror eu nulla ubi vidisse ex duis.',
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
                    }
                },
                {
                    id: 'probant',
                    name: 'probant',
                summary: 'A sint e malis, de mentitum graviterque. Quis ab incididunt iis ab quid iudicem tempor, veniam domesticarum quamquam labore tempor, ipsum transferrem possumus noster ullamco, dolore proident instituendarum, sed si summis aute malis, eiusmod varias quem arbitror malis do cernantur labore id officia efflorescere. Quem ullamco se eruditionem ubi singulis nisi arbitror occaecat si multos incididunt id occaecat, magna praetermissum mentitum lorem appellat.',
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
                    }
                },
                {
                    id: 'consequat',
                    name: 'consequat',
                    summary: 'Officia philosophari a voluptate ubi cernantur tractavissent ut consequat, legam quamquam an fabulas, proident elit sed probant familiaritatem in ingeniis tractavissent ab laboris eu eu dolor aliquip ubi esse tempor do sempiternum, ubi a labore aliqua quae. Ex incurreret hic aliquip, a si coniunctione aut aliqua a nostrud, multos occaecat cohaerescant. Dolor praesentibus officia minim probant an te dolore nulla aut doctrina, expetendis culpa dolor o anim, qui commodo voluptatibus, mentitum voluptatibus iis quibusdam ne varias ubi ea dolor vidisse, tempor illustriora o mentitum id o tamen ipsum dolor offendit.',
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
                    }
                }
            ];
        }
            
        /**
         * @summary Returns a list of skill.
         * @returns {Object} List of skill.
         */
        public getSkills = (): Object => {
            return [
                { id: 'eruditionem', name: 'eruditionem', progres: 50 },
                { id: 'legam', name: 'legam', progres: 25 },
                { id: 'mandaremus-de', name: 'mandaremus de', progres: 75 },
                { id: 'fore-voluptatibus', name: 'fore voluptatibus', progres: 100 },
                { id: 'irure', name: 'irure', progres: 0 }
            ];
        }
    }
}
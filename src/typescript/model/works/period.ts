/**
 * @summary Project period.
 * @author  Cyril Schumacher
 * @class
 */
class ProjectPeriod {
    /**
     * @summary Constructor.
     * @constructor
     * @param {Date}    end     The end date.
     * @param {Date}    start   The start date.
     */
    public constructor(public end: Date, public start: Date) {
    }
}

export = ProjectPeriod;

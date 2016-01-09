import ProjectPeriod = require("./period");
import ProjectType = require("./type");

/**
 * @summary Project.
 * @author  Cyril Schumacher
 * @class
 */
class ProjectModel {
    /**
     * @summary Constructor.
     * @constructor
     * @param {string}          name        The name.
     * @param {ProjectType}     type        The type.
     * @param {ProjectPeriod}   period      The period.
     * @param {Array}           summary     The summary.
     * @param {Array}           thumbnails  The thumbnails.
     * @param {Array}           files       The files.
     */
    public constructor(public name: string,
        public type: ProjectType,
        public period: ProjectPeriod,
        public summary: Array<string>,
        public thumbnails: Array<string>,
        public files: Array<string>) {
    }
}

export = ProjectModel;

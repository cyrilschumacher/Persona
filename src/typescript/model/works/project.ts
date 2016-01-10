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
     * @param {Object}          name        The name.
     * @param {ProjectType}     type        The type.
     * @param {ProjectPeriod}   period      The period.
     * @param {Object}          summary     The summary.
     * @param {Array}           thumbnails  The thumbnails.
     * @param {Array}           files       The files.
     */
    public constructor(public name: {[languageName: string]: string},
        public type: ProjectType,
        public period: ProjectPeriod,
        public summary: {[languageName: string]: string},
        public thumbnails: Array<string>,
        public files: Array<string>) {
    }
}

export = ProjectModel;

const subprocess = require('child_process');
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

/**
 * @type {webpack.RawLoaderDefinition}
 */
module.exports = function loader() {

    /**
     * @typedef {Object} TypeOptions The options for the loader.
     * @property {string} TypeOptions.reaper The path to the Reaper executable.
     * @private
     */

    const context = /** @type {webpack.LoaderContext<TypeOptions>} */(this);

    const file = context.resourcePath;
    const options = context.getOptions();
    const reaper = options.reaper;

    try {

        const location = path.dirname(file);
        const filename = path.basename(file, '.rpp');
        const source = filename + '.wav';

        if (fs.existsSync(path.resolve(location, source)) === false
        || fs.statSync(path.resolve(location, source)).mtime < fs.statSync(file).mtime) {

            if (typeof reaper === 'undefined') {

                throw new Error('Reaper executable path is missing in the loader options.');
            }

            if (fs.existsSync(reaper) === false) {

                throw new Error('Reaper executable not found reading path: ' + (typeof reaper !== 'undefined' || reaper !== '' ? '\'' + reaper + '\'' : '<empty>') + '.');
            }

            subprocess.execSync(

                'cd "' + location + '"' +

                ' && "' + reaper  + '"' +
                ' -renderproject "' + file + '"'
            );
        }

        return (

            'import sound from \'./' + source + '\';' +

            'export default sound;'
        );
    }

    catch ($error) {

        throw $error;
    }
};

module.exports.raw = true;

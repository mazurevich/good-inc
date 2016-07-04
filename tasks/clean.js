/**
 * Created by Andrew on 30.06.2016.
 */
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');

//--------------CLEAN TASK-----------///
module.exports =  function (options) {

    return function (callback) {

        return del(options.dest).then(paths => {
            console.log('Deleted files and folders:', paths.join('\n'))
        });
        
    }
};

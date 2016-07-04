/**
 * Created by Andrew on 30.06.2016.
 */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();



module.exports =  function (options) {

    options.srcOptionsObj.since = gulp.lastRun('assets');
    
    return function () {
        return gulp.src(options.src, options.srcOptionsObj)
            .pipe($.debug())
            .pipe($.cached('assets'))
            .pipe(gulp.dest(options.dest));
    }
};



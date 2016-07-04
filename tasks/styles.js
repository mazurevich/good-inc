/**
 * Created by Andrew on 30.06.2016.
 */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function (options) {

    return function (callback) {

        return combine(gulp.src(options.src,
            options.srcOptionsObj),

            // $.cached('styles'),

            $.if(isDevelopment, $.sourcemaps.init()),

            $.sass({
                includePaths: options.includePaths
            }).on('error', $.sass.logError),

            $.autoprefixer(),

            // $.remember('styles'),

            $.if(isDevelopment, $.sourcemaps.write('.')),

            gulp.dest(options.dest)
        ).on('error', $.notify.onError())
    }
};




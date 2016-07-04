/**
 * Created by Andrew on 30.06.2016.
 */
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const buffer = require ('vinyl-buffer');
const combine = require('stream-combiner2').obj;

//--------------SPRITE TASK-----------///

module.exports =  function (options) {
    
    return function () {
        var spriteData = gulp.src(options.src)
            .pipe($.spritesmith({
                imgName: options.spriteName,
                cssName: options.cssName
            }));

        var imageStream = spriteData.img
            .pipe(buffer())
            .pipe($.imagemin())
            .pipe(gulp.dest(options.spriteDest));

        var scssStream = spriteData.css
            .pipe(gulp.dest(options.cssDest));

        return combine(imageStream, scssStream);
    }
};

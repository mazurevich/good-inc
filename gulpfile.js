'use strict';


var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        var task = require(path).call(this, options);

        return task(callback);
    })
}

//--------------CLEAN TASK-----------///
lazyRequireTask('clean', './tasks/clean', {dest: 'dest'});

//--------------SPRITE TASK-----------///
lazyRequireTask('sprite:png', './tasks/sprite-png', {
    src: './source/img/icons/*.png',
    spriteName: 'sprite.png',
    cssName: 'sprite.sass',
    spriteDest: 'dest/styles',
    cssDest: 'tmp'
});


//--------------STYLES TASK-----------///
lazyRequireTask('styles', './tasks/styles', {
    src: 'source/styles/**/*.sass',
    srcOptionsObj: {
        base: 'source'
    },
    dest: './dest',
    includePaths: [process.cwd() + '/tmp']
});


//--------------ASSETS TASK-----------///
lazyRequireTask('assets', './tasks/assets', {
    src: ['source/*.*', 'source/img/*.*', 'source/js/*.*'],
    srcOptionsObj: {
        base: 'source'
    },
    dest: './dest'
});


//--------------BUILD TASK-----------///
gulp.task('build', gulp.series('clean', 'sprite:png', 'styles', 'assets'));


//--------------WATCH TASK-----------///
lazyRequireTask('watch', './tasks/watch',{
    stylePath :  './source/**/*.{sass,scss}',
    assetsPath :['source/*.*', 'source/img/*.*', 'source/js/*.*'],
    iconsPath : './source/img/icons/*.png'
});

//--------------serve TASK-----------///
gulp.task('serve', function () {
    browserSync.init({
        server: 'dest'
    });

    browserSync.watch('dest/**/*.*').on('change', browserSync.reload);
});


//--------------dev TASK-----------///
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));


//--------------LINT TASK-----------///
lazyRequireTask('eslint', './tasks/es-lint', {
    cacheFileDir: process.cwd() + '/tmp/lintCache.json',
    src: 'source/js/**/*.js'
});

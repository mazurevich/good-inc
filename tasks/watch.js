const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

module.exports =  function (options) {

    return function () {
        gulp.watch(options.stylePath, gulp.series(['styles']))
            .on('unlink', function (filepath) {
                if (filepath.indexOf('___jb_tmp___') > 0)
                    return;
                
                delete $.cached.caches.styles[path.resolve(filepath)];

                filepath = filepath.replace('sass', 'css');
                $.remember.forget('styles', path.resolve(filepath))
            });

        gulp.watch(['source/*.*', 'source/img/*.*', 'source/js/*.*'], gulp.series('assets'))
            .on('unlink', function (filepath) {
                if (filepath.indexOf('___jb_tmp___') > 0)
                    return;

                delete cached.caches.assets[path.resolve(filepath)];
            });

        gulp.watch(options.iconsPath, gulp.series(['sprite:png']))
    }
};



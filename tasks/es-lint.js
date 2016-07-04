/**
 * Created by Andrew on 30.06.2016.
 */
'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const fs = require('fs');
const through2 = require('through2').obj;
const combine = require('stream-combiner2').obj;

//--------------CLEAN TASK-----------///
module.exports =  function (options) {

    return function () {

        let eslintResults = {};

        let cacheFileDir = options.cacheFileDir

        try {
            eslintResults = JSON.parse(fs.readFileSync(cacheFileDir));
        } catch (e) {
        }


        return gulp.src(options.src, {read: false})
            .pipe($.if(
                function (file) {
                    var res = eslintResults[file.path] && eslintResults[file.path].mtime == file.stat.mtime.toJSON();
                    //if we've already checked file and it hasn't been modified
                    return res;
                },

                //step if there were no modification in file
                through2(function (file, enc, callback) {
                    file.eslint = eslintResults[file.path].eslint;
                    callback(null, file);
                }),

                //read, lint and save info if there were no modification in file
                combine(
                    through2(function (file, enc, callback) {

                        file.contents = fs.readFileSync(file.path);

                        callback(null, file);
                    }),

                    $.eslint(),
                    $.debug({title: 'eslint'}),

                    through2(function (file, enc, callback) {

                        eslintResults[file.path] = {
                            eslint: file.eslint,
                            mtime: file.stat.mtime
                        };

                        callback(null, file);
                    })
                )
            ))
            .pipe($.eslint.format())
            .on('end', function () {
                fs.writeFileSync(cacheFileDir, JSON.stringify(eslintResults));
            })

            .pipe($.eslint.failAfterError());
    }
};

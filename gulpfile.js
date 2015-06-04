/**
 * Simple React Countdown
 * simply using gulp to transpile the es6 into old school javascript
 */

var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

gulp.task('default', function () {
    browserify({
        entries: './countdown.js',
        debug: false
    })
    .transform(babelify)
    .bundle()
    .pipe(source('countdown-es5.js'))
    .pipe(gulp.dest('./'));
});
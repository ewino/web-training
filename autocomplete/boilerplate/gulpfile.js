/**
 * Created by ewino on 25/7/2016.
 */

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    nib = require('nib');

gulp.task('default', ['styles', 'pug']);


gulp.task('styles', function () {
    return gulp.src('static/styles/*.styl')
        .pipe(stylus({use: nib(), compress: true}))
        .pipe(gulp.dest('static/css/'));
});

gulp.task('pug', function () {
    return gulp.src('templates/**/*.jade')
        .pipe(pug())
        .pipe(gulp.dest(function(file) {
            return file.base;
          }));
});

gulp.task('watch', function() {
    watch('static/styles/*.styl', batch(function (events, done) {
        gulp.start('styles', done);
    }));
    watch('templates/**/*.jade', batch(function (events, done) {
        gulp.start('pug', done);
    }));
});
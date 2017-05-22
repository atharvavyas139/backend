var gulp = require('gulp'),
    gutil = require('gulp-util'),
    minify = require('gulp-minifier'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    watch = require("gulp-watch");

var sources = ['./src/**/*.css', './src/**/*.js'];

gulp.task('watch', function() {
    // Endless stream mode 
    return watch(sources, {
        ignoreInitial: false
    }, function() {
        gulp.src(sources, {
            base: './src'
        }).pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true,
        })).pipe(rename(function(path) {
            path.extname = ".min" + path.extname;
        })).pipe(gulp.dest('./public/'));
        gutil.log('Done minifying files');
    });
});


gulp.task('default', ['watch'], function() {
    gutil.log('Done initializing gulp');
});
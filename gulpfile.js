'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const destDir = 'dist/';
    
gulp.task('translate', cb => {
    require('./translate/translate').translate(cb);
});

gulp.task('jquery', () => {
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(destDir));
});

gulp.task('calendula', () => {
    return gulp.src('./node_modules/calendula/dist/calendula.*')
        .pipe(gulp.dest(destDir));
});

gulp.task('default', ['jquery', 'calendula']);


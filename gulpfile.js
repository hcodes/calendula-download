'use strict';

const gulp = require('gulp');
const destDir = 'dist/';
const translate = require('./translate/translate');
    
gulp.task('translate', cb => {
    translate.translate(cb);
});

gulp.task('jquery', () => {
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(destDir));
});

gulp.task('calendula', () => {
    return gulp.src('./node_modules/calendula/dist/calendula.*')
        .pipe(gulp.dest(destDir));
});

gulp.task('default', gulp.series('jquery', 'calendula'));


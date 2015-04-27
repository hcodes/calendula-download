var gulp = require('gulp'),
    concat = require('gulp-concat');
    
gulp.task('translate', function(cb) {
    require('./translate/translate').translate(cb);
});

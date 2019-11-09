const gulp = require('gulp');

gulp.task('rootFiles', () => gulp.src('./src/assets/*.*').pipe(gulp.dest('./dist/')));

gulp.task('default', gulp.parallel('rootFiles'));

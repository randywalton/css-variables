const gulp = require('gulp'),
    terser = require('gulp-terser'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

gulp.task('scripts', function(){
  return gulp.src('./js/*.js')
    .pipe(terser())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('sass', function(){
  return gulp.src('./sass/*.scss')
    .pipe(sass())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./build/css'))
});

// gulp.task('say_hello', function(done) {
//     console.log('Test!!!');
//   done();
// });
// gulp.task('default', gulp.parallel('say_hello', 'scripts'));

gulp.task("watch", function() {
  gulp.watch("./js/*.js", gulp.series("scripts"));
  gulp.watch('./sass/*.scss', gulp.series('sass'));
});

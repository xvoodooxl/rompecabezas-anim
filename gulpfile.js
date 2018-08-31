const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


// Compile sass
gulp.task('sass' , function() {
  return gulp.src(['src/sass/**/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.stream());
});

// Copy html
gulp.task('copyHTML', () =>
  gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
);

// Copy Scripts
gulp.task('scripts', () =>
  gulp.src('src/scripts/*.js')
    .pipe(gulp.dest('public/scripts'))
);

// Watch and Serve

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './public'
  })

  gulp.watch(['src/sass/*.scss'], ['sass']);
  gulp.watch(['src/sass/**/*.scss'], ['sass']);
  gulp.watch(['src/*.html'], ['copyHTML']);
  gulp.watch(['public/*html']).on('change', browserSync.reload);
  gulp.watch(['src/scripts/*.js'], ['scripts']);
  gulp.watch(['public/scripts/*.js']).on('change', browserSync.reload);
});


// Default
gulp.task('default' , ['serve', 'copyHTML', 'scripts']);

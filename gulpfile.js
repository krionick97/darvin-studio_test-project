'use strict'

const gulp = require('gulp');
const gulpPlugin = require('gulp-load-plugins')();
const htmlValidator = require('gulp-w3c-html-validator');
const browserSync = require('browser-sync').create();
const through2 = require('through2');

/* Plugin for W3C HTML validation */
const task = {
  validateHtml: () => {
     const handleFile = (file, encoding, callback) => {
        callback(null, file);
        if (!file.w3cjs.success)
           throw Error('HTML validation error(s) found');
        };
     return gulp.src('public/*.html')
        .pipe(htmlValidator())
        .pipe(through2.obj(handleFile))
        .pipe(browserSync.reload({
          stream: true
        }));
     }
  };
gulp.task('HTMLValidator', task.validateHtml);

/* Plugin for start browser */
gulp.task('serve', function() {
  browserSync.init({
      server: "./public"
  });
});

/* Pug preprocessor */
gulp.task('pug', function() {
  return gulp.src('app/assets/pug/pages/*.pug')
        .pipe(gulpPlugin.pug({
          pretty: true
        }))
        .pipe(gulp.dest('public'))
        .on('end', browserSync.reload);
});

/* CSS task */
gulp.task('css', function() {
  return gulp.src('app/styles/*.css')
        .pipe(gulpPlugin.sourcemaps.init())
        .pipe(gulpPlugin.sourcemaps.write())
        .pipe(gulp.dest('public/styles/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

/* SASS preprocessor */
gulp.task('sass', function() {
  return gulp.src('app/styles/sass/style.sass')
        .pipe(gulpPlugin.sourcemaps.init())
        .pipe(gulpPlugin.sass({}))
        .pipe(gulpPlugin.autoprefixer({}))
        .on("error", gulpPlugin.notify.onError({
          message: "Error: <%= error.message %>",
          title: "Error in style"
        }))
        .pipe(gulpPlugin.sourcemaps.write())
        .pipe(gulp.dest('public/styles/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

/* Fonts task */
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('public/fonts/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

/* JavaScript task */
gulp.task('script', function() {
  return gulp.src('app/js/*.js')
  .pipe(gulpPlugin.concat('main.js'))
  .pipe(gulp.dest('public/js/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

/* JSON task */
gulp.task('json', function() {
  return gulp.src('app/data/*.json')
        .pipe(gulp.dest('public/data/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

/* All tasks monitoring */
gulp.task('watch', function() {
  gulp.watch('app/assets/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('app/styles/*.css', gulp.series('css'));
  gulp.watch('app/styles/sass/*.sass', gulp.series('sass'));
  gulp.watch('app/js/*.js', gulp.series('script'));
  gulp.watch('public/*.html', gulp.series('HTMLValidator'));
  gulp.watch('app/data/*.json', gulp.series('json'));
});

/* Default task */
gulp.task('default', gulp.series(
  gulp.parallel('pug', 'fonts', 'sass', 'css', 'script', 'json'),
  gulp.parallel('watch', 'serve', 'HTMLValidator'),
));

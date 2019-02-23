var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    autoprefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    minCss        = require('gulp-clean-css'),
    imagemin      = require('gulp-imagemin'),
    cache         = require('gulp-cache'),
    clean         = require('gulp-clean'),
    rename        = require('gulp-rename');

//Styles
gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.sass')
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
   browsers: ['last 15 versions'],
   cascade: false
  }))
  .pipe(minCss())
  .pipe(rename({
   // prefix: "min-",
   suffix: "-min",
   // extname: ".css"
  })) 
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

//Scripts
gulp.task('js', function(){
  return gulp.src(['app/js/*.js', '!app/js/*-min.js'])
  .pipe(uglify())
  .pipe(rename({
    // prefix: "min-",
    suffix: "-min",
    // extname: ".js"
  }))
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.reload({stream: true}))
});

//HTML
gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

//BrowserSync
gulp.task('browserSync' , function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // tunnel: true,
    // tunnel: "projectname"
  });
});

gulp.task('watch', function(){
  gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
  gulp.watch(['app/js/**/*.js', '!app/js/*-min.js'], gulp.parallel('js'));
  gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('watch', 'sass', 'js', 'browserSync'));


/* for building Project */

gulp.task('minCSS', function(){
  return gulp.src('app/css/style-min.css')
  .pipe(gulp.dest('dist/css'))
});

gulp.task('minJS', function(){
  return gulp.src('app/js/common.js')
  .pipe(gulp.dest('dist/js'))
});

gulp.task('minImages', function() {
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin())) // Cache Images
  .pipe(gulp.dest('dist/img'));
});

gulp.task('build', gulp.parallel('sass', 'js', 'html' 'minCSS', 'minJS', 'minImages'), function(){

  // Some files
  gulp.src([
    //'app/.htaccess',
    //'app/robots.txt',
    'app/*.html'
    ]).pipe(gulp.dest('dist'));

  // JS
  gulp.src([
    'app/js/**/*.js',
    ]).pipe(gulp.dest('dist/js'));

  // Styles
  gulp.src([
    'app/css/**/*.css',
    ]).pipe(gulp.dest('dist/css'));

  // Fonts
  gulp.src([
    'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));

  // Libs
  gulp.src([
    'app/libs/**/*',
    ]).pipe(gulp.dest('dist/libs'));

  // Images
    gulp.src([
    'app/img/**/*',
    ]).pipe(gulp.dest('dist/img'));

});


gulp.task('buildClean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

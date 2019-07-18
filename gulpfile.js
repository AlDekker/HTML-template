//Settings
var baseFolder = 'app';

//Plugins
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
    rename        = require('gulp-rename'),
    svgSprite     = require('gulp-svg-sprite'),
    svgmin        = require('gulp-svgmin'),
    cheerio       = require('gulp-cheerio'),
    replace       = require('gulp-replace');


//Styles
gulp.task('sass', function(){
  return gulp.src(baseFolder+'/sass/**/*.sass')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 15 versions']
  }))
  .pipe(minCss())
  .pipe(rename({ suffix: ".min" })) 
  .pipe(gulp.dest(baseFolder+'/css'))
  .pipe(browserSync.reload({stream: true}))
});

//Scripts
gulp.task('js', function(){
  return gulp.src([
    baseFolder+'/libs/jquery/jquery.min.js',
    baseFolder+'/js/common.js'
  ])
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest(baseFolder+'/js'))
  .pipe(browserSync.reload({stream: true}))
});

//Images
gulp.task('images', function(){
  return gulp.src(baseFolder+'/img/**/*.{png,jpg,jpeg,webp,raw,svg}')
  .pipe(browserSync.reload({ stream: true }))
});

//SVG
gulp.task('svg', function(){
  return gulp.src(baseFolder+'/img/icons/svg/*.svg')
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
  }))
  .pipe(replace('&gt;', '>'))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: "sprite.svg"
      }
    }
  }))
  .pipe(gulp.dest(baseFolder+'/img/icons/svg/'))
});

//HTML
gulp.task('html', function() {
	return gulp.src(baseFolder+'/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

//BrowserSync
gulp.task('browserSync' , function(){
  browserSync({
    server: {
      baseDir: baseFolder
    },
    notify: false,
    // tunnel: true,
    // tunnel: "sstr"
  });
});

//Watch
gulp.task('watch', function(){
  gulp.watch(baseFolder+'/sass/**/*.sass', gulp.parallel('sass'));
  gulp.watch([baseFolder+'/js/**/*.js', '!'+baseFolder+'/js/*.min.js',], gulp.parallel('js'));
  gulp.watch(baseFolder+'/img/**/*', gulp.parallel('images'));
  gulp.watch(baseFolder+'/img/icons/svg/*.svg', gulp.parallel('svg'));
  gulp.watch(baseFolder+'/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('watch', 'sass', 'js', 'images', 'svg', 'browserSync'));



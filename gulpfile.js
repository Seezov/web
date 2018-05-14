'use strict'

const gulp = require('gulp')
const scss = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const htmlMin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')

const config = {
  mainStyleFile: './app/sass/main.scss',
  outputStyles: './dist/styles',
  entryHtml: './app/**/*.html',
  entryScripts: './app/scripts/*.js',
  outputScripts: './dist/scripts/',
  entryImages: './app/images/*',
  outputImages: './dist/images',
  entryStyles: './app/sass/**/*.scss',
  libsStyles: [
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],
  libsScripts: [
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
  ]
}

function handleError (err) {
  console.log(err.toString())
}

// // bundle js
// function bundleJS (bundler) {
//   return bundler.bundle()
//     .pipe(source('app.js'))
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(uglify())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(config.outputScripts))
// }

// scripts
gulp.task('js', () => {
  gulp.src(config.entryScripts)
       .pipe(gulp.dest(config.outputScripts))
})

gulp.task('styles', () => {
  return gulp.src(config.mainStyleFile)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({browsers: ''}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.outputStyles))
})
gulp.task('html', () => {
  return gulp.src(config.entryHtml)
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
})
gulp.task('images', () => {
  return gulp.src(config.entryImages)
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.outputImages))
})
gulp.task('bundleStyles', () => {
  return gulp.src(config.libsStyles)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(sourcemaps.init())
    .pipe(concat('libs.css'))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.outputStyles))
})

gulp.task('bundleJs', () => {
  return gulp.src(config.libsScripts)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(sourcemaps.init())
    .pipe(concat('libs.js'))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.outputScripts))
})
gulp.task('watch', () => {
  runSequence(
   ['html', 'images'],
   ['bundleStyles', 'bundleJs'],
   ['styles', 'js'],
   'browserSync',
   () => {
     gulp.watch(config.entryStyles, ['styles'])
     gulp.watch(config.entryHtml, ['html'])
     gulp.watch(config.entryScripts, ['js'])
     gulp.watch(config.entryImages, ['images'])
   })
})
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './dist'
    },
    port: 2718,
    open: true,
    notify: false
  })
})

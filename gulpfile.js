const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const stylelint = require('gulp-stylelint');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');

function lint() {
  return gulp.src([
    './_assets/js/components/_formcarry.js',
    './_assets/js/components/_infiniteScroll.js',
    './_assets/js/components/_mailChimp.js',
    './_assets/js/components/_miscellaneous.js',
    './_assets/js/components/_pageTransition.js',
    './_assets/js/components/_popup.js',
    './_assets/js/_inits.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function scripts() {
  return browserify('./_assets/js/app.js')
    .transform('babelify', {presets: ['@babel/preset-env']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/js'));
}

function dist() {
  return gulp.src([
    './**',
    '!./.DS_Store',
    '!./.git',
    '!./node_modules/**'
  ])
    .pipe(zip('barber-jekyll.zip'))
    .pipe(gulp.dest('../'))
}

function watch() {
  //gulp.watch('./_assets/scss/**/*.scss', styles);
  gulp.watch('./_assets/js/**/*.js', scripts);
}

const build = gulp.series(scripts, watch);
gulp.task('default', build);

//exports.lintStyles = lintStyles;
//exports.styles = styles;
exports.lint = lint;
exports.scripts = scripts;
exports.dist = dist;

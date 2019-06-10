const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const env = process.env.NODE_ENV;


sass.compiler = require('node-sass');

task('clean', () => {
  return src('./dist/**/*', { read: false })
    .pipe(rm())
});

task('copy:html', () => {
  return src('./*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }))
});

const styles = [
  './node_modules/normalize.css/normalize.css',
  './entry.scss'

];

task('styles', () => {
  return src(styles)
    .pipe(gulpIf(env === 'dev', sourcemaps.init()))
    .pipe(concat('entry.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(gulpIf(env === 'dev', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })
    )
    )

    .pipe(gulpIf(env === 'prod', cleanCss()))
    .pipe(gulpIf(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});

task('images', () => {
  return src('images/**/*.*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
        {
          removeViewBox: true
        }
      ]
    }))
    .pipe(dest('dist/images'))
    .pipe(reload({ stream: true }));
});




task('scripts', () => {
  return src('./script.js')
    .pipe(gulpIf(env === 'dev', sourcemaps.init()))
    .pipe(concat('script.js', { newLine: ";" }))
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulpIf(env === 'prod', uglify()))
    .pipe(gulpIf(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: false
  });
});

task('watch', () => {
  watch('./*.html', series('copy:html')),
    watch('./css/**/*.scss', series('styles')),
    watch('./js/*.js', series('scripts')),
    watch('./images/**/*.*', series('images'))
});



task('default',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'images'),
    parallel('watch', 'server'))
);
task('build',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'images'),

  )
);


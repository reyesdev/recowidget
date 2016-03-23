// Include gulp
var gulp = require('gulp'),
// Include Our Plugins
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');
    mmq = require('gulp-merge-media-queries'),
    notify = require('gulp-notify');
    livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('styles', function() {
    return sass('./src/**/*.scss', { style: 'expanded' })
        .pipe(sourcemaps.init())
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload())
        .pipe(notify({ message: 'Styles task complete' }));
});

// Merge Media Queries
// gulp.task('mmq', function () {
//     return gulp.src('./dist/**/*.css')
//     .pipe(mmq({
//       log: true
//     }))
//     .pipe(gulp.dest('./dist/css/'))
//     .pipe(livereload())
//     .pipe(notify({ message: 'Merge complete' }));
// });

//Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload())
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['lint', 'scripts'])
    gulp.watch('src/**/*.scss', ['styles'])
    // gulp.watch('src/**/*.css', ['mmq'])
      // Create LiveReload server
  livereload.listen()
  // Watch any files in dist/, reload n change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['lint', 'styles',  'scripts', 'watch']); //'mmq',
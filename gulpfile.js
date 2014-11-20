var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var cp = require('child_process');
var runSequence = require('run-sequence');


//////////////////////////////
// Sass compile Task
//////////////////////////////
gulp.task('sass', function() {
  return gulp.src('_sass/style.scss')
    .pipe($.compass({
      config_file: './config.rb',
      css: 'css',
      sass: '_sass',
      bundle_exec: true,
      time: true
    }))
    .pipe($.autoprefixer("last 2 versions", "> 1%"))
    .pipe(gulp.dest('css'));
});

//////////////////////////////
// Jekyll Tasks
//////////////////////////////
gulp.task('jekyll-build', function (done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll', ['jekyll-build']);


//////////////////////////////
// Publishing Task
//////////////////////////////
gulp.task('gh-pages', function () {
  return gulp.src("./_site/**/*")
    .pipe($.ghPages());
});



//////////////////////////////
// Deploy Task
//////////////////////////////
gulp.task('deploy', function(cb) {
  return runSequence(
    'sass',
    'jekyll-build',
    'gh-pages',
    cb
  );
});

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat');

var paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  scripts: 'app/**/*.js'
};

gulp.task('nodemon', function () {
  nodemon({ script: './app/server.js', ext: 'js', ignore: ['public/**','app/**','node_modules/**'] })
    .on('restart', function () {
      console.log('>> node restart');
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.public, ['public']);
});


gulp.task('styles', function () {
    gulp
    .src(paths.styles)
    .pipe(stylus({
        paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./public/css'));
});


gulp.task('nodemon', ['nodemon']);
gulp.task('default', ['nodemon', 'watch']);

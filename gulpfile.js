var gulp = require("gulp");
var jade = require("gulp-jade");
var sass = require("gulp-sass");
var jshint = require("gulp-jshint");
var jasmine = require("gulp-jasmine");

gulp.task("lint", function(){
  return gulp.src("./client/**/*.js")
  .pipe(jshint())
  .pipe(jshint.reporter("default"));
});

gulp.task("jade", function(){
  return gulp.src(["./client/**/*.jade", "./client/*.jade"])
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest(function(file){
    return file.base;
  }));
});

gulp.task("test", function(){
  return gulp.src("./spec/test.js")
    .pipe(jasmine({
      verbose: true
    }))
});

gulp.task("sass", function(){
  return gulp.src("./client/styles/style.scss")
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest("./client/styles"));
  });

gulp.task("watch", function(){
  gulp.watch(["./client/**/*/js", "./client/*.js"], ["lint"])
})

gulp.task("default", ["lint", "jade", "watch"], function(){
  "gulp says hi"
});

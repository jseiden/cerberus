var gulp = require("gulp");
var jade = require("gulp-jade");
var jshint = require("gulp-jshint");

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

gulp.task("watch", function(){
  gulp.watch(["./client/**/*/js", "./client/*.js"], ["lint"])
})

gulp.task("default", ["lint", "jade", "watch"], function(){
  "gulp says hi"
})
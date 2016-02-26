var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');


//CSS
// gulp.task('minCss',function(){ 
//     gulp.src('./src/sass/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./src/css/'))
//     .pipe(concat('build.css'))
//     .pipe(minifycss())
//     .pipe(gulp.dest('./dist/css/'));
// });

//CSS
gulp.task('minCss',function(){ 
    gulp.src('./src/css/*.css')
    .pipe(concat('build.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css/'));
});

//JS
gulp.task('minScript',function(){ 
    gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

//Images
gulp.task('minImages',function(){ 
     gulp.src('./src/images/*')
     .pipe(imagemin({ 
         progressive:true,
         use:[pngquant({ quality: '65-80' })]
     }))
     .pipe(gulp.dest('./dist/images/'));
});
//html
gulp.task('minHtml',function(){ 
     gulp.src('./src/*.html')
     .pipe(minifyhtml())
     .pipe(gulp.dest('./dist/'));
});

gulp.task('watch',function(){   
   gulp.watch('./src/sass/*.scss',['minCss']);
   gulp.watch('./src/js/*.js',['minScript']);
   gulp.watch('./src/images/*',['minImages']);
});

gulp.task('default',function(){ 
  gulp.start('minCss','minImages','minScript','minHtml');
});
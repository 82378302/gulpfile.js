var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');


//sass
gulp.task('minCss',function(){ 
    gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'))
    .pipe(concat('build.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css/'));
});

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

/*gulp config*/

const gulp = require('gulp');
const minifyhtml = require('gulp-minify-html');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

//html
gulp.task('html',() => { 
 return gulp.src('./src/*.html')
            .pipe(minifyhtml())
            .pipe(gulp.dest('./dist/'))
})
//css
gulp.task('css',() => { 
   return gulp.src('./src/css/*.css')
              .pipe(minifycss())
              .pipe(gulp.dest('./dist/css/'))
})

//serve服务器;
gulp.task('serve',() => { 
   browserSync({ 
      server:{ 
        baseDir:'src'
      }
   });
   gulp.watch('./src/*.html',['html']).on('change',reload); 
   gulp.watch('./src/*.css',['css']).on('change',reload);
})

//默认default;
gulp.task('default',() =>{ 
    gulp.start('serve') 
})









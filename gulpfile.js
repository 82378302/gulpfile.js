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









/*详细写法*/
// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});

// 样式处理
gulp.task('css', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';

    gulp.src(cssSrc)
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
})

// js处理
gulp.task('js', function () {
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
        })

        // 监听css
        gulp.watch('./src/scss/*.scss', function(){
            gulp.run('css');
        });

        // 监听images
        gulp.watch('./src/images/**/*', function(){
            gulp.run('images');
        });

        // 监听js
        gulp.watch('./src/js/*.js', function(){
            gulp.run('js');
        });

    });
});












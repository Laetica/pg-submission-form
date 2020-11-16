var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    compass = require('compass-importer'),
    minifyCSS = require('gulp-minify-css');

var jsSourceFiles = "../assets/src/js",
    jsOutputDirectory = "../assets/dist/js";

var imgSourceFiles = "../assets/src/images",
    imgOutputDirectory = "../assets/dist/images";

var cssSourceFiles = "../assets/src/scss",
    cssOutputDirectory = "../assets/dist/css";

gulp.task('compass-main', function (done) {
    gulp.src([
        cssSourceFiles + "/**/*.scss",
        "!" + cssSourceFiles + "/libraries/**/*.scss",
        "!" + cssSourceFiles + "/libraries.scss"
    ])
    .pipe(sass({importer: compass}).on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(cssOutputDirectory));
    if(done) done();
});


//not used
gulp.task('compass-libraries', function () {
    gulp.src([
        cssSourceFiles + "/libraries.scss"
    ])
    .pipe(sass({importer: compass}).on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('libraries.min.css'))
    .pipe(gulp.dest(cssOutputDirectory));
});




gulp.task('uglify-libraries', function (done) {
    gulp.src([
        jsSourceFiles + '/libraries/jquery.min.js',
        jsSourceFiles + "/libraries/**/*.js"
    ])
        .pipe(uglify())
        .pipe(concat('libraries.min.js'))
        .pipe(gulp.dest(jsOutputDirectory));
    if(done) done();
});

gulp.task('uglify-main', function (done) {
    gulp.src([
        jsSourceFiles + "/main.js",
        jsSourceFiles + "/component/*.js",
        "!" + jsSourceFiles + "/libraries/**/*.js"
    ]) // path to your files
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(jsOutputDirectory));
    if(done) done();
});




gulp.task('imagemin', function (done) {
    gulp.src(imgSourceFiles + '/*')
        .pipe(imagemin())
        .pipe(gulp.dest(imgOutputDirectory))
    if(done) done();
});




gulp.task('watch', function() {
    return gulp.watch([jsSourceFiles + "/**/*.js", imgSourceFiles + "/*", cssSourceFiles + "/**/*.scss"],
        gulp.series(gulp.parallel('uglify-libraries', 'uglify-main', 'imagemin', 'compass-main'))
    );
});


gulp.task('default', gulp.series (gulp.parallel('uglify-libraries', 'uglify-main', 'imagemin', 'compass-main'),
    function (done) { done(); }
));

//
// gulp.task('default', function() {
//     gulp.start('uglify-libraries', 'uglify-main', 'imagemin', 'compass-main');
// });













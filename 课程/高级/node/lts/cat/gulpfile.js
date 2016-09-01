/**
 * Created by Administrator on 2016/8/31.
 */
var gulp=require('gulp'),
    less=require('gulp-less'),
    cssmin=require('gulp-minify-css'),
    uglify=require('gulp-uglify');

/*css*/
gulp.task('cssmins',
    function(){
        gulp.src('src/dist/*.less')
            .pipe(less())
            .pipe(cssmin())
            .pipe(gulp.dest('public/stylesheets'))
    }
);

/*js*/

gulp.task('jsmin',function(){
    gulp.src(['src/js/**.js','!src/js/**/{test1,test2}.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
});



/*watch*/
gulp.task('csswatch',function(){
    gulp.watch('src/**/*.less',['cssmins']);
});
gulp.task('jswatch',function(){
    gulp.watch('src/js/*.js',['jsmin']);
})
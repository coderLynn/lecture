/**
 * Created by Administrator on 2016/8/31.
 */
var gulp=require('gulp'),
    concat=require('gulp-concat'),
    less=require('gulp-less'),
    /*把less->css*/
    cssmin=require('gulp-minify-css'),
    /*压缩成一行*/
    uglify=require('gulp-uglify'),
    /*js压缩*/
    rev=require('gulp-rev');
    /*对文件加密*/
/*css*/
gulp.task('cssmins',
    function(){
        gulp.src('src/dist/*.less')
            .pipe(less())
            .pipe(cssmin())
//            .pipe(rev())
            .pipe(gulp.dest('public/stylesheets'))
    }
);

/*js*/

gulp.task('jsmin',function(){
    gulp.src(['src/js/*.js','!src/js/**/{test1,test2}.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
});



/*watch*/
gulp.task('default',function(){
    gulp.run('cssmins','jsmin');
    gulp.watch('src/dist/*.less',['cssmins']);
    gulp.watch('src/js/*.js',['jsmin']);
});

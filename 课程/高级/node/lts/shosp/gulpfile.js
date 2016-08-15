/**
 * Created by 未来之光培训，全部课程免费，直到学员薪资上万为止！
 官方授课群：424734136 on 2016/8/15.
 */
var gulp=require('gulp'),
    less=require('gulp-less'),
    cssmin=require('gulp-minify-css');
/*样式*/
gulp.task('testless',function(){
    gulp.src('dist/style/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('public/stylesheets'));
});
/*watch*/
gulp.task('testwatch',function(){
    gulp.watch('dist/**/*.less',['testless']);
});

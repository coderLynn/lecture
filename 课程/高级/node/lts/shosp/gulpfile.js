/**
 * Created by δ��֮����ѵ��ȫ���γ���ѣ�ֱ��ѧԱн������Ϊֹ��
 �ٷ��ڿ�Ⱥ��424734136 on 2016/8/15.
 */
var gulp=require('gulp'),
    less=require('gulp-less'),
    cssmin=require('gulp-minify-css');
/*��ʽ*/
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

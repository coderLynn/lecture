/**
 * Created by Administrator on 2016/9/3.
 */
var mongodb=require('./db');

function blogs(title,content){
    this.title=title;
    this.content=content;
}



module.exports =blogs;

blogs.prototype={
    save:function(callback){
        var date=new Date();
        var time={
            date:date,
            year:date.getFullYear(),
            month:date.getFullYear()+'-'+(date.getMonth()+1),
            day:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            minute:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+''+date.getHours()+':'+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
        }
    /*数据库存储对象*/
        var blog={
            title:this.title,
            content:this.content,
            time:time
        }
        /*打开数据库*/
        mongodb.open(function(err,db){
            /*错误*/
            if(err){
                return callback(err);
            }
            /*打开blogs集合*/
            db.collection('blogs',function(err,collection){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                /*写入集合*/
                collection.insert(blog,{safe:true},function(err){
                    return callback(err);
                });
                callback(null);
            });
        });
    }
};


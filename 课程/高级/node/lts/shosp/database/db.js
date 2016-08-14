/**
 * Created by tt on 2016/8/14.
 */
var mongoose=require("mongoose");
var db=mongoose.connect('mongodb://127.0.0.1:27017/lts');//连接数据库
console.log("数据库"+db);
var Schema=mongoose.Schema;//创建模型
var useraScheMa=new Schema({
    name:String,
    password:String
});

exports.user=db.model('users',useraScheMa);


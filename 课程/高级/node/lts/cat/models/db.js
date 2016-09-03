/**
 * Created by Administrator on 2016/9/1.
 */
var setting=require('../settings'),
    Db=require('mongodb').Db,
    Connection=require('mongodb').Connection;
    Server=require('mongodb').Server;
/*创建数据库连接*/
module.exports=new Db(setting.db,new Server(setting.host,27017),{safe:true});
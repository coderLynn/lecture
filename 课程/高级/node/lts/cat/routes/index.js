var express = require('express');
var router = express.Router();


module.exports =function(app){
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    /*博客发布*/
    app.get('/add',function(req,res,next){
        res.send('博客发布');
    });
    app.post('/addBlog',function(req,res,next){
        res.send("博客发布成功!");
    });
    /*修改博客*/
    app.get('/edit',function(req,res,next){
        res.send("修改博客");
    });
};

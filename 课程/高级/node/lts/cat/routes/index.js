var express = require('express');
var router = express.Router();
var blogs=require('../models/blogs.js');

module.exports =function(app){

    app.get('/', function(req, res, next) {
        res.render('index', { title: '未来之光博客系统' });
    });
    /*博客发布*/
    app.get('/add',function(req,res,next){
        res.render('addblogs',{title:'添加博客文章'});
        res.send('博客发布');
    });
    app.post('/addBlog',function(req,res,next){
        blogs=new blogs(req.body.titles,req.body.contents);
        blogs.save(function(err,data){
            req.flash('error', err);
            res.send(data);
        });
    });
    /*修改博客*/
    app.get('/edit',function(req,res,next){
        res.send("修改博客");
    });
};

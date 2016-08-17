var express = require('express');
var router = express.Router();
var fs=require('fs');
var user=require('../database/db').user;
/* GET home page. */
router.get('/', function(req, res, next) {
    var JsonObj=JSON.parse(fs.readFileSync('/index.json'));
    console.log(JsonObj);
    res.render('index', { title: '未来之光', project:JsonObj.a});
});

router.get('/login', function(req, res, next) {
    res.render('user/login', { login: '登录' });
});
router.post('/loginAction',function(req,res){
    console.log(req.body.user);
    console.log(user);
    var query_doc = {name: req.body.user, password: req.body.pass};
    console.log(query_doc);
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.name + ": login success in " + new Date());
                res.render('user/loginAction', { title:"登陆成功！" });
            }else{
                console.log(err);
                console.log(query_doc.name + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});
router.get('/reg', function(req, res, next) {
    res.render('user/register', { reg: '注册' });
}).post('/regAction',function(req,res,next){
    var reg_qurey={name:req.body.user,password:req.body.pass,repass:req.body.repass};
    console.log(reg_qurey);
    (function(){
        user.find(reg_qurey,function(err,obj){
            if(obj.length==0){

            }
        })
    })(reg_qurey);
});


router.get('/video', function(req, res, next) {
    res.render('video', { title: '视频播放列表' });
});

router.get('/videos', function(req, res, next) {
    res.render('videos', { title: '视频播放页面' });
});


module.exports = router;

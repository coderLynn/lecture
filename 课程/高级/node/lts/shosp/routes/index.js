var express = require('express');
var router = express.Router();
var fs=require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
    var JsonObj=JSON.parse(fs.readFileSync('/index.json'));
    console.log(JsonObj);
    res.render('index', { title: '未来之光', project:JsonObj.a});

});

router.get('/login', function(req, res, next) {
    res.render('user/login', { login: '登录' });
});

router.get('/reg', function(req, res, next) {
    res.render('user/register', { reg: '注册' });
});


router.get('/video', function(req, res, next) {
    res.render('video', { title: '视频播放列表' });
});

router.get('/videos', function(req, res, next) {
    res.render('videos', { title: '视频播放页面' });
});


module.exports = router;

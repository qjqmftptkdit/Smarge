var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: './public/upload'});

// 세션 등록
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var config = require("./func/config");
var options = {
    host: config.host,
    port: 3306,
    user: config.user,
    password: config.password,
    database: 'smarge'
};
var sessionStore = new MySQLStore(options);
app.use(session({
    key: 'SMARGE_SESSION',
    secret: 'qjqmftptkdit',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

// 미들웨어 등록
app.use(bodyParser.json());  // Json 파싱
app.use(bodyParser.urlencoded({ extended: true })); // POST 파싱
app.use(express.static('public')); // 정적파일 세팅

require('./router/init')(app, upload); // 라우터 초기화

// 404 에러 처리
app.use(function(req, res, next){
    res.status(404);
    res.redirect("/error?error=2")
});

app.listen(3000, function(){
    console.log("Express server has started on port 3000");
}); // express 서버 구동
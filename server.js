var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

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

app.use(bodyParser.json()); 
app.use(upload.array()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); // 정적파일 세팅

require('./router/init')(app); // 라우터 초기화

app.listen(3000, function(){
    console.log("Express server has started on port 3000");
}); // express 서버 구동
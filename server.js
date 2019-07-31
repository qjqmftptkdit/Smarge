var express = require('express');
var app = express();

require('./router/init')(app); // 라우터 초기화

app.listen(3000, function(){
    console.log("Express server has started on port 3000");
}); // express 서버 구동

app.use(express.static('public')); // 정적파일 세팅
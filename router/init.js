// 라우터 초기화
module.exports = function(app)
{
    require('./main')(app); // 메인 홈페이지 라우터 초기화
    require('./signup')(app); // 회원가입 페이지 라우터 초기화
}
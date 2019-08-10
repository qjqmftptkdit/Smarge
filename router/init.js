// 라우터 초기화
module.exports = function(app, upload)
{
    require('./signup')(app); // 회원가입 페이지 라우터 초기화
    require('./emailValidation')(app); // 이메일 확인 라우터 초기화
    require('./login')(app); // 로그인 페이지 라우터 초기화
    require('./destroySession')(app); // 세션 삭제 라우터 초기화
    require('./myImage')(app); // 계정별 이미지 확인 라우터 초기화
    require('./error')(app); // 에러 알림 라우터 초기화
    require('./uploadImage')(app, upload); // 이미지 업로드 라우터 초기화
    require('./editImage')(app); // 이미지 편집 라우터 초기화
    require('./showImage')(app); // 이미지 공개 라우터 초기화
    require('./accountSetting')(app); // 계정 설정 라우터 초기화
    require('./deleteAccount')(app); // 계정 삭제 라우터 초기화
    require('./showSharedImage')(app); // 커뮤니티에 공개된 이미지 상세정보 라우터 초기화
    require('./main')(app); // 메인 홈페이지 라우터 초기화
}
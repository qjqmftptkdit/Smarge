// 회원가입 페이지 라우터 초기화
module.exports = function(app)
{
    app.use('/signup',function(req,res){

        // 디폴트 로그
        var log = '<br><input id="signinButton" name="submit" type="submit" value="회원가입">';
        var log2 = `<input class="in" name="username" type="text" placeholder="유저이름"> 
        <input class="in" name="email" type="text" placeholder="이메일"> 
        <input class="in" name="password" type="password" placeholder="비밀번호"> 
        <input class="in" name="password_check" type="password" placeholder="비밀번호확인"> `;
        var title = "회원가입";

        // post요청인 경우
        if(req.method == 'POST')
        {
            var result = (new (require('../func/checkSignup'))(req.body)).check() ; // 입력값 확인
            if (result == "OK") // 검증을 통과함 
            {
                // 이메일 인증 난수 및 salt 난수
                req.body.checkCode = require('../func/tools').getSecureRandomVal();
                req.body.salt = require('../func/tools').getSecureRandomVal();
                // 데이터베이스에 새로운 계정을 추가시킨다.
                (new (require('../func/sqlManager'))).saveNewAccount(req.body);
                // 이메일 인증 메일을 전송시킨다.
                (new (require('../func/emailValidation'))).sendValidationEmail(req.body.checkCode, req.body.email);

                // 이메일 인증
                log = '';
                log2 = `<p style="color:blueviolet;"><STRONG>>${req.body.email}<<br>으로 인증메일을 보냈습니다 !
                <br>메일 확인후, 인증링크를 클릭하시면 인증이 완료됩니다.</STRONG></p>
                <p><a href="/">메인으로 돌아가기</a></p>`;
                title = '메일인증';
            }
            else 
            {
                log = `
                <p style="color: red;"><STRONG>>${result}<</STRONG></p>
                <br><input id="signinButton" type="submit" value="회원가입" style="top:-20px">          
                ` 
            }
        }

        var lis = `
<!DOCTYPE html>
<html>
        
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>siginup</title>
    <link rel="stylesheet" type="text/css" href="/css/signup.css" />

</head>
        
<body>
    <div>
            <a href="/"><img src="/source/logo.png" id="logo"></a>
    </div>
        
    <div id="center">
            <p> <STRONG>${title}</STRONG> </p>
            <form action"/signup" method="POST">
                ${log2} 
                ${log}
            </form>
    </div>
</body>
        
</html>
        `;
        res.send(lis);
    });
}
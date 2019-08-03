// 로그인 페이지 라우터 초기화
module.exports = function(app)
{
    app.use('/login',function(req,res){

        // 디폴트 로그
        var log = '<br><input id="signinButton" type="submit" value="로그인" style="left:200px; top:150px">';

        // post요청인 경우
        if(req.method == 'POST')
        {
            var result = (new (require('../func/checkLogin'))(req.body)).check() ; // 입력값 확인
            if (result == "OK") // 검증을 통과함 
            {
                // 로그인 검증
                (new (require('../func/sqlManager'))).verifyLogin(req.body.email, req.body.password, req, res);
                return ;
            }
            else
            {
                log = `<p style="color: red; position: relative; top:50px;"><STRONG>>${result}<</STRONG></p> 
                <br><input id="signinButton" type="submit" value="로그인" style="left:200px; top:49px;"> `
            }
        }

        // 추가적인 에러처리
        if(req.query.error)
        {
            result = '';
            if(req.query.error == 1)
            {
                result = "패스워드가 일치하지 않습니다 !";
            }
            if(req.query.error == 2)
            {
                result = "인증되지 않은 이메일 입니다 !";
            }
            log = `<p style="color: red; position: relative; top:50px;"><STRONG>>${result}<</STRONG></p> 
            <br><input id="signinButton" type="submit" value="로그인" style="left:200px; top:49px;"> `
        }

        var lis = `
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>login</title>
    <link rel="stylesheet" type="text/css" href="/css/signup.css" />
</head>

<body>
    <div>
            <a href="/"><img src="/source/logo.png" id="logo"></a>
    </div>

    <div id="center">
            <p> <STRONG>로그인</STRONG> </p>
            <form action"/login" method="POST"> 
                <input class="in" name="email" type="text" placeholder="이메일" style="top:30px"> 
                <input class="in" name="password" type="password" placeholder="비밀번호" style="top:30px">   
                ${log}
            </form>
    </div>
</body>

</html>
        `;
        res.send(lis);
    });
}
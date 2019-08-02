// 회원가입 페이지 라우터 초기화
module.exports = function(app)
{
    app.use('/signup',function(req,res){

        var log = '<br><input id="signinButton" name="submit" type="submit" value="회원가입">';

        // post요청인 경우
        if(req.method == 'POST')
        {
            var result = (new (require('../func/checkSignup'))(req.body)).check() ; // 입력값 확인
            if (result == "OK") 
            {
                console.log("OK");
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
            <p> <STRONG>회원가입</STRONG> </p>
            <form action"/signup" method="POST">
                <input class="in" name="username" type="text" placeholder="유저이름"> 
                <input class="in" name="email" type="text" placeholder="이메일"> 
                <input class="in" name="password" type="text" placeholder="비밀번호"> 
                <input class="in" name="password_check" type="text" placeholder="비밀번호확인">  
                ${log}
            </form>
    </div>
</body>
        
</html>
        `;
        res.send(lis);
    });
}
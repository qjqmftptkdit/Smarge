// 회원가입 페이지 라우터 초기화
module.exports = function(app)
{
    app.get('/signup',function(req,res){
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
            <form>
                <input class="in" type="text" placeholder="유저이름"> 
                <input class="in" type="text" placeholder="이메일"> 
                <input class="in" type="text" placeholder="비밀번호"> 
                <input class="in" type="text" placeholder="비밀번호확인">  
                <br><input id="signinButton" type="submit" value="회원가입">
            </form>
    </div>
</body>
        
</html>
        `;
        res.send(lis);
    });
}
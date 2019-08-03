// 로그인 페이지 라우터 초기화
module.exports = function(app)
{
    app.use('/login',function(req,res){
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
            <form> 
                <input class="in" type="text" placeholder="이메일" style="top:30px"> 
                <input class="in" type="text" placeholder="비밀번호" style="top:30px">   
                <br><input id="signinButton" type="submit" value="로그인" style="left:200px; top:150px">
            </form>
    </div>
</body>

</html>
        `;
        res.send(lis);
    });
}
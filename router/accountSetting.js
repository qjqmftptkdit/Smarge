// 계정 설정 라우터 초기화
module.exports = function(app)
{
    app.use('/accountSetting',function(req,res){
        // 세션이 존재하지 않을 경우
        if(!req.session.user)
        {
            res.redirect("/error?error=1");
            return;
        }

        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>myImage</title>
    <link rel="stylesheet" type="text/css" href="/css/myImage.css" />
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>
<div id=topI>
    <a href="/accountSetting" style="color:cornflowerblue"><font size=5><STRONG><U>계정설정</U></STRONG></font></a>
    <font size=5><STRONG>/</STRONG></font>
    <a href="/destroySession"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>
    </div>
</div>

<div id="center">
    <form action="/" method="POST">
        <li style="font-size: x-large"> 유저이름 : <input type="text" size="50" placeholder="유저이름" style="font-size: x-large" name="username"> <input type="submit" value="변경하기"> </li> <br>
        <li style="font-size: x-large"> 이메일 : aaa@gmail.com </li> <br>
        <li style="font-size: x-large"> 이메일 인증여부 : 인증됨 </li> <br>
        <li style="font-size: x-large"> 현재 패스워드 : <input type="text" size="50" placeholder="현재 패스워드" style="font-size: x-large" name="password_current"> </li> <br>
        <li style="font-size: x-large"> 변경할 패스워드 : <input type="text" size="50" placeholder="변경할 패스워드" style="font-size: x-large" name="password_change"> </li> <br>
        <li style="font-size: x-large"> 재입력 : <input type="text" size="50" placeholder="재입력" style="font-size: x-large" name="password_change_r"> <input type="submit" value="변경하기"> </li> <br>
    </form>
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}
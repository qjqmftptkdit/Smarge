// 계정 삭제 라우터 초기화
module.exports = function(app)
{
    app.use('/deleteAccount',function(req,res){
        // 세션이 존재하지 않을 경우
        if(!req.session.user)
        {
            res.redirect("/error?error=1");
            return;
        }

        var log = '';
        // post요청인 경우
        if(req.method == 'POST')
        {
            var result = (new (require('../func/deleteAccount'))(req.body)).check();
            if(result == "OK")
            {
                (new (require('../func/sqlManager'))).deleteAccount(req.body.password, req.session.user.email, res);
                return;
            }
            else
            {
                log = `<p style="color: red; font-size: x-large"><STRONG>${result}</STRONG></p>`;
            }
        }

        // 추가적인 로그처리
        if(req.query.log)
        {
            if(req.query.log == 1)
            {
                log = `<p style="color: red; font-size: x-large"><STRONG>현재 패스워드가 일치하지 않습니다 !</STRONG></p>`;
            }
        }

        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>myImage</title>
    <link rel="stylesheet" type="text/css" href="/css/myImage.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/myImage.js"></script>
    </script>
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>
<div id=topI>
    <a href="/accountSetting" style="color:blueviolet" id="link1"><font size=5><STRONG><U>계정설정</U></STRONG></font></a>
    <font size=5><STRONG>/</STRONG></font>
    <a href="/deleteAccount" style="color:orange"><font size=5><STRONG><U>계정삭제</U></STRONG></font></a>
    <font size=5><STRONG>/</STRONG></font>
    <a href="/destroySession" style="color:blueviolet" id="link2"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>
    </div>
</div>

<div id="center">
    <form action="/deleteAccount" method="POST">
        <p style="color: red; font-size: x-large"><STRONG>계정을 삭제할 경우, 복구가 불가능하며, 모든 계정 정보와 올렸던 이미지가 삭제됩니다 !</STRONG></p>
        <li style="font-size: x-large"> 패스워드 : <input type="password" size="50" placeholder="패스워드" style="font-size: x-large" name="password"> <input type="submit" value="계정삭제" style="font-size: x-large"> </li>
    </form>
    ${log}
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}
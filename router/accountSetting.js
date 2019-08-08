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

        // 유저 정보를 로드한다.
        var result = (new (require('../func/sqlManager'))).getUserInfo(req.session.user.username);
        var username = result[0].user_name;
        var email = result[0].user_email;
        var userAb = (parseInt(result[0].user_available) == 0) ? "인증되지 않음" : "인증됨";

        var Log = '';
        var errorLog = '';

        // post요청인 경우
        if(req.method == 'POST')
        {
            // 유저 이름 변경에 대한 요청인 경우
            if(req.body.editUsername)
            {
                errorLog = (new (require('../func/checkAccountSetting'))(req.body)).check_username() ;
                if(errorLog == "OK")
                {
                    (new (require('../func/sqlManager'))).editUsername(username, req.body.username);
                    req.session.user = {
                        "username" : req.body.username,
                        "email" : email
                    }
                    username = req.body.username
                    Log = `<p style="color: blue; font-size: x-large"><STRONG>유저이름을 성공적으로 수정했습니다 !</STRONG></p>`
                }
                else
                {
                    Log = `<p style="color: red; font-size: x-large"><STRONG>${errorLog}</STRONG></p>`
                }
            } // 패스워드 변경에 대한 요청인 경우
            else if(req.body.editPassword)
            {
                errorLog = (new (require('../func/checkAccountSetting'))(req.body)).check_password() ;
                if(errorLog == "OK")
                {
                    (new (require('../func/sqlManager'))).editPassword(req.session.user.email, req.body.password_current, req.body.password_change, res);
                    return ;
                }
                else
                {
                    Log = `<p style="color: red; font-size: x-large"><STRONG>${errorLog}</STRONG></p>`
                }
            }
        }

        // 추가적인 로그처리
        if(req.query.log)
        {
            if(req.query.log == 1)
            {
                Log = `<p style="color: red; font-size: x-large"><STRONG>현재 패스워드가 일치하지 않습니다 !</STRONG></p>`;
            }
            if(req.query.log == 2)
            {
                Log = `<p style="color: blue; font-size: x-large"><STRONG>패스워드를 성공적으로 수정했습니다 !</STRONG></p>`
            }
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
    <form action="/accountSetting" method="POST">
        <li style="font-size: x-large"> 유저이름 : <input type="text" size="50" placeholder="유저이름" style="font-size: x-large" name="username" value=${username}> <input type="submit" value="변경하기" name="editUsername"> </li> <br>
        <li style="font-size: x-large"> 이메일 : ${email} </li> <br>
        <li style="font-size: x-large"> 이메일 인증여부 : ${userAb} </li> <br>
        <li style="font-size: x-large"> 현재 패스워드 : <input type="password" size="50" placeholder="현재 패스워드" style="font-size: x-large" name="password_current"> </li> <br>
        <li style="font-size: x-large"> 변경할 패스워드 : <input type="password" size="50" placeholder="변경할 패스워드" style="font-size: x-large" name="password_change"> </li> <br>
        <li style="font-size: x-large"> 재입력 : <input type="password" size="50" placeholder="재입력" style="font-size: x-large" name="password_change_r"> <input type="submit" value="변경하기" name="editPassword"> </li> <br>
    </form>
    ${Log}
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}
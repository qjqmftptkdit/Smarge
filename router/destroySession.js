// 세션 삭제 라우터 초기화
module.exports = function(app)
{
    app.get('/destroySession',function(req,res){
        var log = `<p style="color:blueviolet; top:500px"><STRONG>로그아웃 되었습니다 !</STRONG></p>`;

        if(!req.session.user)
            log = `<p style="color:red; top:500px"><STRONG>로그인이 되어있지 않습니다 !</STRONG></p>`;
        else
            req.session.destroy();
        
        var lis = `
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>destorySession</title>
    <link rel="stylesheet" type="text/css" href="/css/signup.css" />
</head>

<body>
    <div>
            <a href="/"><img src="/source/logo.png" id="logo"></a>
    </div>

    <div id="center">
            <p> <STRONG>로그아웃</STRONG> </p>
            <form>
                ${log}
                <p><a href="/">메인으로 돌아가기</a></p>
            </form>
    </div>
</body>

</html>
        `;
        res.send(lis);
    });
}
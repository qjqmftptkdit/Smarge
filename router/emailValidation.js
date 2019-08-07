// 이메일 확인 라우터 초기화
module.exports = function(app)
{
    app.get('/emailValidation',function(req,res){
        var log = '<p style="color:red; top:500px"><STRONG>이메일 인증에 실패했습니다 !</STRONG></p>';

        if(req.query.checkCode && /^[0-9]+$/.test(req.query.checkCode))
            // 이메일 인증을 완료한다.
            if((new (require('../func/emailValidation'))).verifyEmail(req.query.checkCode))
                log = '<p style="color:blueviolet; top:500px"><STRONG>이메일 인증이 완료되었습니다 !</STRONG></p>';

        var lis = `
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>emailValidation</title>
    <link rel="stylesheet" type="text/css" href="/css/signup.css" />
</head>

<body>
    <div>
            <a href="/"><img src="/source/logo.png" id="logo"></a>
    </div>

    <div id="center">
            <p> <STRONG>메일인증</STRONG> </p>
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
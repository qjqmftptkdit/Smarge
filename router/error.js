// 에러 알림 라우터 초기화
module.exports = function(app)
{
    app.get('/error',function(req,res){

        log = "예상치 못한 오류가 발생했습니다.";
        // 추가적인 에러처리
        if(req.query.error)
        {
            if(req.query.error == 1)
            {
                log = "로그인이 되어있지 않습니다 !";
            }
            if(req.query.error == 2)
            {
                log = "잘못된 경로입니다 !";
            }
            if(req.query.error == 3)
            {
                log = "인증되지 않은 이미지입니다! !";
            }
            if(req.query.error == 4)
            {
                log = "존재하지 않는 이미지입니다! !";
            }
        }

        var lis = `
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>error</title>
    <link rel="stylesheet" type="text/css" href="/css/signup.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>
    $(function(){
        $('#logo').mouseenter(function(){
            $('#logo').css('opacity','0.8');
        }).mouseleave(function(){
            $('#logo').css('opacity','1');
        });
    });
    </script>
</head>

<body>
    <div>
            <a href="/"><img src="/source/logo.png" id="logo"></a>
    </div>

    <div id="center">
            <p> <STRONG>오류가 발생됨</STRONG> </p>
            <form>
                <p style="color:red;"><STRONG>${log}</STRONG><p>
                <p><a href="/">메인으로 돌아가기</a></p>
            </form>
    </div>
</body>

</html>
        `;
        res.send(lis);
    });
}
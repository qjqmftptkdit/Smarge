// 계정별 이미지 확인 라우터 초기화
module.exports = function(app)
{
    app.get('/myImage',function(req,res){

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
<a href="/myImage" style="color:cornflowerblue"><font size=5><STRONG><U>나의 이미지</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/uploadImage"><font size=5><STRONG><U>이미지 올리기</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/"><font size=5><STRONG><U>이미지 수정하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/"><font size=5><STRONG><U>이미지 삭제하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/destroySession"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>
</div>
</div>

<div id="center">

</div>

</body>

</html>
        `;
        res.send(lis);
    });
}
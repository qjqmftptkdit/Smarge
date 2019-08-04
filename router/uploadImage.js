// 이미지 업로드 라우터 초기화
module.exports = function(app)
{
    app.get('/uploadImage',function(req,res){

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
    <title>uploadImage</title>
    <link rel="stylesheet" type="text/css" href="/css/myImage.css" />
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<div id=topI>
<a href="/myImage"><font size=5><STRONG><U>나의 이미지</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/uploadImage" style="color:cornflowerblue"><font size=5><STRONG><U>이미지 올리기</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/"><font size=5><STRONG><U>이미지 수정하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/"><font size=5><STRONG><U>이미지 삭제하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/destroySession"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>
</div>
</div>

<div id="center">
<ul style="font-size: x-large">
    <li> <input type="text" size="50" placeholder="이미지 이름" style="font-size: x-large"> </li> <br>
    <li> 이미지 선택(jpg,png) : <input type="file" value="이미지 선택" style="font-size: x-large"> </li> <br>
    <li><textarea cols="63" rows="10" style="font-size: x-large" placeholder="이미지에 대한 설명을 입력하세요 !"></textarea></li><br>
    <li><input type="submit" value="이미지 업로드" style="font-size: x-large"></li>
</ul>
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}
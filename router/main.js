// 메인 홈페이지 라우터 초기화
module.exports = function(app)
{
    app.get('/',function(req,res){
        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>main</title>
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<form id="search">
    <input type="text" id="query">
    <input type="submit" id="queryButton" value=""/>
</form>

<div id=topI>
<a href="/login"><font size=5><STRONG><U>로그인</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/signup"><font size=5><STRONG><U>회원가입</U></STRONG></font></p></a>
</div>
</div>

<div id="center">
<p> 업로드한 이미지를 공유하고, 사이트에 올릴 수 있습니다 ! </p>
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}
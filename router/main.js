// 메인 홈페이지 라우터 초기화
module.exports = function(app)
{
    app.get('/',function(req,res){

    // 디폴트 로그
    var log = `<a href="/login"><font size=5><STRONG><U>로그인</U></STRONG></font></a>
    <font size=5><STRONG>/</STRONG></font>
    <a href="/signup"><font size=5><STRONG><U>회원가입</U></STRONG></font></p></a>`;
    var log2 = "업로드한 이미지를 공유하고, 사이트에 올릴 수 있습니다 !";

    // 세션이 존재할경우
    if(req.session.user)
    {
        log = `<a href="/accountSetting"><font size=5><STRONG><U>계정설정</U></STRONG></font></a>
        <font size=5><STRONG>/</STRONG></font>
        <a href="/destroySession"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>`;
        log2 = `${req.session.user.username}님 반갑습니다 !
        <a href="/myImage"><p style="color:blueviolet"> <font size=5><STRONG><U>[ 이미지 업로드 하기] </U></STRONG></font> </p></a>`;
    }

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
${log}
</div>
</div>

<div id="center">
<p style="color:blueviolet"> <font size=5><STRONG><U>${log2}</U></STRONG></font> </p>
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}